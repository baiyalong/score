import React, {Component, PropTypes} from 'react';
import Snackbar from 'material-ui/Snackbar';


class Info extends Component {

    render() {
        const info = {
            action: this.props.error.level || '错误',
            open: !!this.props.error.message,
            message: this.props.error.message
        }
        return (
            <Snackbar {...info} />
        )
    }
}


Info.defaultProps = {
    error: {
        level: '错误',
        message: '',
    }

}

export default Info


