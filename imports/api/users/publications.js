
import Users from './users';


Meteor.publish('users', function () {
    if (this.userId)
        return Users.find({}, { sort: { online: -1, role: 1 } });
    else
        return Users.find({ conn: this.connection.id })
})