
import Works from '../works';


Meteor.publish('Works', function () {
    return Works.find({}, { sort: { sn: 1 } });
})