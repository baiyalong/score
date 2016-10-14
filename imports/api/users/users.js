
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
const Users = new Mongo.Collection('Users');



Users.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Users.schema = new SimpleSchema({
    fp: { type: String },
    conn: { type: String },
    online: { type: Boolean },
    focus: { type: Boolean },
    wakeup: { type: Boolean },
    role: { type: String, allowedValues: ['audience', 'judge', 'player', 'admin'] },
});

// Users.attachSchema(Users.schema);

export default Users;