import * as React from "react";
import { connect } from "react-redux";
import TodoInput from "./TodoInput";
import "./Todos.scss";
import TodoItem from "./TodoItem";
import { Empty } from "antd";

class Todos extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  get unDeletedTodos() {
    return this.props.todos.filter((item: any) => !item.deleted);
  }

  get unCompletedTodos() {
    return this.unDeletedTodos.filter((item: any) => !item.completed);
  }

  get completedTodos() {
    return this.unDeletedTodos.filter((item: any) => item.completed);
  }

  public render() {
    return (
      <div className="container" id="todos">
        <TodoInput />
        <div className="todoList">
          {this.unCompletedTodos.length !== 0 ? (
            this.unCompletedTodos.map((item: any) => (
              <TodoItem key={item.id} {...item} />
            ))
          ) : (
            <Empty
              image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
              imageStyle={{
                height: 60
              }}
              description={<span>暂无未完成的任务</span>}
            />
          )}
          {/* {
            this.completedTodos.map((item:any)=> 
            <TodoItem key={item.id} {...item} /> )
          } */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
