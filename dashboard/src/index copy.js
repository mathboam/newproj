import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,

  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';

import SignUp from './components/SignUp/SignUp';

import './styles/styles.scss';
import Dashboard from './components/Dashboard/Dashboard'
import Auth from './components/Auth/Auth'

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Auth path="/dashboard" >
          <Dashboard />
        </Auth>
        <Route path="/SignUp" component={SignUp}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
