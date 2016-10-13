
import Works from './works';


Meteor.publish('works', function () {
    return Works.find({}, { sort: { sn: 1 } });
})