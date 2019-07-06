import * as type from '../actionTypes';

export default function(state = [], action: any) {
  switch (action.type) {
    case type.ADD_TODO:
      return [state, ...action.payload]
    default:
      return state;
  }
}