

const Scores = new Mongo.Collection('Scores');



Scores.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Scores.schema = new SimpleSchema({
    user: { type: String, regEx: SimpleSchema.RegEx.Id },
    work: { type: String, regEx: SimpleSchema.RegEx.Id },
    score: { type: Number, min: 0, max: 100, decimal: true},
});

Scores.attachSchema(Scores.schema);
