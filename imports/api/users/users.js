
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
    online: { type: Boolean, defaultValue: true },
    role: { type: String, defaultValue: 'audience', allowedValues: ['audience', 'judge', 'player', 'admin'] },
    scores: { type: [String], optional: true }
});

// Users.attachSchema(Users.schema);

export default Users;