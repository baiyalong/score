import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


const count = 7;


export default class UserDialog extends Component {
    constructor() {
        super()
        this.state = { value: count };
    }
    closeDialog(value) {
        this.props.closeDialog(value)
        this.state = { value: count };
    }
    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={() => this.closeDialog()} />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => this.closeDialog(this.state.value)} />,
        ]
        const content = (
            this.props.action == 'randJudge'
                ?
                <div style={{ textAlign: 'center' }}>
                    <TextField
                        type='number'
                        min='0'
                        max='100'
                        floatingLabelText='评委人数'
                        value={this.state.value}
                        onChange={(event, value) => { this.setState({ value }) } }
                        />
                </div>
                :
                <div style={{ textAlign: 'center' }}>确认要{this.props.action == 'remove' ? '删除' : '弃权'}吗？</div>
        )

        return (
            <Dialog
                title="用户管理"
                modal={true}
                actions={actions}
                open={this.props.open}
                onRequestClose={() => this.closeDialog()} >
                {content}
            </Dialog>
        )
    }
}

