import * as React from "react";
import axios from "../../config/axios";
import history from '../../config/history';
import { Dropdown, Icon, Menu } from "antd";
import './Home.scss';
import Todos from 'src/components/Todos/Todos';
import Tomatoes from '../Tomatoes/Tomatoes';

interface IRouter {
  history: any;
}
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
class Home extends React.Component<IRouter, IIndexSatate> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async componentWillMount() {
    await this.getMe();
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
        <main>
          <Tomatoes />
          <Todos />
        </main>
      </div>
    );
  }
}
export default Home;
