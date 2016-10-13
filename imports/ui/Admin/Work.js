import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';


let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['zh-Hans-CN'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/zh-Hans-CN');
}


const ellipsis = {
    textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'
}



class Work extends Component {
    constructor() {
        super()
        this.state = { open: false };
    }
    openDialog() {
        this.setState({ open: true })
    }
    closeDialog(b) {
        this.setState({ open: false })
        if (b) this.insert()
    }
    insert() {
        this.props.insert({
            title: this.refs.title.input.value,
            team: this.refs.team.input.value,
            start: this.refs.start.state.date,
            end: this.refs.end.state.date,
            content: this.refs.content.input.value,
            innovation: this.refs.innovation.input.value,
            result: this.refs.result.input.value,
            arrangement: this.refs.arrangement.input.value,
            resource: this.refs.resource.input.value,
            other: this.refs.other.input.value,
        })
    }
    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={() => this.closeDialog() }
                />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => this.closeDialog(true) }
                />,
        ];
        return (
            <div>
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        >
                        <TableRow>
                            <TableHeaderColumn>主题</TableHeaderColumn>
                            <TableHeaderColumn>团队</TableHeaderColumn>
                            <TableHeaderColumn>得分</TableHeaderColumn>
                            <TableHeaderColumn width='10%'>排名</TableHeaderColumn>
                            <TableHeaderColumn width='10%'>
                                <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>} >
                                    <MenuItem primaryText="添加" onClick={ () => this.openDialog() } />
                                    <MenuItem primaryText="刷新" />
                                </IconMenu>
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        showRowHover={true}
                        displayRowCheckbox={false}
                        >
                        <TableRow>
                            <TableRowColumn style={ellipsis}>众创在线评分系统（二期）众创在线评分系统（二期）</TableRowColumn>
                            <TableRowColumn style={ellipsis}>白亚龙，潘鲲，叶珍</TableRowColumn>
                            <TableRowColumn style={ellipsis}>99.99[11, 22, 33, 44, 55, 66, 77]</TableRowColumn>
                            <TableRowColumn width='10%'>1/9</TableRowColumn>
                            <TableRowColumn width='10%'>
                                <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>} >
                                    <MenuItem primaryText="详情" onClick={ () => this.openDialog() } />
                                    <MenuItem primaryText="修改" onClick={ () => this.openDialog() } />
                                    <MenuItem primaryText="删除" />
                                    <MenuItem primaryText="升序" />
                                    <MenuItem primaryText="降序" />
                                </IconMenu>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                    <TableFooter
                        >
                        <TableRow>
                            <TableRowColumn colSpan="3" >
                                合计：5，已评分：2，未评分：3
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>


                <Dialog
                    title="众创活动"
                    modal={true}
                    actions={actions}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                    onRequestClose={() => this.closeDialog() }
                    >
                    <div>
                        <TextField type='text' floatingLabelText='主题' ref='title' fullWidth={true}/><br/>
                        <TextField type='text' floatingLabelText='团队' ref='team' fullWidth={true}/><br/>
                        <DatePicker floatingLabelText="申请日期" ref='start' container="inline" DateTimeFormat={DateTimeFormat} locale="zh-Hans-CN" okLabel="确定" cancelLabel="取消" fullWidth={true}/>
                        <DatePicker floatingLabelText="预计完成日期" ref='end' container="inline" DateTimeFormat={DateTimeFormat} locale="zh-Hans-CN" okLabel="确定" cancelLabel="取消" fullWidth={true}/>
                        <TextField type='text' floatingLabelText='活动内容' ref='content' fullWidth={true} multiLine={true}/><br/>
                        <TextField type='text' floatingLabelText='创新性说明' ref='innovation' fullWidth={true} multiLine={true}/><br/>
                        <TextField type='text' floatingLabelText='预期成果' ref='result' fullWidth={true} multiLine={true}/><br/>
                        <TextField type='text' floatingLabelText='人员分工' ref='arrangement' fullWidth={true} multiLine={true}/><br/>
                        <TextField type='text' floatingLabelText='申请资源' ref='resource' fullWidth={true} multiLine={true}/><br/>
                        <TextField type='text' floatingLabelText='其他' ref='other' fullWidth={true} multiLine={true}/><br/>
                    </div>
                </Dialog>
            </div>
        )
    }
}


export default createContainer(({ params }) => {
    return {
        get: () => { },
        insert: (w) => {
            console.log(w)
        },
        delete: () => { },
        update: () => { },
    };
}, Work);



