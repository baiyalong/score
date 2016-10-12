import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';


class Dialog extends Component {
    open() {
        this.setState({ open: true });
    }
    close() {
        this.setState({ open: false });
    }
    render() {
        const actions = [
            <RaisedButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => this.close() }
                />,
        ];
        return (
            <Dialog
                title={this.props.title}
                actions={actions}
                open={this.state.open}
                onRequestClose={() => this.close() }
                contentStyle={{ width: '100%', maxWidth: 'none' }}
                >
                {this.props.content}
            </Dialog>
        )
    }
}


Dialog.defaultProps = {
    title: '标题',
    content: '内容'

}

export default Dialog


