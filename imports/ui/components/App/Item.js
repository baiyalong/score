import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import Slider from 'material-ui/Slider';


class Item extends Component {
    render() {
        return (
            <Card>
                <CardTitle
                    title="前端组件化框架及其应用"
                    subtitle="白亚龙，白亚龙，白亚龙"
                    actAsExpander={true}
                    showExpandableButton={true}
                    style={{ padding: '8px 16px 0 16px' }}
                    />
                <CardText
                    style={{ padding: '8px 16px' }}
                    >
                    <div style={{ position: 'relative' }}>
                        <div style={{ color: 'red', position: 'absolute', top: '-16px', right: 0 }}>
                            1/9
                        </div>
                        <div style={{ color: 'red', position: 'absolute', top: '4px', right: 0 }}>
                            [11 22 33 44 55 66 77] 99.99
                        </div>
                        <div style={{ color: 'red', position: 'absolute', top: '22px', right: 0 }}>
                            88
                        </div>
                    </div>
                    <LinearProgress mode="indeterminate" />
                    <Slider sliderStyle={{ margin: '8px 0 0 0' }} />
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