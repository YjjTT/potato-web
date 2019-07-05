import * as React from 'react';
import axios from '../../config/axios';
import { Button } from 'antd';

interface IRouter {
  history: any
}
interface IIndexSatate {
  user: any
}
class Index extends React.Component<IRouter,IIndexSatate> {
  constructor(props: any){
    super(props);
    this.state = {
      user: {}
    }
  }

  async componentWillMount(){
    await this.getMe()
  }

  getMe = async () => {
    try{
      const response = await axios.get('me')
      this.setState({
        user: response.data
      })
    }catch(e){
      console.log(e)
      // if(e.response.status === 401){
      //   this.props.history.push('/login')
      // }
    }
  }

  logout = () => {
    localStorage.setItem('x-token', '')
    this.props.history.push('/login')
  }
  public render (){
    return(
      <div className="container">
        <p>欢迎, {this.state.user.account}</p>
        <Button onClick={this.logout}>注销</Button>
      </div>
    )
  }
}
export default Index;