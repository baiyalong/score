import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


class RootContainer extends Component {

    render() {
        return (
            <MuiThemeProvider style={{ height: '100%' }}>
                {this.props.children}
            </MuiThemeProvider>
        )
    }
}

RootContainer.propTypes = {
    // children: React.PropTypes.element.isRequired
}

export default RootContainer