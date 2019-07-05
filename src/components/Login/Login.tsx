import * as React from 'react';
import { Input, Icon, Button } from 'antd';
import axios from 'src/config/axios';
import  { Link } from 'react-router-dom';
import './Login.scss';

interface ILoginState {
  account: string,
  password: string,
}

class Login extends React.Component<any, ILoginState> {
  constructor(props: any){
    super(props);
    this.state = {
      account: '',
      password: '',
    }
  }
  onChange = (key: keyof ILoginState ,value: string) => {
    const newState = {}
    newState[key] = value
    this.setState(newState)
  }
  submit = async () => {
    const { account, password } = this.state
    try{
      await axios.post('sign_in/user',{
        account, 
        password, 
      })
      this.props.history.push('/')
    }catch(e){
      console.log(e)
    }
  }
 
  public render (){
    const { account, password } = this.state
    return(
      <div className="container" id="login">
        <h1>番茄闹钟登录</h1>
        <Input 
          placeholder="输入账号"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
          value={account}
          onChange={(e) => this.onChange('account', e.target.value)}
        />
        <Input.Password placeholder="输入密码" value={password} onChange={(e) => this.onChange('password', e.target.value)} />
        <Button type="primary" onClick={this.submit} className="loginButton">登录</Button>
        <p>如果没有账号, 请立即<Link to="/signUp">注册</Link></p>
      </div>
    )
  }
}
export default Login;