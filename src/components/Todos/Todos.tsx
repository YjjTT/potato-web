import * as React from 'react';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import './Todos.scss';
import TodoItem from './TodoItem';

interface ITodosState {
  todos: any[];
}
export default class Todos extends React.Component<any, ITodosState> {
  constructor(props:any){
    super(props);
    this.state = {
      todos: []
    }
  }

  componentDidMount(){
    this.getTodos()
  }

  get unDeletedTodos(){
    return this.state.todos.filter(item=> !item.deleted)
  }

  get unCompletedTodos(){
    return this.unDeletedTodos.filter(item=> !item.completed)
  }

  get completedTodos(){
    return this.unDeletedTodos.filter(item=> item.completed)
  }

  addTodo = async (params: any) => {
    const {todos} = this.state
    try{
      const res = await axios.post('todos', params)
      this.setState({ todos: [res.data.resource,...todos]})
    }catch (e){
      console.log(e)
    }
  }
  getTodos = async () => {
    try{
      const res = await axios.get('todos')
      const todos = res.data.resources.map((item:any)=>Object.assign({},item,{editing: false}))
      this.setState({ todos })
    }catch(e) {
      console.log(e)
    }
  }
  updateTodo = async (id: number, params: any) => {
    const { todos } = this.state
    try{
      const res = await axios.put(`todos/${id}`, params)
      const newTodos = todos.map(item=>{
        if(id === item.id){
          return res.data.resource
        }else{
          return item
        }
      })
      this.setState({ todos: newTodos })
    }catch(e){
      console.log(e)
    }
  }
  toEditing = (id: number) => {
    const { todos } = this.state
    const newTodos = todos.map((item)=>{
      if(id === item.id){
        return Object.assign({},item,{editing:true})
      }else{
        return Object.assign({},item,{editing:false})
      }
    })
    this.setState({ todos: newTodos })
  }
  public render(){
    return(
      <div className="container" id="todos">
        <TodoInput addTodo={(params:any) => this.addTodo(params)} />
        <div className="todoList">
          {
            this.unCompletedTodos.map((item, index)=> 
            <TodoItem 
              key={item.id} 
              {...item} 
              updateTodo={this.updateTodo}
              toEditing={this.toEditing}
              /> )
          }
          {
            this.completedTodos.map((item, index)=> 
            <TodoItem 
              key={item.id} 
              {...item} 
              updateTodo={this.updateTodo}
              toEditing={this.toEditing}
              /> )
          }
        </div>
      </div>
    )
  }
}