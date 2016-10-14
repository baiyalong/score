import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Item from './Item';

class List extends Component {
    render() {
        return (
            <div>
                {
                    this.props.works.map(e => {
                        return <Item user={this.props.user} work={e} key={e._id} />
                    })
                }
            </div>
        );
    }
}


import Works from '../../api/works/works';

export default createContainer((props) => {
    Meteor.subscribe('works');
    return {
        user: props.user,
        works: Works.find({}, { sort: { sn: 1 } }).fetch().map(e => Object.assign(e, { score: e.final || '' + e.scores ? JSON.stringify(e.scores) : '' })),
    };
}, List);