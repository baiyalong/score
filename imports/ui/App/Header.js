import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {cyan500} from 'material-ui/styles/colors';
import Help from 'material-ui/svg-icons/action/help-outline';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { role: 1, open: false };
    }
    openModal() {
        this.setState({ open: true });
    }
    closeModal() {
        this.setState({ open: false });
    }
    onRoleChange(event, index, value) {
        this.setState({ role: value });
    }
    render() {
        const actions = [
            <RaisedButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => this.closeModal() }
                />,
        ];
        return (
            <Toolbar style={{ backgroundColor: cyan500 }} >
                <ToolbarTitle text='众创' style={{ color: 'white' }} />
                <ToolbarGroup>
                    <DropDownMenu value={1}
                        onChange={(...a) => this.onRoleChange(...a) }
                        labelStyle={{ color: 'white' }}
                        iconStyle={{ display: 'none' }}
                        style={{ margin: 0 }}
                        >
                        <MenuItem value={1} primaryText="观众" />
                        <MenuItem value={2} primaryText="参赛者" />
                        <MenuItem value={3} primaryText="评委" />
                    </DropDownMenu>
                    <Help
                        style={{ margin: '16px -8px 0 0' }}
                        color={'white' }
                        onTouchTap={() => this.openModal() }
                        />
                    <Dialog
                        title="帮助"
                        actions={actions}
                        open={this.state.open}
                        onRequestClose={() => this.closeModal() }
                        contentStyle={{ width: '100%', maxWidth: 'none' }}
                        >
                        评分规则：<br/>
                        去掉最高分和最低分，取剩余分数的平均值。<br/>
                        7位评委从在线的观众中随机选出。<br/>
                        评委弃权（变换角色）则随机在线观众补充。<br/>
                        当前窗口处于非活跃状态则视为用户不在线。<br/>
                        系统始终保留评委的评分。<br/>
                    </Dialog>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default Header;