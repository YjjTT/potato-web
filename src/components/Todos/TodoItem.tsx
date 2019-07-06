import * as React from 'react';
import { Checkbox } from 'antd';

interface ITodoItemProps {
  description: string
  completed: boolean
  updateTodo: (id:number ,params: any) => void
  id: number
}
export default class TodoItem extends React.Component<ITodoItemProps> {
  constructor(props: any){
    super(props);

  }
  update = (params:any) => {
    this.props.updateTodo(this.props.id, params)
  }
  public render (){
    return(
      <div id="todoItem">
        <Checkbox 
          checked={this.props.completed} 
          onChange={e=>this.update({completed: e.target.checked})}
        />
        <span>{this.props.description}</span>
      </div>
    )
  }
}