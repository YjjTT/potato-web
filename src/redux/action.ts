import * as type from './actionTypes'

export const addTodo = (payload: any) => {
  return {
    type: type.ADD_TODO,
    payload
  }
}

export const initTodos = (payload:any[]) => {
  console.log(payload)
  return {
    type: type.INIT_TODOS,
    payload
  }
}

export const updateTodo = (payload:any[]) => {
  return {
    type: type.UPDATE_TODO,
    payload
  }
}

export const editTodo = (payload:number) => {
  return {
    type: type.EDIT_TODO,
    payload
  }
}