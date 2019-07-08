
import * as type from '../actionTypes'

export const addTomato = (payload: any) => {
  return {
    type: type.ADD_TOMATOES,
    payload
  }
}

export const initTomato = (payload: any[]) => {
  return {
    type: type.INIT_TOMATOES,
    payload
  }
}

export const updateTomato = (payload:any) => {
  return {
    type: type.UPDATE_TOMATO,
    payload
  }
}