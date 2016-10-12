import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
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


export default createContainer(({ params }) => {
    return {
        error: Session.get('error')
    };
}, Info);






