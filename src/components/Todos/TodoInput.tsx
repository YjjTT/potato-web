import * as React from 'react';
import { Input, Icon } from 'antd';

interface ITodoInputState {
  description: string
}

interface ITodoInputProps {
  addTodo: (params: any)=>void
}

export default class TodoInput extends React.Component<ITodoInputProps,ITodoInputState> {
  constructor(props: any){
    super(props);
    this.state = {
      description: ''
    }
  }
  onKeyUps = (e:any) => {
    console.log(e.KeyCode)
    if(e.KeyCode === 13 && this.state.description !== ''){
      this.props.addTodo({description: this.state.description})
      this.setState({ description: ''})
    }
  }
  submit = () => {
    if(this.state.description !== ''){
      this.props.addTodo({description: this.state.description})
      this.setState({ description: ''})
    }
  }
  public render(){
    const { description } = this.state
    const suffix = description ? <Icon type="enter" onClick={this.submit} /> : <span />;
    return(
      <div className="todoInput" id="todoInput">
        <Input 
          placeholder="添加新任务"
          suffix={suffix}
          value={description}
          onChange={(e) =>{
            this.setState({ description: e.target.value })
          }}
          onKeyUp={this.onKeyUps}
        />
      </div>
    )
  }
}