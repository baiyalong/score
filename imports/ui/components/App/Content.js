import React, { Component } from 'react';
import Item from './Item';

class Content extends Component {
    render() {
        return (
            <div>
                <Item />
                <Item />
                <Item />
            </div>
        );
    }
}

export default Content;