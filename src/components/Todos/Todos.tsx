import * as React from 'react';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import './Todos.scss';
export default class Todos extends React.Component<any> {

  addTodo = async (params: any) => {
    try{
      const res = await axios.post('todos', params)
      console.log(res)
    }catch (e){
      console.log(e)
    }
  }

  public render(){
    return(
      <div className="container" id="todos">
        <TodoInput addTodo={(params:any) => this.addTodo(params)} />
      </div>
    )
  }
}