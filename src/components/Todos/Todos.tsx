import * as React from 'react';
import { connect } from 'react-redux'
import { initTodos } from '../../redux/actions';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import './Todos.scss';
import TodoItem from './TodoItem';

class Todos extends React.Component <any> {
  constructor(props:any){
    super(props);
  }

  componentDidMount(){
    this.getTodos()
  }

  get unDeletedTodos(){
    return this.props.todos.filter((item:any)=> !item.deleted)
  }

  get unCompletedTodos(){
    return this.unDeletedTodos.filter((item:any)=> !item.completed)
  }

  get completedTodos(){
    return this.unDeletedTodos.filter((item:any)=> item.completed)
  }

  getTodos = async () => {
    try{
      const res = await axios.get('todos')
      const todos = res.data.resources.map((item:any)=>Object.assign({},item,{editing: false}))
      console.log(todos)
      this.props.initTodos(todos)
    }catch(e) {
      console.log(e)
    }
  }
 
  public render(){
    return(
      <div className="container" id="todos">
        <TodoInput />
        <div className="todoList">
          {
            this.unCompletedTodos.map((item:any)=> 
            <TodoItem key={item.id} {...item} /> )
          }
          {
            this.completedTodos.map((item:any)=> 
            <TodoItem key={item.id} {...item} /> )
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state:any, ownProps:any) => ({
  todos: state.todos,
  ...ownProps
})
const mapDispatchToProps = {
  initTodos
}
export default connect(mapStateToProps,mapDispatchToProps)(Todos);