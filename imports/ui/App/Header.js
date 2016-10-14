import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { cyan500 } from 'material-ui/styles/colors';
import Help from 'material-ui/svg-icons/action/help-outline';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }
    openModal() {
        this.setState({ open: true });
    }
    closeModal() {
        this.setState({ open: false });
    }
    render() {
        const actions = [
            <RaisedButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => this.closeModal()}
                />,
        ];
        return (
            <Toolbar style={{ backgroundColor: cyan500 }} >
                <ToolbarTitle text='众创' style={{ color: 'white' }} />
                <ToolbarGroup>
                    <DropDownMenu value={this.props.role}
                        onChange={(event, index, value) => this.props.changeRole(value)}
                        labelStyle={{ color: 'white' }}
                        style={{ margin: 0 }}
                        >
                        <MenuItem value={'judge'} primaryText="评委" disabled={this.props.role != 'judge'} />
                        <MenuItem value={'audience'} primaryText="观众" />
                        <MenuItem value={'player'} primaryText="参赛者" />

                    </DropDownMenu>
                    <Help
                        style={{ margin: '16px -8px 0 0' }}
                        color={'white'}
                        onTouchTap={() => this.openModal()}
                        />
                    <Dialog
                        title="帮助"
                        actions={actions}
                        open={this.state.open}
                        onRequestClose={() => this.closeModal()}
                        contentStyle={{ width: '100%', maxWidth: 'none' }}
                        >
                        评分规则：<br />
                        去掉最高分和最低分，取剩余分数的平均值。<br />
                        用户可以主动选择角色为观众，或者参赛者。<br />
                        管理员从活跃的在线观众中随机若干位评委。<br />
                        评委弃权（变换角色）则随机在线观众补充。<br />
                        管理员有权主动设置非活跃状态的评委弃权。<br />
                        系统始终保留评委的评分，断线后自动重连。<br />
                    </Dialog>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}



export default createContainer((props) => {
    return {
        role: props.user && props.user.role,
        changeRole: (role) => Meteor.call('user.changeRole', Object.assign(props.user, { role }), callback),
    };
}, Header);


const callback = (err, res) => Session.set('Info', { level: err ? '错误' : '信息', message: err ? err.message : '操作成功', timestamp: Date() });