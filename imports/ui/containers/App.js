import React, {Component, PropTypes} from 'react';


class CoreLayoutView extends Component {

  render() {
    return (
        <div style={{ height: '100%', paddingTop: '56px' }} >
          {this.props.children}
        </div>
    )
  }
}


CoreLayoutView.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayoutView