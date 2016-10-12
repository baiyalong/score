

export const Works = new Mongo.Collection('Works');



Works.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Works.schema = new SimpleSchema({
    sn: { type: Number, min: 0, unique: true },
    title: { type: String, unique: true },
    author: { type: String },
    content: { type: String },
    scores: { type: [Number], optional: true },
    final: { type: Number, optional: true, min: 0, max: 100 },
    rank: { type: String, optional: true },
});

Works.attachSchema(Works.schema);
