import * as React from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import _ from 'lodash'
import {Tabs} from 'antd';
import '../TodoHistory.scss';
import StatTodoItem from '../StatTodoItem'

interface ITomatoHistoryProps{
  tomatoes: any[]
}

const { TabPane } = Tabs;

class TomatoHistory extends React.Component<ITomatoHistoryProps> {

  get finishedTomatoes(){
    return this.props.tomatoes.filter(t=>t.description && t.ended_at && !t.aborted)
  }
  get abortTomatoes(){
    return this.props.tomatoes.filter(t=>t.aborted)
  }
  get dailyFinishedTomatoes(){
    return _.groupBy(this.finishedTomatoes, (tomatoes)=>{
      return format(tomatoes.started_at, 'YYYY-MM-DD')
    })
  }
  get finishDates(){
    return Object.keys(this.dailyFinishedTomatoes).sort((a,b)=>Date.parse(b)-Date.parse(a))
  }
  constructor(props:any){
    super(props);
  }
  public render (){
    const finishTomatoes = this.finishDates.map(date=>{
      return(
        <div key={date} className="dailyTodos">
          <div className="summary">
            <p className="summaryDate">
              <span>{date}</span>
              <span>周五</span>
            </p>
            <p className="summaryFinishInfo">完成了{this.dailyFinishedTomatoes[date].length}个番茄</p>
          </div>
          <div className="todoList">
            {
              this.dailyFinishedTomatoes[date].map(tomatoes=> <StatTodoItem key={tomatoes.id} todo={tomatoes} itemType="finishTomatoes" />)
            }
          </div>
        </div>
      )
    })
    const abortTomatoes = this.abortTomatoes.map(tomatoes=>{
      return(
        <StatTodoItem key={tomatoes.id} todo={tomatoes} itemType="abortTomatoes" />
      )
    })
    return (
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="完成的番茄" key="1">
          <div className="todoHistory" id="todoHistory">
            {finishTomatoes}
          </div>
        </TabPane>
        <TabPane tab="打断的番茄" key="2">
        <div className="todoHistory" id="todoHistory">
            {abortTomatoes}
          </div>
        </TabPane>
      </Tabs>
    )
  }
}
const mapStateToProps = (state:any, ownProps:any) => ({
  tomatoes: state.tomatoes,
  ...ownProps
})
export default connect(mapStateToProps)(TomatoHistory);