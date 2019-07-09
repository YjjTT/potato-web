import * as React from 'react'
import { format } from 'date-fns'
import './StatTodoItem.scss';
import {connect} from 'react-redux'
import { updateTodo } from '../../redux/actions/todos'
import { updateTomato } from '../../redux/actions/tomatoes'
import axios from '../../config/axios'

interface IStatTodoItemProps{
  todo: any,
  itemType: string,
  updateTodo: (payload: any)=>void,
  updateTomato: (payload:any) => void
}
class StatTodoItem extends React.Component<IStatTodoItemProps>{
  constructor(props:any){
    super(props);
  }
  updateTodo =  async (params:any) => {
    try{
      const res = await axios.put(`todos/${this.props.todo.id}`, params)
      this.props.updateTodo(res.data.resource)
    }catch(e){
      throw new Error(e);
    }
  }
  updateTomato = async (params:any) => {
    try{
      const res = await axios.put(`tomatoes/${this.props.todo.id}`,params)
      this.props.updateTomato(res.data.resource)
    }catch(e){
      throw new Error(e)
    }
  }
  public render(){
    const { todo, itemType } = this.props; 
    let action
    let formatType
    if(itemType === 'finish'){
      formatType = 'HH:MM'
      action = (
        <div className="action">
          <span onClick={()=>this.updateTodo({
            completed: false
          })}>恢复</span>
          <span onClick={()=>this.updateTodo({
            deleted: true
          })}>删除</span>
        </div>
      )
    }else if (itemType === 'delete'){
      formatType = "YYYY-MM-DD HH:MM"
      action = (
        <div className="action">
          <span onClick={()=>this.updateTodo({
            deleted: false
          })}>恢复</span>
        </div>
      )
    }else if (itemType === 'abortTomatoes'){
      formatType = "YYYY-MM-DD HH:MM"

    }else if(itemType === 'finishTomatoes'){
      formatType = 'HH:MM'
      action = (
        <div className="action">
          <span onClick={()=>this.updateTomato({
            aborted: true
          })}>删除</span>
        </div>
      )
    }
    return (
      <div className="statTodoItem" id="statTodoItem">
        <div className="text">
          <span className="time">{format(todo.updated_at, formatType)}</span>
          <span className="description">{todo.description}</span>
        </div>
        {action}
      </div>
    )
  }
}
const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
})
const mapDispatchToProps = {
  updateTodo,
  updateTomato
}
export default connect(mapStateToProps,mapDispatchToProps)(StatTodoItem);