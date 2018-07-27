import * as React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { ClusterDefinitionContext } from '../store/Contexts';

// tslint:disable-next-line:no-var-requires
require('codemirror/mode/javascript/javascript');

const defaultValue = `{
  "vhosts": [],
  "parameters": [],
  "policies": [],
  "queues": [],
  "exchanges": [],
  "bindings": []
}`;

const DefinitionsEditor = () => (
  <ClusterDefinitionContext.Consumer>
    {clusterDefinition => (
      <CodeMirror 
        value={defaultValue}
        options={{
          lineNumbers: true,
          mode: 'javascript',
          theme: 'material'
        }}
        onChange={clusterDefinition.validate} />
    )}
  </ClusterDefinitionContext.Consumer>
);

export default DefinitionsEditor;