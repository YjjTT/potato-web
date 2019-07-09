import * as React from 'react';
import './Statistics.scss';
import {connect} from 'react-redux';
import Polygon from './Polygon';
import {format} from 'date-fns';
import _ from 'lodash';
import TodoHistory from './TodoHistory';
interface IStatisticsProps {
  todos: any[]
}

class Statistics extends React.Component<IStatisticsProps>{

  get finishedTodos(){
    return this.props.todos.filter((item:any)=> item.completed && !item.deleted)
  }

  get dailyTodo(){
    const obj = _.groupBy(this.finishedTodos, (tomato:any)=>{
      return format(tomato.updated_at, 'YYYY-MM-D')
    })
    return obj
  }

  public render(){
    return(
      <div className="statistics" id="statistics">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史
            累计完成{this.finishedTodos.length}个任务
            <Polygon data={this.dailyTodo} totalFinishedCount={this.finishedTodos.length}/>
          </li>
        </ul>
        <TodoHistory />
      </div>
    )
  }
}
const mapStateToProps = (state:any, ownProps:any) => ({
  todos: state.todos,
  ...ownProps
})

export default connect(mapStateToProps)(Statistics);