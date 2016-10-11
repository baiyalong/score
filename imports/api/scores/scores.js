

Scores = new Mongo.Collection('Scores');



Scores.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Scores.schema = new SimpleSchema({
    user: { type: String },
    work: { type: String },
    score: { type: Number },
});

Scores.attachSchema(Scores.schema);
