import * as React from "react";
import axios from "../../config/axios";
import history from '../../config/history';
import { Dropdown, Icon, Menu } from "antd";
import './Home.scss';
// import Todos from 'src/components/Todos/Todos';
// import Tomatoes from '../Tomatoes/Tomatoes';
import Statistics from '../Statistics/Statistics';
import { connect } from 'react-redux'
import { initTodos } from '../../redux/actions/todos';
import { initTomato } from '../../redux/actions/tomatoes'
interface IIndexSatate {
  user: any;
}
const logout = () => {
  localStorage.setItem("x-token", "");
  history.push("/login");
};
const menu = (
  <Menu>
    <Menu.Item key="1"><Icon type="user" />个人设置</Menu.Item>
    <Menu.Item key="2" onClick={logout}><Icon type="logout" />注销</Menu.Item>
  </Menu>
);
class Home extends React.Component<any, IIndexSatate> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async componentWillMount() {
    await this.getMe();
    await this.getTodos();
    await this.getTomatoes();
  }

  getMe = async () => {
    try {
      const response = await axios.get("me");
      this.setState({
        user: response.data
      });
    } catch (e) {
      console.log(e);
    }
  };
  getTodos = async () => {
    try{
      const res = await axios.get('todos')
      const todos = res.data.resources.map((item:any)=>Object.assign({},item,{editing: false}))
      this.props.initTodos(todos)
    }catch(e) {
      console.log(e)
    }
  }
  getTomatoes = async () => {
    try{
      const res = await axios.get('tomatoes')
      this.props.initTomato(res.data.resources)
    }catch(e){
      throw new Error(e)
    }
  }
  public render() {
    return (
      <div className="container" id="index">
        <header>
          <span className="logo">LOGO</span>
          <Dropdown overlay={menu}>
            <span>
              {this.state.user.account} <Icon type="down" style={{ marginLeft: 4}}/>
            </span>
          </Dropdown>
        </header>
        {/* <main>
          <Tomatoes />
          <Todos />
        </main> */}
        <Statistics />
      </div>
    );
  }
}
const mapStateToProps = (state:any, ownProps:any) => ({
  ...ownProps
})
const mapDispatchToProps = {
  initTodos,
  initTomato
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);
