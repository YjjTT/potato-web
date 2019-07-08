import * as React from 'react';
import './Tomatoes.scss';
import { Button } from 'antd';

interface ITomatoActionProps {
  startTomato: ()=> void
  unfinishedTomato: any[]
}
class TomatoAction extends React.Component<ITomatoActionProps> {

  constructor(props:any){
    super(props);
  }

  public render (){
    return(
      <div className="TomatoAction" id="TomatoAction">
        <Button className="startTomatoBtn" onClick={this.props.startTomato}>开始番茄</Button>
      </div>
    )
  }
}
export default TomatoAction;