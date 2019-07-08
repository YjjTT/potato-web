import * as React from 'react';
import './Tomatoes.scss';
import axios from '../../config/axios';
import TomatoAction from './TomatoAction';
import { connect } from 'react-redux';
import { addTomato, initTomato,updateTomato } from '../../redux/actions/tomatoes'


interface ITomatoProps{
  addTomato: (payload:any)=>any
  initTomato: (payload: any[])=>any[]
  updateTomato: (payload: any[]) => any[]
  tomatoes: any[]
}
class Tomatoes extends React.Component <ITomatoProps> {
  constructor (props:any){
    super(props);
  }
  componentDidMount (){
    this.getTomatoes()
  }
  getTomatoes = async () => {
    try{
      const res = await axios.get('tomatoes')
      this.props.initTomato(res.data.resources)
    }catch(e){
      throw new Error(e)
    }
  }
  get unfinishedTomato(){
    return this.props.tomatoes.filter((t:any)=> !t.description && !t.ended_at)[0]
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
      </div>
    )
  }
}
const mapStateToProps = (state:any, ownProps:any) => ({
  tomatoes: state.tomatoes,
  ...ownProps
})
const mapDispatchToProps = {
  initTomato,
  addTomato,
  updateTomato
}
export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);