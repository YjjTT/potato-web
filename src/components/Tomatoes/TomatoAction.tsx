import * as React from 'react';
import './Tomatoes.scss';
import { Button } from 'antd';
import axios from '../../config/axios';

class TomatoAction extends React.Component {
  startTomato = async () => {
    try{
      const res = await axios.post('tomatoes',{duration: 1500000})
      console.log(res)
    }catch(e){
      throw new Error(e)
    }
  }

  public render (){
    return(
      <div className="TomatoAction" id="TomatoAction">
        <Button className="startTomatoBtn" onClick={this.startTomato}>开始番茄</Button>
      </div>
    )
  }
}
export default TomatoAction;