import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set//
//import '@coreui/icons/css/coreui-icons.min.css';
//import "~simple-line-icons/scss/simple-line-icons";
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
import './scss/style.css'
import 'react-table-hoc-fixed-columns/lib/styles.css';
import 'react-image-lightbox/style.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import './scss/_custom.scss';
import Login from './views/Login/AdminLogin';
import { DefaultLayout } from './containers';
import  RegisterLayout  from './containers/RegisterLayout/RegisterLayout';


class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route path="/admin" name="Admin" component={DefaultLayout} />
          <Route path="/" name="Home" component={RegisterLayout} />

        </Switch>
      </HashRouter>
    );
  }
}

export default App;
