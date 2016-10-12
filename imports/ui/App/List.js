import React, { Component } from 'react';
import Item from './Item';

class List extends Component {
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

export default List;