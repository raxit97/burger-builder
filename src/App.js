import React, { Component } from 'react';
import Layout from './components/layout/layout';
import BurgerBuilder from './containers/burger-builder/burger-builder';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }

}

export default App;
