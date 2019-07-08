import * as React from 'react';
import './Tomatoes.scss';
import { Button, Input, Icon, Modal } from 'antd';
import axios from '../../config/axios'
import CountDown from './CountDown'
import './TomatoAction.scss'
// import CountDown from './CountDownHook'

const { confirm } = Modal;
interface ITomatoActionProps {
  startTomato: ()=> void
  updateTomato: (payload:any) => void
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
      this.updateTomato({
        description: this.state.description,
          ended_at: new Date()
      })
      this.setState({
        description: ''
      })
		}
  }
  onFinish = () => {
    this.forceUpdate()
  }
  showConfirm = () => {
    confirm({
      title: '您目前正在一个番茄工作时间中,要放弃这个番茄吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: ()=> {
        this.abortTomato()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  abortTomato = async () => {
    this.updateTomato({
      aborted: true
    })
    document.title = `JT番茄App`
  }

  updateTomato = async (params:any) => {
    try{
      const res = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,params)
      this.props.updateTomato(res.data.resource)
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
        html = <div className="inputWrapper">
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
          <Icon type="close-circle" className="abort" onClick={this.showConfirm} />
        </div>
      }else if (timeNow - startAt < duration){
        const timer = duration - timeNow + startAt
        html = (
          <div className="countDownWrapper">
            <CountDown timer={timer} onFinish={this.onFinish} duration={duration} />
            <Icon type="close-circle" className="abort" onClick={this.showConfirm} />
          </div>
        )
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