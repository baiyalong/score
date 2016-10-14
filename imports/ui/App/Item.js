import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import Slider from 'material-ui/Slider';


class Item extends Component {
    constructor() {
        super()
        this.state = { value: 0 }
    }
    changeValue(event, value) {
        const score = Math.round(100 * value)
        this.setState({ value: score })
        this.props.score(score)
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
                            {this.props.rank}
                        </div>
                        <div style={{ color: 'red', position: 'absolute', top: '4px', right: 0 }}>
                            {this.props.score}
                        </div>
                        <div style={this.props.role == 'judge' ? { color: 'red', position: 'absolute', top: '22px', right: 0 } : { display: 'none' }}>
                            {this.state.value}
                        </div>
                    </div>
                    <LinearProgress
                        mode={this.props.final ? 'determinate' : 'indeterminate'}
                        value={this.props.final} />
                    <Slider
                        sliderStyle={{ margin: '8px 0 0 0' }}
                        onChange={(event, value) => this.changeValue(event, value)}
                        style={this.props.role == 'judge' ? {} : { display: 'none' }} />
                </CardText>
                <CardText
                    expandable={true}
                    style={{ padding: '8px 16px' }}
                    >
                    {this.props.work.content}
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
        score: (score) => Meteor.call('score.set', { user: props.user._id, work: props.work._id, score }, callback),
    };
}, Item);


const callback = (err, res) => Session.set('Info', { level: err ? '错误' : '信息', message: err ? err.message : '操作成功', timestamp: Date() });