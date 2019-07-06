import * as type from "../actionTypes";

export default (state:any[] = [], action:any):any => {
  switch (action.type) {
    case type.ADD_TODO:
      return [state, ...action.payload];
    case type.INIT_TODOS:
      console.log(action.payload)
      return [...action.payload];
    case type.UPDATE_TODO:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    case type.EDIT_TODO:
      return state.map(item=>{
        if(item.id === action.payload){
          return Object.assign({},item,{editing: true})
        }else{
         return Object.assign({},item,{editing: false})
        }
      })
    default:
      return state;
  }
}
