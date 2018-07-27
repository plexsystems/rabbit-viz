import { mount } from 'enzyme';
import * as React from 'react';

import GraphToolbar from '../components/GraphToolbar';
import { createDefaultClusterDefinition } from '../store/ClusterDefinition';
import { createDefaultViewState } from '../store/ViewState';

beforeEach(() => {
  jest.resetModules();
});

const setupContext = (clusterContext = createDefaultClusterDefinition(), viexContext = createDefaultViewState()) => {
  jest.doMock('../store/Contexts', () => {
    return {
      ClusterDefinitionContext: {
        Consumer: (props) => props.children(clusterContext)
      },
      ViewStateContext: {
        Consumer: (props) => props.children(viexContext)
      }
    }
  });
}

describe('<GraphToolbar />', () => {
  it('should return empty by default', () => {
    setupContext();
    const toolbar = mount(<GraphToolbar />);
    // FIX: this seem hacky
    expect(toolbar.children().length).toEqual(0);
  });
});