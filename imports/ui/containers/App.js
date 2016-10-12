import React, { Component, PropTypes } from 'react';


class AppContainer extends Component {

  render() {
    return (
      <div style={{ height: '100%' }} >
        {this.props.children}
      </div>
    )
  }
}


AppContainer.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default AppContainer