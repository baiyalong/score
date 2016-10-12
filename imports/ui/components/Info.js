import React, {Component, PropTypes} from 'react';
import Snackbar from 'material-ui/Snackbar';


class Info extends Component {

    render() {
        const info = {
            action: this.props.level,
            open: !!this.props.error,
            message: this.props.error
        }
        return (
            <Snackbar {...info} />
        )
    }
}


Info.defaultProps = {
    level: '错误',
    open: false,
    error: '',
}

export default Info


