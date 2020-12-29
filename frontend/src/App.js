import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UsersList from './UserList';
import GroupEdit from './GroupEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/users' exact={true} component={UsersList}/>
          <Route path='/user/:id' component={GroupEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;