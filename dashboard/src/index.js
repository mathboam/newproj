import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Switch,Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
// import components
import App from './App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import './styles/styles.scss';
import Dashboard from './components/Dashboard/Dashboard'
import Auth from './components/Auth/Auth'

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
