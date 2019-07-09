import * as React from 'react'
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import { format } from 'date-fns'
import _ from 'lodash'
import {Tabs} from 'antd';

interface ITaskProps {
  todos: any[],
  tomatoes: any[],
}

const {TabPane} = Tabs
class TaskStatistics extends React.Component<ITaskProps>{

  get finishedTomatoes(){
    return this.props.tomatoes.filter(t=>t.description && t.ended_at && !t.aborted)
  }
  get dailyFinishedTomatoes(){
    return _.groupBy(this.finishedTomatoes, (tomatoes)=>{
      return format(tomatoes.started_at, 'YYYY-MM-DD')
    })
  }
  get tomatoesFinishDates(){
    return Object.keys(this.dailyFinishedTomatoes).sort((a,b)=>Date.parse(a)-Date.parse(b))
  }

  get tomatoesFinishValues(){
    const arr:any[] = []
    this.tomatoesFinishDates.map(date=>{
      arr.push(this.dailyFinishedTomatoes[date].length)
    })
    return arr
  }

  get finishedTodos(){
    return this.props.todos.filter(t=>t.completed && !t.deleted)
  }
  get dailyFinishedTodos(){
    return _.groupBy(this.finishedTodos, (todo)=>{
      return format(todo.updated_at, 'YYYY-MM-DD')
    })
  }
  get todosFinishDates(){
    return Object.keys(this.dailyFinishedTodos).sort((a,b)=>Date.parse(a)-Date.parse(b))
  }
  get todosFinishValues(){
    const arr:any[] = []
    this.todosFinishDates.map(date=>{
      arr.push(this.dailyFinishedTodos[date].length)
    })
    return arr
  }

  public render (){
    const tomatoOptionDatas = {
      backgroundColor: 'white',
      title: { text: '番茄统计' },
      tooltip: {},
      xAxis: {
          data: this.tomatoesFinishDates
      },
      yAxis: {},
      series: [{
          name: '完成番茄',
          type: 'bar',
          data: this.tomatoesFinishValues
      }]
    }
    const todoOptionDatas = {
      backgroundColor: 'white',
      title: { text: '任务统计' },
      tooltip: {},
      xAxis: {
          data: this.todosFinishDates
      },
      yAxis: {},
      series: [{
          name: '完成任务',
          type: 'bar',
          data: this.todosFinishValues
      }]
    }
    return(
      <div className="task">
        <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="番茄统计" key="1">
          <ReactEcharts option={tomatoOptionDatas}/>
        </TabPane>
        <TabPane tab="任务统计" key="2">
          <ReactEcharts option={todoOptionDatas}/>
        </TabPane>
      </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state:any, ownProps:any) => ({
  tomatoes: state.tomatoes,
  todos: state.todos,
  ...ownProps
})

export default connect(mapStateToProps)(TaskStatistics);