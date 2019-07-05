/*
 * @Author: yjjtt 
 * @Date: 2019-07-05 15:24:52 
 * @Last Modified by: yjjtt
 * @Last Modified time: 2019-07-05 17:30:47
 */
import * as React from 'react';
import './App.scss';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Index from './components/Index/Index';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Route exact={true} path="/" component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/signUp" component={SignUp}/>
      </Router>
    );
  }
}

export default App;
