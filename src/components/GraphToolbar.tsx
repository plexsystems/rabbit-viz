import * as React from 'react';
import { Button, Dropdown, Menu, Radio } from 'semantic-ui-react';
import { IVhost } from '../store/ClusterDefinition';
import { ClusterDefinitionContext, ViewStateContext } from '../store/Contexts';

const GraphToolbar = () => (
  <ViewStateContext.Consumer>
    {viewState => (
      <ClusterDefinitionContext.Consumer>
        {clusterDefinition => (
          clusterDefinition.definition.vhosts.length > 0 ? (
            <Menu attached="top">
              {VHostMenu(clusterDefinition.definition.vhosts, viewState.currentVhost, viewState.selectVhost)}      
              <Menu.Item>              
                <Radio 
                  toggle={true} 
                  label="Show Routing Keys"
                  onChange={viewState.toggleShowRoutingKeys}
                  checked={viewState.showRoutingKeys} />
              </Menu.Item>
              <Menu.Item>
                <Button 
                  onClick={viewState.zoomToFit} 
                  content="Zoom to Fit" />
              </Menu.Item>
            </Menu>
          ) : "" 
        )}
      </ClusterDefinitionContext.Consumer>
    )}
  </ViewStateContext.Consumer>
);

function VHostMenu(vhosts: IVhost[], currentVhost: string, onChange: (evt, data) => void) {
  const options = generateVhostOptions(vhosts);

  return (
    <Menu.Item>
      Virtual Host:&nbsp;              
      <Dropdown 
        placeholder="Virtual Hosts" 
        value={currentVhost} 
        selection={true} 
        options={options} 
        onChange={onChange} />
    </Menu.Item>
  );
}

function generateVhostOptions(vhosts: IVhost[]) {
  const options = [{ key: "All", value: "All", text: "All"}];

  vhosts.forEach(vhost => options.push({key: vhost.name, value: vhost.name, text: vhost.name}));

  return options;
}

export default GraphToolbar;