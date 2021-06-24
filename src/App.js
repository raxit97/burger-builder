import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Layout from './components/layout/layout';
import BurgerBuilder from './pages/burger-builder/burger-builder';
import * as actions from './store/actions/index';

const Auth = React.lazy(() => import('./pages/auth/auth'));
const Logout = React.lazy(() => import('./pages/auth/logout/logout'));
const Orders = React.lazy(() => import('./pages/orders/orders'));
const Checkout = React.lazy(() => import('./pages/checkout/checkout'));

const App = (props) => {

  const { authCheckState } = props;
  useEffect(() => {
    authCheckState();
  }, [authCheckState]);

  let routes = (
    <Switch>
      <Route path="/auth" render={() =>
        <Suspense fallback={<div>Loading...</div>}><Auth /></Suspense>}
      />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={() =>
          <Suspense fallback={<div>Loading...</div>}><Checkout /></Suspense>
        } />
        <Route path="/orders" render={() =>
          <Suspense fallback={<div>Loading...</div>}><Orders /></Suspense>
        } />
        <Route path="/logout" render={() =>
          <Suspense fallback={<div>Loading...</div>}><Logout /></Suspense>
        } />
        <Route path="/auth" render={() =>
          <Suspense fallback={<div>Loading...</div>}><Auth /></Suspense>
        } />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );

}

const mapStatetoProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authCheckState: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(App));
