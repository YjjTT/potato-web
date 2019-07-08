import * as React from 'react';
import { Input, Icon } from 'antd';
import { connect } from 'react-redux'
import {addTodo} from '../../redux/actions';
import axios from '../../config/axios';

interface ITodoInputState {
	description: string;
}

interface ITodoInputProps {
	addTodo: (payload:any) => any;
}

class TodoInput extends React.Component<ITodoInputProps,ITodoInputState> {
  constructor(props:any){
    super(props);
    this.state = {
      description: ''
    }
  }
  onKeyUp = (e:any) => {
		if(e.keyCode === 13 && this.state.description !== ''){
      this.addTodo()
		}
	}
  submit = () => {
    if(this.state.description !== ''){
      this.addTodo()
    }
  }
  addTodo = async ()=>{
    try{
      const res = await axios.post('todos', {description: this.state.description})
      this.props.addTodo(res.data.resource)
    }catch (e){
      console.log(e)
    }
    this.setState({ description: ''})
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
          onKeyUp={this.onKeyUp}
        />
      </div>
    )
  }
}
const mapStateToProps = (state:any, ownProps:any) => ({
  ...ownProps
})
const mapDispatchToProps = {
  addTodo
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoInput);