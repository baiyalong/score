import React, { Component, PropTypes } from 'react';
import Header from '../components/App/Header';
import Content from '../components/App/Content';


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



