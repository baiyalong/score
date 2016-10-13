import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import Slider from 'material-ui/Slider';


class Item extends Component {
    constructor() {
        super()
        this.state = { value: 0 }
    }
    render() {
        return (
            <Card>
                <CardTitle
                    title={this.props.title}
                    subtitle={this.props.team}
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
                        <div style={{ color: 'red', position: 'absolute', top: '22px', right: 0 }}>
                            {this.state.value}
                        </div>
                    </div>
                    <LinearProgress mode="indeterminate" />
                    <Slider sliderStyle={{ margin: '8px 0 0 0' }} onChange={(event, value) => { this.setState({ value: Math.round(100 * value) }) } } />
                </CardText>
                <CardText
                    expandable={true}
                    style={{ padding: '8px 16px' }}
                    >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa.Aliquam erat volutpat.Nulla facilisi.
                    Donec vulputate interdum sollicitudin.Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
            </Card>
        );
    }
}

export default Item;