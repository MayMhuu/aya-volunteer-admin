import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
//import '@coreui/icons/css/coreui-icons.min.css';

// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
import './scss/style.css'
import 'react-table-hoc-fixed-columns/lib/styles.css';
import 'react-image-lightbox/style.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import "react-datepicker/dist/react-datepicker.css";
import './index.css';
import './scss/_custom.scss';
import Login from './views/Login/AdminLogin';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" name="Login Page" component={Login} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
