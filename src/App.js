import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/layout/layout';
import BurgerBuilder from './pages/burger-builder/burger-builder';
import Checkout from './pages/checkout/checkout';
import Orders from './pages/orders/orders';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }

}

export default App;
