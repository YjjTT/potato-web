import * as React from 'react';
import './Statistics.scss';
import {connect} from 'react-redux';
import Polygon from './Polygon';
import {format} from 'date-fns';
import _ from 'lodash';
import TodoHistory from './TodoHistory';
import TomatoHistory from './TomatoHistory/TomatoHistory'
import TaskStatistics from './TaskStatsitics/TaskStatistics'

interface IStatisticsProps {
  todos: any[],
  tomatoes: any[]
}
interface IStatisticsState {
  tabIndex: number
}

class Statistics extends React.Component<IStatisticsProps,IStatisticsState>{
  constructor(props:any){
    super(props);
    this.state = {
      tabIndex: 1
    }
  }

  get finishedTodos(){
    return this.props.todos.filter((item:any)=> item.completed && !item.deleted)
  }

  get dailyTodo(){
    const obj = _.groupBy(this.finishedTodos, (tomato:any)=>{
      return format(tomato.updated_at, 'YYYY-MM-D')
    })
    return obj
  }

  get finishTomatoes(){
    return this.props.tomatoes.filter((t:any)=> t.description && t.ended_at && !t.aborted)
  }

  get dailyTomatoes(){
    const obj = _.groupBy(this.finishTomatoes, (tomato:any)=>{
      return format(tomato.started_at, 'YYYY-MM-D')
    })
    console.log(obj)
    return obj
  }

  public render(){
    return(
      <div className="statistics" id="statistics">
        <ul>
          <li onClick={()=>{this.setState({tabIndex:1})}} className={this.state.tabIndex===1?"active":''}>
              统计
          </li>

          <li onClick={()=>{this.setState({tabIndex:2})}} className={this.state.tabIndex===2?"active":''}>
            <div className="desc">
              <span className="title">番茄历史</span>
              <span className="subtitle">累计完成番茄</span>
              <span className="quantity">{this.finishTomatoes.length}</span>
            </div>
            <Polygon data={this.dailyTomatoes} totalFinishedCount={this.finishTomatoes.length}/>
          </li>

          <li onClick={()=>{this.setState({tabIndex:3})}} className={this.state.tabIndex===3?"active":''}>
            <div className="desc">
              <span className="title">任务历史</span>
              <span className="subtitle">累计完成任务</span>
              <span className="quantity">{this.finishedTodos.length}</span>
            </div>
            <Polygon data={this.dailyTodo} totalFinishedCount={this.finishedTodos.length}/>
          </li>
        </ul>
          {this.state.tabIndex===1 && <TaskStatistics />}
          {this.state.tabIndex===2 && <TomatoHistory />}
          {this.state.tabIndex===3 && <TodoHistory />}
      </div>
    )
  }
}
const mapStateToProps = (state:any, ownProps:any) => ({
  todos: state.todos,
  tomatoes: state.tomatoes,
  ...ownProps
})

export default connect(mapStateToProps)(Statistics);