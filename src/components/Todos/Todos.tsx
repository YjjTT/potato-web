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
      this.setState({ todos: res.data.resources })
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
  public render(){
    return(
      <div className="container" id="todos">
        <TodoInput addTodo={(params:any) => this.addTodo(params)} />
        <main>
          {
            this.state.todos.map((item, index)=> <TodoItem key={item.id} {...item} updateTodo={this.updateTodo}/> )
          }
        </main>
      </div>
    )
  }
}