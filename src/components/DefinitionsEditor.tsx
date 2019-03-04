import * as React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import { ClusterDefinitionContext } from '../store/Contexts';
import SampleDefinition from '../data/sampleDefinition.json';

// tslint:disable-next-line:no-var-requires
require('codemirror/mode/javascript/javascript');

interface IEditorState {
  code: string
}

class DefinitionsEditor extends React.Component<{}, IEditorState> {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  }

  public componentDidMount() {
    // short delay to allow other components to fully render
    // before setting sample definition
    setTimeout(() => {
      this.setState({
        code: JSON.stringify(SampleDefinition, null, 2)
      });
    }, 50);
  }

  public render() {
    return (
      <ClusterDefinitionContext.Consumer>
        {clusterDefinition => (
          <CodeMirror 
            value={this.state.code}
            options={{
              lineNumbers: true,
              mode: 'application/json',
              theme: 'material'
            }}
            onChange={clusterDefinition.validate} />
        )}
      </ClusterDefinitionContext.Consumer>
    );
  }
}

export default DefinitionsEditor;