// @flow
import type { GetState, Dispatch } from '../reducers/types';

export const SYNC_FILE = 'SYNC_FILE';
export const SELECT_FILE = 'SELECT_FILE';

export function syncFile(path: string) {
  return {
    type: SYNC_FILE,
    payload: path
  };
}

export function selectFile(path: string) {
  return {
    type: SELECT_FILE,
    payload: path
  };
}
