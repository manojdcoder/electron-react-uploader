// @flow
import { SYNC_FILE, SELECT_FILE } from '../actions/file';
import type { fileStateType, Action } from './types';
import { getFiles } from '../utils/file';

export default function file(state: fileStateType = [], action: Action) {
  switch (action.type) {
    case SYNC_FILE:
      return getFiles().map((item, index) => {
        item.selected = action.payload
          ? item.path === action.payload
          : index === 0;
        return item;
      });
    case SELECT_FILE:
      return state.map(item => {
        item.selected = item.path === action.payload;
        return item;
      });
    default:
      return state;
  }
}
