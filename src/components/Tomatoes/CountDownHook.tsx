import { useState, useEffect, FunctionComponent } from 'react'
import * as React from 'react'

interface ICountDownProps {
  timer: number
  onFinish: ()=>void
}
let timerID:NodeJS.Timeout

const CountDownHook:FunctionComponent<ICountDownProps> = (props) => {
  const [countDown, setCountDown] = useState(props.timer)
  
  const min = Math.floor(countDown/(1000*60))
  const sec = Math.floor(countDown/1000%60)
  const time = `${min}:${sec<10?`0${sec}`:sec}`

  useEffect (()=>{
    document.title = `${time} - JT番茄App`
    timerID = setInterval(()=>{
      setCountDown(countDown - 1000)
      if(countDown < 0){
        props.onFinish()
        clearInterval(timerID)
      }
    }, 1000)
    return function cleanup() {
      clearInterval(timerID)
    }
  })

  return (
    <div className="countDown" id="countDown">
      {time}
    </div>
  )
}

export default CountDownHook;