import * as React from 'react'

interface ICountDownProps {
  timer: number
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
      if(times < 0){
        this.props.onFinish()
        clearInterval(timer)
      }
    }, 1000)
  }
  componentWillUnmount(){
    clearInterval(timer)
  }
  public render (){
    const {countDown} = this.state;
    const min = Math.floor(countDown/(1000*60))
    const sec = Math.floor(countDown/1000%60)
    const time = `${min}:${sec<10?`0${sec}`:sec}`
    return (
      <div className="countDown" id="countDown">
        {time}
      </div>
    )
  }
}

export default CountDown;