import React, { Component, PropTypes } from 'react';
import Header from './Header'
import Menu from './Menu'


class Admin extends Component {

  render() {
    return (
      <div style={{ height: '100%' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }} >
          <Header />
        </div>
        <div style={{ height: '100%', paddingTop: '56px' }} >
          <Menu />
          {this.props.children}
        </div>
      </div>
    )
  }
}


Admin.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default Admin