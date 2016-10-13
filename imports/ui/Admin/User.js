import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';


const ellipsis = {
    textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'
}


class User extends Component {
    render() {
        return (
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>FP</TableHeaderColumn>
                        <TableHeaderColumn>角色</TableHeaderColumn>
                        <TableHeaderColumn>状态</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody showRowHover={true} displayRowCheckbox={false}>
                    {
                        this.props.users.map(e => {
                            return <TableRow key={e._id}>
                                <TableRowColumn style={ellipsis}>{e.fp}</TableRowColumn>
                                <TableRowColumn>{e.roleName}</TableRowColumn>
                                <TableRowColumn style={e.online ? { color: 'Chartreuse' } : { color: 'Gainsboro' }}>{e.onlineName}</TableRowColumn>
                            </TableRow>
                        })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableRowColumn >
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
        )
    }
}


import Users from '../../api/users/users';

export default createContainer(({ params }) => {
    Meteor.subscribe('users');
    const roleNames = {
        judge: '评委',
        audience: '观众',
        player: '参赛者'
    }
    const onlineNames = {
        true: '在线',
        false: '离线'
    }
    return {
        users: Users.find({}, { sort: { online: -1, role: 1 } }).fetch().map(e => Object.assign(e, { roleName: roleNames[e.role], onlineName: onlineNames[e.online] })),
    };
}, User);


const callback = (err, res) => Session.set('Info', { level: err ? '错误' : '信息', message: err ? err.message : '操作成功', timestamp: Date() });