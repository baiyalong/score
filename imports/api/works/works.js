

Works = new Mongo.Collection('Works');



Works.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Works.schema = new SimpleSchema({
    title: { type: String },
    author: { type: String },
    content: { type: String },
    scores: { type: [Number] },
    final: { type: Number },
    rank: { type: String },
});

Works.attachSchema(Works.schema);
