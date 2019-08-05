import * as React from "react";
import { Input, Icon, Button, message } from "antd";
import axios from "src/config/axios";
import { Link } from "react-router-dom";
import "./SignUp.scss";

interface ISignUpState {
  account: string;
  password: string;
  passwordConformation: string;
}

class SignUp extends React.Component<any, ISignUpState> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: "",
      password: "",
      passwordConformation: ""
    };
  }
  onChangeAccount = (e: any) => {
    this.setState({
      account: e.target.value
    });
  };
  onChangePassword = (e: any) => {
    this.setState({
      password: e.target.value
    });
  };
  onChangePasswordConformation = (e: any) => {
    this.setState({
      passwordConformation: e.target.value
    });
  };
  submit = async () => {
    const { account, password, passwordConformation } = this.state;
    try {
      await axios.post("sign_up/user", {
        account,
        password,
        password_confirmation: passwordConformation
      });
      this.props.history.push("/login");
    } catch (e) {
      message.error(e.response.data.errors);
    }
  };

  public render() {
    const { account, password, passwordConformation } = this.state;
    return (
      <div className="container" id="SignUp">
        <h1>番茄闹钟注册</h1>
        <Input
          placeholder="输入账号"
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          value={account}
          onChange={this.onChangeAccount}
        />
        <Input.Password
          placeholder="输入密码"
          value={password}
          onChange={this.onChangePassword}
        />
        <Input.Password
          placeholder="输确认密码"
          value={passwordConformation}
          onChange={this.onChangePasswordConformation}
        />
        <Button type="primary" onClick={this.submit} className="signButton">
          注册
        </Button>
        <p>
          如果你有账号, 请立即<Link to="/login">登录</Link>
        </p>
      </div>
    );
  }
}
export default SignUp;
