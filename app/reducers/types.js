import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type fileStateType = {
  +files: [{
    name: string;
    extname: string;
    path: string;
    selected: boolean;
  }];
};

export type Action = {
  +type: string;
  +payload: string;
};

export type GetState = () => fileStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
