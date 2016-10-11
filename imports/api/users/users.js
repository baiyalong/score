

const Users = new Mongo.Collection('Users');



Users.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Users.schema = new SimpleSchema({
    fp: { type: String, unique: true },
    conn: { type: String, unique: true },
    online: { type: Boolean, defaultValue: true },
    role: { type: String, defaultValue: 'audience', allowedValues: ['audience', 'judge', 'player', 'admin'] },
    scores: { type: [Object], optional: true },
    'scores.$.work': { type: String, regEx: SimpleSchema.RegEx.Id },
    'scores.$.score': { type: Number, regEx: SimpleSchema.RegEx.Id, min: 0, max: 100, decimal: true },
});

Users.attachSchema(Users.schema);
