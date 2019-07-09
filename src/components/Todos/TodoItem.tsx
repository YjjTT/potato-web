import * as React from 'react';
import { connect} from 'react-redux';
import { Checkbox, Icon } from 'antd';
import './TodoItem.scss';
import classNames from 'classnames';
import {editTodo, updateTodo} from '../../redux/actions/todos';
import axios from '../../config/axios';

interface ITodoItemProps {
  description: string
  completed: boolean
  id: number
  editing: boolean
  editTodo: (id:number) => any
  updateTodo: (payload:any) => any
}
interface ITodoItemState {
  editText: string
}
class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props: any){
    super(props);
    this.state = {
      editText: this.props.description
    }
  }
  updateTodo = async (params: any) => {
    if(params.completed){
      params.completed_at = new Date()
    }
    try{
      const res = await axios.put(`todos/${this.props.id}`, params)
      this.props.updateTodo(res.data.resource)
    }catch(e){
      console.log(e)
    }
  }
  editTodo = () => {
    this.props.editTodo(this.props.id)
  }
  onKeyUp = (e:any)=>{
		if(e.keyCode === 13 && this.state.editText !== ''){
			this.updateTodo({description: this.state.editText})
		}
	}
  submit = () => {
    if(this.state.editText !== ''){
      this.updateTodo({description: this.state.editText})
    }
  }
  public render (){
    const Editing = (
      <div className="editing">
        <input type="text" 
        value={this.state.editText} 
        onChange={e=>this.setState({ editText: e.target.value })}
        onKeyUp={this.onKeyUp}
        />
        <div className="iconWrapper">
          <Icon type="enter" onClick={this.submit}/>
          <Icon type="delete" theme="filled" onClick={e=>this.updateTodo({deleted: true})}/>
        </div>
      </div>
    )
    const Text = <span className="text" onDoubleClick={this.editTodo}>{this.props.description}</span>

    const todoItemClass = classNames({
      TodoItem: true,
      editing: this.props.editing,
      completed: this.props.completed
    })
    
    return(
      <div id="todoItem" className={todoItemClass}>
        <Checkbox 
          checked={this.props.completed} 
          onChange={e=>this.updateTodo({completed: e.target.checked})}
        />
        {this.props.editing?Editing:Text}
      </div>
    )
  }
}
const mapStateToProps = (ownProps:any) => ({
  ...ownProps
})
const mapDispatchToProps = {
  editTodo,
  updateTodo
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoItem);