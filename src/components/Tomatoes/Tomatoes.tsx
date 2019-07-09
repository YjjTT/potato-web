import * as React from 'react';
import './Tomatoes.scss';
import axios from '../../config/axios';
import TomatoAction from './TomatoAction';
import TomatoList from './TomatoList';
import { connect } from 'react-redux';
import { addTomato,updateTomato } from '../../redux/actions/tomatoes'
import {format} from 'date-fns';
import _ from 'lodash';


interface ITomatoProps{
  addTomato: (payload:any)=>any
  updateTomato: (payload: any[]) => any[]
  tomatoes: any[]
}
class Tomatoes extends React.Component <ITomatoProps> {
  constructor (props:any){
    super(props);
  }
  get unfinishedTomato(){
    return this.props.tomatoes.filter((t:any)=> !t.description && !t.ended_at && !t.aborted)[0]
  }

  get finishTomatoes(){
    const finishTomatoes = this.props.tomatoes.filter((t:any)=> t.description && t.ended_at && !t.aborted)
    const obj = _.groupBy(finishTomatoes, (tomato:any)=>{
      return format(tomato.started_at, 'YYYY-MM-D')
    })
    return obj
  }

  startTomato = async () => {
    try{
      const res = await axios.post('tomatoes',{duration: 1500000})
      this.props.addTomato(res.data.resource)
    }catch(e){
      throw new Error(e)
    }
  }
  public render (){
    return(
      <div className="Tomatoes" id="tomatoes">
        <TomatoAction 
          startTomato={this.startTomato}
          unfinishedTomato={this.unfinishedTomato}
          updateTomato={this.props.updateTomato}
        />
        <TomatoList finishedTomatos={this.finishTomatoes} />
      </div>
    )
  }
}
const mapStateToProps = (state:any, ownProps:any) => ({
  tomatoes: state.tomatoes,
  ...ownProps
})
const mapDispatchToProps = {
  addTomato,
  updateTomato
}
export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);