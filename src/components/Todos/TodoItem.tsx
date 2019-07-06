import * as React from 'react';
import { Checkbox, Icon } from 'antd';

interface ITodoItemProps {
  description: string
  completed: boolean
  updateTodo: (id:number ,params: any) => void
  id: number
  editing: boolean
  toEditing: (id: number) => void
}
interface ITodoItemState {
  editText: string
}
export default class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props: any){
    super(props);
    this.state = {
      editText: this.props.description
    }
  }
  update = (params:any) => {
    this.props.updateTodo(this.props.id, params)
  }
  toEditing = () => {
    this.props.toEditing(this.props.id)
  }
  KeyUpHandle = (e:any) => {
    if(e.KeyCode === 13 && this.state.editText !== ''){
      this.update({description: this.state.editText})
    }
  }
  submit = () => {
    if(this.state.editText !== ''){
      this.update({description: this.state.editText})
    }
  }
  public render (){
    const Editing = (
      <div className="editing">
        <input type="text" 
        value={this.state.editText} 
        onChange={e=>this.setState({ editText: e.target.value })}
        onKeyUp={this.KeyUpHandle}
        />
        <div className="iconWrapper">
          <Icon type="enter" onClick={this.submit}/>
          <Icon type="delete" theme="filled" onClick={e=>this.update({deleted: true})}/>
        </div>
      </div>
    )
    const Text = <span onDoubleClick={this.toEditing}>{this.props.description}</span>
    return(
      <div id="todoItem">
        <Checkbox 
          checked={this.props.completed} 
          onChange={e=>this.update({completed: e.target.checked})}
        />
        {this.props.editing?Editing:Text}
      </div>
    )
  }
}