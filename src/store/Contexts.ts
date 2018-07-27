import * as React from 'react';

import { createDefaultClusterDefinition, IClusterDefinition } from '../store/ClusterDefinition';
import { createDefaultViewState, IViewState } from '../store/ViewState';

export const ClusterDefinitionContext = React.createContext<IClusterDefinition>(createDefaultClusterDefinition());

export const ViewStateContext = React.createContext<IViewState>(createDefaultViewState());