
import Users from './users';


Meteor.methods({
    'user.connect'(user) {
        var u = Users.findOne({ fp: user.fp })
        if (u) {
            Users.update({ _id: u._id }, { $set: Object.assign(u, { conn: this.connection.id, online: true, role: u.role || 'audience' }) })
            if (u.scores) u.scores = Meteor.call('score.get', u.scores)
        } else {
            u = { fp: user.fp, conn: this.connection.id, online: true, role: 'audience' }
            Object.assign(u, { _id: Users.insert(u) })
        }
        return u;
    },
    'user.disconnect'(user) {
        Users.update({ conn: user.conn }, { $set: { conn: null, online: false } })
    },
    'user.resetJudge'() {
        Meteor.call('score.delAll')
        Users.update({ role: 'judge' }, { $set: { role: 'audience', scores: null } })
    },
    'user.randJudge'(count) {
        var judges = Users.find({ online: true, role: 'audience' }).fetch().sort(() => Math.random() > .5).slice(0, Math.max(0, count))
        Users.update({ _id: { $in: judges.map(e => e._id) } }, { $set: { role: 'judge' } })
    },
    'user.changeRole'(user) {
        if (user.role == 'judge') return new Meteor.Error('can not change to judge !')
        var u = Users.findOne({ _id: user._id })
        if (u.role == user.role) return new Meteor.Error('role equal, no change !')
        Users.update({ _id: user._id }, { $set: { role: user.role, scores: null } })
        if (u.role == 'judge') Meteor.call('score.del', { user: u._id }) && Meteor.call('user.randJudge', 1)
    },
    'user.score'(score) {
        var id = Meteor.call('score.set', score)
        //-------------
        console.log('user.score id ', id)
        User.update({ _id: score.user }, { $addToSet: { scores: id } })
    },
    'user.remove'(user) {
        Users.remove({ _id: user._id })
        if (user.role == 'judge') Meteor.call('score.del', { user: user._id }) && Meteor.call('user.randJudge', 1)
    }
})