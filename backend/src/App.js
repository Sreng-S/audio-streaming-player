import React, { Component } from 'react';

import Router from './router';
import { AppContext, LoadingView } from './components';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.showLoading = () => {
      this.setState({
        loading: true
      });
    };
    this.hideLoading = () => {
      this.setState({
        loading: false
      });
    };
    this.state = {
      loading: false,
      showLoading: this.showLoading,
      hideLoading: this.hideLoading
    };
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className='App'>
          <Router />
        </div>
        <LoadingView />
      </AppContext.Provider>
    );
  }
}

export default App;
