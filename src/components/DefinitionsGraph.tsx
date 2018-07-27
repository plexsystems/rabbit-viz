import * as React from 'react';
import { Message } from 'semantic-ui-react';
import * as SRD from 'storm-react-diagrams';
import 'storm-react-diagrams/dist/style.min.css';

import { clusterDefinitionToDagModel, IClusterDefinition } from '../store/ClusterDefinition';
import { ClusterDefinitionContext, ViewStateContext } from '../store/Contexts';
import { IViewState } from '../store/ViewState';

class DefinitionsGraph extends React.Component {
  private engine: SRD.DiagramEngine;
  private zoomFunctionSet: boolean;

  constructor(props) {
    super(props);

    this.engine = new SRD.DiagramEngine();
    this.engine.installDefaultFactories();
    this.zoomFunctionSet = false;
  }

  public render() {
    return (
      <ViewStateContext.Consumer>
        {viewState => (
          <ClusterDefinitionContext.Consumer>
            {clusterDefinition => 
              clusterDefinition.definition.vhosts.length > 0 ? 
                this.renderDefinitionDiagram(clusterDefinition, viewState) : this.renderMessageBox(viewState)                
            }
          </ClusterDefinitionContext.Consumer>          
        )}
      </ViewStateContext.Consumer>
    )
  }

  private renderMessageBox(viewState: IViewState) {
    const engine = new SRD.DiagramEngine();
    engine.installDefaultFactories();
    
    if(viewState.errors.length > 0) {
      return (
        <Message
          error={true}
          header="Invalid cluster definition json"
          list={viewState.errors}
          attached="top"
          icon="exclamation circle" />
      );
    }

    return (
      <Message 
        content="Please load a cluster definition using the cluster definition editor panel."
        header="No Cluster Definition Present"
        info={true}
        attached="top"
        icon="info circle" />
    );
  }

  private renderDefinitionDiagram(clusterDefinition: IClusterDefinition, viewState: IViewState) {
    const model = clusterDefinitionToDagModel(clusterDefinition.definition, viewState, this.engine);
    this.engine.setDiagramModel(model);

    if(!this.zoomFunctionSet) {
      viewState.setZoomFunction(() => {
        this.engine.zoomToFit();
      });
      this.zoomFunctionSet = true;
    }

    return <SRD.DiagramWidget 
              className="srd-canvas" 
              diagramEngine={this.engine} 
              inverseZoom={true} />;
  }
}

export default DefinitionsGraph;