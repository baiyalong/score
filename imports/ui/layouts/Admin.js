import React, { Component, PropTypes } from 'react';
import Header from '../components/Admin/Header'
import Menu from '../components/Admin/Menu'


class AdminContainer extends Component {

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


AdminContainer.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default AdminContainer