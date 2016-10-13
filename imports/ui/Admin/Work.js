import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import Insert from 'material-ui/svg-icons/content/add';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import WorkDialog from './WorkDialog';


const ellipsis = {
    textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'
}



class Work extends Component {
    constructor() {
        super()
        this.state = { open: false, action: null, e: {} };
    }
    openDialog(state) {
        this.setState(Object.assign({ open: true }, state))
    }
    closeDialog(e) {
        if (e) this[this.state.action](e);
        this.setState({ open: false, action: null, e: {} })
    }
    insert(e) {
        this.props.insert(e)
    }
    remove() {
        this.props.remove({ _id: this.state.e._id })
    }
    update(e) {
        this.props.update(Object.assign({ _id: this.state.e._id }, e))
    }
    detail() { }
    ascend() { }
    descend() { }

    render() {
        return (
            <div>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                        <TableRow>
                            <TableHeaderColumn>主题</TableHeaderColumn>
                            <TableHeaderColumn>团队</TableHeaderColumn>
                            <TableHeaderColumn>得分</TableHeaderColumn>
                            <TableHeaderColumn width='10%'>排名</TableHeaderColumn>
                            <TableHeaderColumn width='10%'>
                                <IconButton tooltip='添加' onClick={ () => this.openDialog({ action: 'insert', e: {} }) } >
                                    <Insert />
                                </IconButton>
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} displayRowCheckbox={false} >
                        {
                            this.props.works.map(e => {
                                return <TableRow key={e._id}>
                                    <TableRowColumn style={ellipsis}>{e.title}</TableRowColumn>
                                    <TableRowColumn style={ellipsis}>{e.team}</TableRowColumn>
                                    <TableRowColumn style={ellipsis}>{e.score}</TableRowColumn>
                                    <TableRowColumn width='10%'>{e.rank}</TableRowColumn>
                                    <TableRowColumn width='10%'>
                                        <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>} >
                                            <MenuItem primaryText="详情" onClick={ () => this.openDialog({ action: 'detail', e }) } />
                                            <MenuItem primaryText="修改" onClick={ () => this.openDialog({ action: 'update', e }) } />
                                            <MenuItem primaryText="删除" onClick={() => this.openDialog({ action: 'remove', e }) }/>
                                            <MenuItem primaryText="升序" onClick={() => this.ascend(e) }/>
                                            <MenuItem primaryText="降序" onClick={() => this.descend(e) }/>
                                        </IconMenu>
                                    </TableRowColumn>
                                </TableRow>
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableRowColumn >
                                合计：{this.props.works.length}，
                                已评分：{this.props.works.filter(e => e.scores).length}，
                                未评分：{this.props.works.filter(e => !e.scores).length}
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>

                <WorkDialog {...this.state} closeDialog={(e) => this.closeDialog(e)}/>
            </div>
        )
    }
}




import Works from '../../api/works/works';

export default createContainer(({ params }) => {
    Meteor.subscribe('works');
    return {
        works: Works.find().fetch().map(e => Object.assign(e, { score: e.final || '' + e.scores ? JSON.stringify(e.scores) : '' })),
        insert: (w) => Meteor.call('work.insert', w, callback),
        remove: (w) => Meteor.call('work.remove', w, callback),
        update: (w) => Meteor.call('work.update', w, callback),
    };
}, Work);



const callback = (err, res) => Session.set('Info', { level: err ? '错误' : '信息', message: err ? err.message : '操作成功', timestamp: Date() });