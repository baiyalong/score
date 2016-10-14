import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton/IconButton';
import Remove from 'material-ui/svg-icons/content/remove';
import Abandon from 'material-ui/svg-icons/content/block';
import Random from 'material-ui/svg-icons/action/autorenew';
import UserDialog from './UserDialog';



const ellipsis = {
    textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'
}


class User extends Component {
    constructor() {
        super()
        this.state = { open: false, action: null, e: {} };
    }
    openDialog(state) {
        this.setState(Object.assign({ open: true }, state))
    }
    closeDialog(count) {
        if (count) this[this.state.action](count);
        this.setState({ open: false, action: null, e: {} })
    }
    randJudge(count) {
        this.props.randJudge(count)
    }
    remove() {
        this.props.remove(this.state.e)
    }
    abandon() {
        this.props.abandon(this.state.e)
    }
    render() {
        return (
            <div>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>FP</TableHeaderColumn>
                            <TableHeaderColumn>角色</TableHeaderColumn>
                            <TableHeaderColumn>在线/离线</TableHeaderColumn>
                            <TableHeaderColumn>聚焦/离开</TableHeaderColumn>
                            <TableHeaderColumn>唤醒/空闲</TableHeaderColumn>
                            <TableHeaderColumn width='10%'>
                                <IconButton tooltip='随机评委' onClick={() => this.openDialog({ action: 'randJudge', e: {} })} >
                                    <Random />
                                </IconButton>
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} displayRowCheckbox={false}>
                        {
                            this.props.users.map(e => {
                                return <TableRow key={e._id}>
                                    <TableRowColumn style={ellipsis}>{e.fp}</TableRowColumn>
                                    <TableRowColumn>{e.roleName}</TableRowColumn>
                                    <TableRowColumn style={e.online ? { color: 'Chartreuse' } : { color: 'Gainsboro' }}>{e.online ? '在线' : '离线'}</TableRowColumn>
                                    <TableRowColumn style={e.focus ? { color: 'Chartreuse' } : { color: 'Gainsboro' }}>{e.focus ? '聚焦' : '离开'}</TableRowColumn>
                                    <TableRowColumn style={e.wakeup ? { color: 'Chartreuse' } : { color: 'Gainsboro' }}>{e.wakeup ? '唤醒' : '空闲'}</TableRowColumn>
                                    <TableRowColumn width='10%'>
                                        <IconButton
                                            tooltip='删除'
                                            onClick={() => this.openDialog({ action: 'remove', e })}
                                            style={e.online ? { display: 'none' } : {}}>
                                            <Remove />
                                        </IconButton>
                                        <IconButton
                                            tooltip='弃权'
                                            onClick={() => this.openDialog({ action: 'abandon', e })}
                                            style={e.role == 'judge' ? {} : { display: 'none' }} >
                                            <Abandon />
                                        </IconButton>
                                    </TableRowColumn>
                                </TableRow>
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableRowColumn>
                                合计：{this.props.users.length}，
                                在线：{this.props.users.filter(e => e.online).length}，
                                在线评委：{this.props.users.filter(e => e.online&&e.role=='judge').length}，
                                在线观众：{this.props.users.filter(e => e.online&&e.role=='audience').length}，
                                在线参赛者：{this.props.users.filter(e => e.online&&e.role=='player').length}，
                                离线：{this.props.users.filter(e => !e.online).length}
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>

                <UserDialog {...this.state} closeDialog={(e) => this.closeDialog(e)}/>
            </div>
        )
    }
}


import async from 'async';
import Users from '../../api/users/users';

export default createContainer(({ params }) => {
    Meteor.subscribe('users');
    const roleNames = {
        judge: '评委',
        audience: '观众',
        player: '参赛者'
    }
    return {
        users: Users.find({}, { sort: { online: -1, role: 1 } }).fetch().map(e => Object.assign(e, { roleName: roleNames[e.role] })),
        randJudge: (count) => {
            async.series([
                callback => Meteor.call('user.resetJudge', callback),
                callback => Meteor.call('user.randJudge', count, callback)
            ], callback)
        },
        remove: (user) => Meteor.call('user.remove', user, callback),
        abandon: (user) => Meteor.call('user.changeRole', Object.assign(user, { role: 'audience' }), callback),
    };
}, User);


const callback = (err, res) => Session.set('Info', { level: err ? '错误' : '信息', message: err ? err.message : '操作成功', timestamp: Date() });