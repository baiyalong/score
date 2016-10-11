import React, {Component, PropTypes} from 'react';
import Snackbar from 'material-ui/Snackbar';


class Alert extends Component {

    render() {
        const alert = {
            action: '错误',
            open: !!this.props.error,
            message: this.props.error || ''
        }

        return (
            <Snackbar {...alert} />
        )
    }
}


// Content.propTypes = {
//   children: React.PropTypes.element.isRequired
// }

export default Alert


