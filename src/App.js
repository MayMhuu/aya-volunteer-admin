import React, { useEffect } from 'react';
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
import AdminLogin from './views/Login/AdminLogin';
import { DefaultLayout } from './containers';
import RegisterLayout from './containers/RegisterLayout/RegisterLayout';
import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth'



const App = () =>  {
 // useEffect(() => { store.dispatch(loadUser()); }, []);
    return (
      <Provider store ={store}>
        <HashRouter>
          <Switch>
            <Route exact path="/" name="Login Page" component={AdminLogin} />
            <Route path="/admin" name="Admin" component={DefaultLayout} />
            <Route path="/vol" name="Home" component={RegisterLayout} />
          </Switch>
        </HashRouter>
      </Provider>
    );
}

export default App;
