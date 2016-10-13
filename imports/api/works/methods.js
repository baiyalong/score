
import Works from './works';


Meteor.methods({
    'work.insert'(work) {
        Works.insert(Object.assign(work, { sn: Works.find().count() + 1 }))
    },
    'work.update'(work) {
        Works.update({ _id: work._id }, { $set: work })
    },
    'work.delete'(work) {
        Works.remove({ _id: work._id })
        Meteor.call('score.del', { work: work._id })
        Meteor.call('work.rank')
    },
    'work.rank'() {
        Works.find({}).fetch().sort((a, b) => b.final - a.final).map((e, i, a) => Meteor.call('work.update', { _id: e._id, rank: i + 1 + '/' + a.length }))
    },
    'work.resetScores'() {
        Works.update({}, { $set: { scores: null, final: null, rank: null } })
    }
})