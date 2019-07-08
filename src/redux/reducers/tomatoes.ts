import * as type from "../actionTypes";

export default (state:any[] = [], action:any):any => {
  switch (action.type) {
    case type.ADD_TOMATOES:
      return [...state, ...action.payload];
    case type.INIT_TOMATOES:
      return [...action.payload];
    case type.UPDATE_TOMATO:
        return state.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          } else {
            return item;
          }
        });
    default:
      return state;
  }
}
