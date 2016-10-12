
import Users from '../users';


Meteor.publish('Users', function () {
    if (this.userId)
        return Users.find({}, { sort: { online: 1, role: 1 } });
    else
        return Users.find({ conn: this.connection.id })
})