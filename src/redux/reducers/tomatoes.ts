import * as type from "../actionTypes";

export default (state:any[] = [], action:any):any => {
  switch (action.type) {
    case type.ADD_TOMATOES:
      return [...state, ...action.payload];
    case type.INIT_TOMATOES:
      return [...action.payload];
    default:
      return state;
  }
}
