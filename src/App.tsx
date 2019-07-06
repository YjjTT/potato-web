/*
 * @Author: yjjtt 
 * @Date: 2019-07-05 15:24:52 
 * @Last Modified by: yjjtt
 * @Last Modified time: 2019-07-05 19:20:30
 */
import * as React from 'react';
import './App.scss';
import { Route, Router } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import history from './config/history';

class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/signUp" component={SignUp}/>
      </Router>
    );
  }
}

export default App;
