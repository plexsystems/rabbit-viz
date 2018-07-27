import produce from 'immer';

export interface IViewState {
  readonly currentVhost: string;
  readonly errors: string[];
  readonly showRoutingKeys: boolean;
  selectVhost(evt, data): void;
  setZoomFunction(callback: () => void): void;
  toggleShowRoutingKeys(): void;
  zoomToFit(): void;
}

const state: IViewState = {
  currentVhost: "",
  errors: [],
  selectVhost: (evt, data) => null,
  setZoomFunction: () => null,
  showRoutingKeys: false,
  toggleShowRoutingKeys: () => null,
  zoomToFit: () => null
};

export function createDefaultViewState() : IViewState {
  return produce<IViewState>(state, draft => {
    draft.currentVhost = "All";
  });
}