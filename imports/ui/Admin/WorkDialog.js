import React, {Component, PropTypes} from 'react';
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



export default class WorkDialog extends Component {
    constructor() {
        super()
        this.state = {};
    }
    componentDidMount() {
        console.log(this.props)
        this.setState(this.props.e)
    }
    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={() => this.props.closeDialog() } />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => this.props.closeDialog(this.state) } />,
        ]
        const fields = [
            { name: '主题', code: 'title', type: 'text' },
            { name: '团队', code: 'team', type: 'text' },
            { name: '申请日期', code: 'start', },
            { name: '预计完成日期', code: 'end', },
            { name: '活动内容', code: 'content', type: 'text', multiLine: true },
            { name: '创新性说明', code: 'innovation', type: 'text', multiLine: true },
            { name: '预期成果', code: 'result', type: 'text', multiLine: true },
            { name: '人员分工', code: 'arrangement', type: 'text', multiLine: true },
            { name: '申请资源', code: 'resource', type: 'text', multiLine: true },
            { name: '其他', code: 'other', type: 'text', multiLine: true },
        ]
        const content = (
            this.props.action == 'remove'
                ?
                <div style={{ textAlign: 'center' } }>确认要删除吗？</div>
                :
                <div>
                    {
                        fields.map(e => {
                            return <Field
                                {...e}
                                value={this.state[e.code]}
                                changeValue={(v) => this.setState({ [e.code]: v }) }
                                key={e.code}/>
                        })
                    }
                </div>
        )

        return (
            <Dialog
                title="众创活动"
                modal={true}
                actions={actions}
                open={this.props.open}
                autoScrollBodyContent={this.props.action != 'remove'}
                onRequestClose={() => this.props.closeDialog() } >
                {content}
            </Dialog>
        )
    }
}


class Field extends Component {
    constructor() {
        super()
        this.state = {};
    }
    componentDidMount() {
        this.setState({ value: this.props.value })
    }
    render() {
        return this.props.type == 'text'
            ?
            <TextField
                type='text'
                floatingLabelText={this.props.name}
                value={this.state.value}
                onChange={(event, value) => { this.props.changeValue(value) } }
                fullWidth={true}
                multiLine={this.props.multiLine}/>
            :
            <DatePicker
                floatingLabelText={this.props.name}
                value={this.state.value}
                onChange={(event, value) => { this.props.changeValue(value) } }
                container="inline" DateTimeFormat={DateTimeFormat}
                locale="zh-Hans-CN"
                okLabel="确定"
                cancelLabel="取消"
                fullWidth={true}/>
    }
}