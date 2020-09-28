import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux'


import { AppAside,   AppBreadcrumb2 as AppBreadcrumb, AppFooter, AppHeader, AppSidebar, AppSidebarFooter, AppSidebarForm, AppSidebarHeader, AppSidebarMinimizer, AppSidebarNav } from '@coreui/react'
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

import local from '../../services/local';
import api from '../../services/api';
import _ from 'lodash';
import i18next from 'i18next';


const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      nav: []
    }
  }

  async componentDidMount() {

    console.log("Default Lay")
    try {
      var session = await local.get('session')
      if (!session || session == 'undefined') {
        if (this.props.location.pathname == "/forgotPass") {
          return this.props.history.push(`/forgotPass`);
        }
        this.props.history.replace('/login');

      } else {
        let userInfo = local.get('user');

        this.setState({ nav: navigation });
        this.setState({ loading: false });
      
      }

    } catch (err) {
      console.log('err here', err)
      this.props.history.replace('/login');
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    if (this.state.loading) return (<p>{'PROCESSING'}</p>)

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              {/*<AppSidebarNav navConfig={this.state.nav} location={this.props.location} />*/}
              <AppSidebarNav navConfig={this.state.nav} router={router} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                      <route.component {...props} />
                    )} />)
                      : (null);
                  },
                  )}
                  <Redirect from="/" to="/member-history" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>

        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userinfo: state.userinfo }
}
export default connect(mapStateToProps)(DefaultLayout);

// export default DefaultLayout;
