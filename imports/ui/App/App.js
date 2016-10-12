import React, { Component, PropTypes } from 'react';
import Header from './Header';
import List from './List';


class App extends Component {
  render() {
    return (
      <div style={{ height: '100%' }} >
        <Header />
        <List />
      </div>
    )
  }
}


export default App



