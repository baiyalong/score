
import Scores from './scores';


Meteor.methods({
    'score.set'(score) {
        Scores.upsert({ user: score.user, work: score.work }, { $set: score })
        Meteor.call('score.calculate', score.work)
    },
    'score.del'(score) {
        if (score.work) return Scores.remove({ work: score.work })
        if (score.user) {
            var works = Scores.find({ user: score.user }).fetch().map(e => e.work)
            Scores.remove({ user: score.user })
            Meteor.call('score.calculate', works)
        }
    },
    'score.delAll'() {
        Scores.remove({})
        Meteor.call('work.resetScores')
    },
    'score.calculate'(work) {
        if (!Array.isArray(work)) work = [work]
        work.map(e => {
            var scores = Scores.find({ work: e }).fetch().map(e => e.score).sort((a, b) => a - b)
            var final = scores.slice(1, -1).reduce((p, c, i, a) => p + c / a.length, 0).toFixed(2)
            Meteor.call('work.update', { _id: e, scores, final })
        })
        Meteor.call('work.rank')
    },
})