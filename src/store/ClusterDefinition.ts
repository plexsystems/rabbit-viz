import produce from 'immer';
import { IInstance } from 'react-codemirror2';
import { DefaultLinkModel, DefaultNodeModel, DiagramEngine, DiagramModel, LinkModel } from "storm-react-diagrams";
import { distributeElements } from "../helpers/dagre-utils";
import { IViewState } from "./ViewState";

const exchangeColor = "rgb(0,192,255)";
const queueColor = "rgb(192,255,0)";

export interface IVhost {
  name: string;
}

export interface IPolicy {
  vhost: string;
  name: string;
  pattern: string;
  "apply-to": string;
  definition: { [parameter: string] : {value: any}};
  priority: number;
}

export interface IQueue {
  name: string;
  vhost: string;
  durable: boolean;
  auto_delete: boolean;
  arguments: object;
}

export interface IExchange {
  name: string;
  vhost: string;
  type: string;
  durable: boolean;
  auto_delete: boolean;
  internal: boolean;
  arguments: object;
}

export interface IBinding {
  source: string;
  vhost: string;
  destination: string;
  destination_type: string;
  routing_key: string;
  arguments: object;
}

export interface IDefinition {
  vhosts: IVhost[];
  parameters: any[];
  policies: IPolicy[];
  queues: IQueue[];
  exchanges: IExchange[];
  bindings: IBinding[];
}

export interface IClusterDefinition {
  definition: IDefinition;

  validate: (editor: IInstance, data: any, value: string) => void;
  isValid: boolean;
}

interface IBindingCollection {
  source: string;
  destination: string;
  destinationType: string;
  vhost: string;
  routingKeys: string[];
}

const state: IClusterDefinition = {
  definition: {
    bindings: [],
    exchanges: [],      
    parameters: [],
    policies: [],
    queues: [],
    vhosts: []
  },
  isValid: true,
  validate: (editor: IInstance, data: any, value: string) => null
};

export function createDefaultClusterDefinition() : IClusterDefinition {
  return produce<IClusterDefinition>(state, draft => {
    draft.isValid = true;
  });
}

export function clusterDefinitionToDagModel(definition: IDefinition, viewState: IViewState, engine: DiagramEngine) : DiagramModel {
  const exchangeNodes: DefaultNodeModel[] = [];
  const queueNodes: DefaultNodeModel[] = [];
  const nodeLinks: LinkModel[] = [];
  const model = new DiagramModel();

  const bindings = definition.bindings.filter(b => viewState.currentVhost === "All" || b.vhost === viewState.currentVhost);

  const dedupedBindings = bindings.length > 0 ? deduplicateBindings(bindings) : [];

  dedupedBindings.forEach(binding => {
    const vhost = binding.vhost;
    const outNodeName = `Exchange: ${binding.source} ${viewState.currentVhost === "All" ? `(${vhost})` : ""}`;
    let outNode = exchangeNodes.find(e => e.name === outNodeName);

    if(outNode === undefined) {
      outNode = createNode(outNodeName, exchangeColor);
      exchangeNodes.push(outNode);
    }

    let inNode: DefaultNodeModel | undefined;
    let inNodeName: string;

    if(binding.destinationType === "queue") {
      inNodeName = `Queue: ${binding.destination} ${viewState.currentVhost === "All" ? `(${vhost})` : ""}`;
      inNode = queueNodes.find(q => q.name === inNodeName);

      if(inNode === undefined) {
        inNode = createNode(inNodeName, queueColor);
        queueNodes.push(inNode);
      }
    }
    else {
      inNodeName = `Exchange: ${binding.destination} ${viewState.currentVhost === "All" ? `(${vhost})` : ""}`;
      inNode = exchangeNodes.find(q => q.name === inNodeName);

      if(inNode === undefined) {
        inNode = createNode(inNodeName, exchangeColor);
        exchangeNodes.push(inNode);
      }
    }

    const outPort = outNode.getOutPorts().length > 0 ? outNode.getOutPorts()[0] : outNode.addOutPort("Out");
    const inPort = inNode.getInPorts().length > 0 ? inNode.getInPorts()[0] : inNode.addInPort("In");

    const link = outPort.createLinkModel() as DefaultLinkModel;
    link.setSourcePort(outPort);
    link.setTargetPort(inPort);

    if(viewState.showRoutingKeys) {
      binding.routingKeys.forEach(key => link.addLabel(key));
    }
    
    nodeLinks.push(link);
  });

  let outIndex = 1;
  let inOutIndex = 1;

  exchangeNodes.forEach(node => {
    if(node.getInPorts().length > 0 && node.getOutPorts().length > 0){
      node.x = 300;
      node.y = inOutIndex * 70;
      inOutIndex++; 
    }
    else{
      node.x = 70;
      node.y = outIndex * 70;
      outIndex++;
    }
    model.addNode(node);
  });

  queueNodes.forEach((node, index) => {
    node.x = 530;
    node.y = (index + 1) * 70;
    model.addNode(node);
  });

  nodeLinks.forEach(nodeLink => {
    model.addLink(nodeLink);
  })

  return getDistributedModel(engine, model);
}

function deduplicateBindings(bindings: IBinding[]) : IBindingCollection[] {
  const result: IBindingCollection[] = [];

  bindings.forEach(current => {
    const idx = result.findIndex(b => {
      return b.vhost === current.vhost && 
        b.source === current.source && 
        b.destination === current.destination &&
        b.destinationType === current.destination_type;
    });

    if(idx === -1) {
      result.push({
        destination: current.destination,
        destinationType: current.destination_type,
        routingKeys: current.routing_key === "" ? [] : [current.routing_key],
        source: current.source,
        vhost: current.vhost
      });
    }
    else {
      if(current.routing_key !== "") {
        result[idx].routingKeys.push(current.routing_key);
      }
    }
  });

  return result;
}

function createNode(name: string, color: string = "rgb(0,192,255)") : DefaultNodeModel {
	return new DefaultNodeModel(name, color);
}

function getDistributedModel(engine: DiagramEngine, model: DiagramModel) : DiagramModel {
  const distributedDiagram = distributeElements(model.serializeDiagram());

  const deserializedModel = new DiagramModel();
  deserializedModel.deSerializeDiagram(distributedDiagram, engine);
  return deserializedModel;
}