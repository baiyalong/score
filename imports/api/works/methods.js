
import Works from './works';
import '../../api/scores/methods';


Meteor.methods({
    'work.insert'(work) {
        var last = Works.findOne({}, { sort: { sn: -1 } })
        var sn = last ? last.sn + 1 : 1;
        Works.insert(Object.assign(work, { sn }))
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
    },
    'work.ascend'(work) {
        var pre = Works.findOne({ sn: { $lt: work.sn } }, { sort: { sn: -1 } })
        if (pre) {
            Works.update({ _id: work._id }, { $set: { sn: pre.sn } })
            Works.update({ _id: pre._id }, { $set: { sn: work.sn } })
        }
    },
    'work.descend'(work) {
        var next = Works.findOne({ sn: { $gt: work.sn } }, { sort: { sn: 1 } })
        if (next) {
            Works.update({ _id: work._id }, { $set: { sn: next.sn } })
            Works.update({ _id: next._id }, { $set: { sn: work.sn } })
        }
    },
})