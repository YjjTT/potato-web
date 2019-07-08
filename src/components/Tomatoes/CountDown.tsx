import * as React from 'react'
import './CountDown.scss';
interface ICountDownProps {
  timer: number
  duration: number
  onFinish: ()=>void
}
interface ICountDownState {
  countDown: number
}

let timer:NodeJS.Timeout
class CountDown extends React.Component<ICountDownProps,ICountDownState> {
  constructor(props:any){
    super(props);
    this.state = {
      countDown: this.props.timer
    }
  }
  componentDidMount(){
    timer = setInterval(()=>{
      const times = this.state.countDown
      this.setState({countDown: times - 1000})
      document.title = `${this.countDown} - JT番茄App`
      if(times < 1000){
        this.props.onFinish()
        document.title = `JT番茄App`
        clearInterval(timer)
      }
    }, 1000)
  }
  componentWillUnmount(){
    clearInterval(timer)
  }
  get countDown (){
    const {countDown} = this.state;
    const min = Math.floor(countDown/(1000*60))
    const sec = Math.floor(countDown/1000%60)
    return `${min}:${sec<10?`0${sec}`:sec}`
  }
  public render (){
    const percent = 1 - this.state.countDown/this.props.duration
    return (
      <div className="countDown" id="countDown">
        <span className="restTime">{this.countDown}</span>
        <div className="progress" style={{ width: `${percent*100}%`}} />
      </div>
    )
  }
}

export default CountDown;