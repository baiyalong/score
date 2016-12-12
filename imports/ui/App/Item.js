import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton/IconButton';
import Plus from 'material-ui/svg-icons/content/add-circle';
import Minus from 'material-ui/svg-icons/content/remove-circle';
import { cyan500, pink500 } from 'material-ui/styles/colors';


class Item extends Component {
    br(str) {
        return str && str.split('\n').map((e, i) => <span key={i}>{e}<br /></span>)
    }
    render() {
        return (
            <Card>
                <CardTitle
                    title={this.props.work.title}
                    subtitle={this.props.work.team}
                    actAsExpander={true}
                    showExpandableButton={true}
                    style={{ padding: '8px 16px 0 16px' }}
                    />
                <CardText
                    style={{ padding: '8px 16px' }}
                    >
                    <div style={{ position: 'relative' }}>
                        <div style={{ color: 'red', position: 'absolute', top: '-16px', right: 0 }}>
                            {this.props.work.rank}
                        </div>
                        <div style={{ color: 'red', position: 'absolute', top: '4px', right: 0 }}>
                            {this.props.work.score}
                        </div>
                        <div style={this.props.role == 'judge' ? { color: 'red', position: 'absolute', top: '22px', right: 0 } : { display: 'none' }}>
                            {this.props.score}
                        </div>
                    </div>
                    <LinearProgress
                        mode={this.props.work.final && this.props.work.final != 0 ? 'determinate' : 'indeterminate'}
                        value={+this.props.work.final}
                        color={this.props.role == 'judge' ? pink500 : cyan500}
                        />
                    <Slider
                        sliderStyle={{ margin: '8px 0 0 0' }}
                        value={+(this.props.score / 100).toFixed(2)}
                        onChange={(event, value) => this.props.setScore(Math.round(100 * value))}
                        style={this.props.role == 'judge' ? {} : { display: 'none' }}
                        />
                </CardText>
                <CardText
                    expandable={true}
                    style={{ padding: '8px 16px' }}
                    >
                    <div>
                        <b>内容：</b><br />
                        <p>{this.br(this.props.work.content)}</p>
                        <br />
                        <b>创新点：</b><br />
                        <p>{this.br(this.props.work.innovation)}</p>
                        <br />
                        <b>预期成果：</b><br />
                        <p>{this.br(this.props.work.result)}</p>
                    </div>
                </CardText>
            </Card>
        );
    }
}


export default createContainer((props) => {
    return {
        user: props.user,
        role: props.user && props.user.role,
        work: props.work,
        score: props.score && props.score.score,
        setScore: (score) => {
            score = Math.max(score, 0);
            score = Math.min(score, 100);
            Meteor.call('score.set', { user: props.user._id, work: props.work._id, score })
        }
    };
}, Item);


// const callback = (err, res) => Session.set('Info', { level: err ? '错误' : '信息', message: err ? err.message : '操作成功', timestamp: Date() });