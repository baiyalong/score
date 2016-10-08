import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


class RootLayoutView extends Component {

    render() {
        if (!this.props.checkAuth()) return false;
        return (
            <MuiThemeProvider  style={{ height: '100%' }}>
                {this.props.children}
            </MuiThemeProvider>
        )
    }
}

RootLayoutView.propTypes = {
    children: React.PropTypes.element.isRequired
}

export default RootLayoutView