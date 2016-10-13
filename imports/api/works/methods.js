
import Works from './works';
import '../../api/scores/methods';


Meteor.methods({
    'work.insert'(work) {
        Works.insert(Object.assign(work, { sn: Works.find().count() + 1 }))
    },
    'work.update'(work) {
        Works.update({ _id: work._id }, { $set: work })
    },
    'work.remove'(work) {
        Works.remove({ _id: work._id })
        Meteor.call('score.del', { work: work._id })
        Meteor.call('work.rank')
    },
    'work.rank'() {
        var works = Works.find().fetch();
        works.filter(e => e.scores).sort((a, b) => b.final - a.final).map((e, i, a) => Meteor.call('work.update', { _id: e._id, rank: i + 1 + '/' + works.length }))
    },
    'work.resetScores'() {
        Works.update({}, { $set: { scores: null, final: null, rank: null } })
    }
})