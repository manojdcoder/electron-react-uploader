// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import file from './file';

export default function createRootReducer(history: History) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    file
  });
}
