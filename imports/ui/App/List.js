import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Item from './Item';

class List extends Component {
    render() {
        return (
            <div>
                {
                    this.props.works.map(e => {
                        return <Item
                            user={this.props.user}
                            work={e}
                            score={this.props.scores.find(s => s.work == e._id)}
                            key={e._id} />
                    })
                }
            </div>
        );
    }
}


import Works from '../../api/works/works';
import Scores from '../../api/scores/scores';

export default createContainer((props) => {
    var user = props.user;
    Meteor.subscribe('works');
    if (user && user.role == 'judge')
        Meteor.subscribe('scores', { user: user._id });
    return {
        user,
        scores: Scores.find().fetch(),
        works: Works.find({}, { sort: { sn: 1 } }).fetch().map(e => Object.assign(e, { score: (e.scores && e.scores.length ? JSON.stringify(e.scores) : '') + (!e.final || e.final == 0 ? '' : e.final) })),
    };
}, List);