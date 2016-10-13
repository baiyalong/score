
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
const Works = new Mongo.Collection('Works');



Works.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Works.schema = new SimpleSchema({
    sn: { type: Number, min: 0 },
    scores: { type: [Number], optional: true },
    final: { type: Number, optional: true, min: 0, max: 100, decimal: true },
    rank: { type: String, optional: true },

    title: { type: String },
    team: { type: String },
    start: { type: Date, optional: true },
    end: { type: Date, optional: true },
    content: { type: String, optional: true },
    innovation: { type: String, optional: true },
    result: { type: String, optional: true },
    arrangement: { type: String, optional: true },
    resource: { type: String, optional: true },
    other: { type: String, optional: true },
});

// Works.attachSchema(Works.schema);

export default Works;
