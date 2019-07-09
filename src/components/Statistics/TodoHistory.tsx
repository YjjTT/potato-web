import * as React from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import _ from 'lodash'
import {Tabs} from 'antd';
import './TodoHistory.scss';
import StatTodoItem from './StatTodoItem'
interface ITodoHistoryProps{
  todos: any[]
}

const { TabPane } = Tabs;

class TodoHistory extends React.Component<ITodoHistoryProps> {

  get finishedTodos(){
    return this.props.todos.filter(t=>t.completed && !t.deleted)
  }
  get deletedTodos(){
    return this.props.todos.filter(t=>t.deleted)
  }
  get dailyFinishedTodos(){
    return _.groupBy(this.finishedTodos, (todo)=>{
      return format(todo.updated_at, 'YYYY-MM-DD')
    })
  }
  get finishDates(){
    return Object.keys(this.dailyFinishedTodos).sort((a,b)=>Date.parse(b)-Date.parse(a))
  }
  constructor(props:any){
    super(props);
  }
  public render (){
    const finishTodoList = this.finishDates.map(date=>{
      return(
        <div key={date} className="dailyTodos">
          <div className="summary">
            <p className="summaryDate">
              <span>{date}</span>
              <span>周五</span>
            </p>
            <p className="summaryFinishInfo">完成了{this.dailyFinishedTodos[date].length}个任务</p>
          </div>
          <div className="todoList">
            {
              this.dailyFinishedTodos[date].map(todo=> <StatTodoItem key={todo.id} todo={todo} itemType="finish" />)
            }
          </div>
        </div>
      )
    })
    const deleteTodoList = this.deletedTodos.map(todo=>{
      return(
        <StatTodoItem key={todo.id} todo={todo} itemType="delete" />
      )
    })
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="已完成的任务" key="1">
          <div className="todoHistory" id="todoHistory">
            {finishTodoList}
          </div>
        </TabPane>
        <TabPane tab="已删除的任务" key="2">
        <div className="todoHistory" id="todoHistory">
            {deleteTodoList}
          </div>
        </TabPane>
      </Tabs>
    )
  }
}
const mapStateToProps = (state:any, ownProps:any) => ({
  todos: state.todos,
  ...ownProps
})
export default connect(mapStateToProps)(TodoHistory);