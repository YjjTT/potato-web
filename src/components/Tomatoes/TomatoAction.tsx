import * as React from 'react';
import './Tomatoes.scss';
import { Button, Input } from 'antd';
import axios from '../../config/axios'
import CountDown from './CountDown'

interface ITomatoActionProps {
  startTomato: ()=> void
  unfinishedTomato: any
}

interface ITomatoActionState {
  description: string
}
class TomatoAction extends React.Component<ITomatoActionProps, ITomatoActionState> {

  constructor(props:any){
    super(props);
    this.state = {
      description: ''
    }
  }
  componentDidMount(){
    console.log(this.props)
  }
  onKeyUp = (e:any) => {
		if(e.keyCode === 13 && this.state.description !== ''){
      this.addDescription()
		}
  }
  
  addDescription = async () => {
    try{
      const res = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,{
        description: this.state.description,
        ended_at: new Date()
      })
      this.setState({
        description: ''
      })
      console.log(res)
    }catch(e){
      throw new Error(e)
    }
  }
  public render (){
    let html = <div />
    if(this.props.unfinishedTomato === undefined){
      html = <Button className="startTomatoBtn" onClick={this.props.startTomato}>开始番茄</Button>
    }else{
      const startAt = Date.parse(this.props.unfinishedTomato.started_at)
      const duration = this.props.unfinishedTomato.duration
      const timeNow = new Date().getTime()
      if(timeNow - startAt > duration){
        html = <div>
          <Input 
            value={this.state.description} 
            placeholder="输入你完成的事情" 
            onChange={e=>{
              this.setState({
                description: e.target.value
              })
            }}
            onKeyUp={this.onKeyUp}
          />
        </div>
      }else if (timeNow - startAt < duration){
        html = <CountDown />
      }
    }
    return(
      <div className="TomatoAction" id="TomatoAction">
        {html}
      </div>
    )
  }
}
export default TomatoAction;