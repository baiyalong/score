
import Users from './users';


Meteor.methods({
    'user.connect'(user) {
        Users.update({ fp: user.fp }, {
            $set: { conn: this.connection.id, online: true },
            $setOnInsert: { fp: user.fp, role: 'audience' }
        }, { upsert: true })
    },
    'user.disconnect'(user) {
        Users.update({ conn: user.conn }, { $set: { conn: null, online: false } })
    },
    'user.resetJudge'() {
        Meteor.call('score.delAll')
        Users.update({ role: 'judge' }, { $set: { role: 'audience' } })
    },
    'user.randJudge'(count) {
        var judges = Users.find({ online: true, role: 'audience' }).fetch().sort(() => Math.random() > .5).slice(0, Math.max(0, count) || 0)
        Users.update({ _id: { $in: judges.map(e => e._id) } }, { $set: { role: 'judge' } })
    },
    'user.changeRole'(user) {
        if (user.role == 'judge') return new Meteor.Error('can not change to judge !')
        var u = Users.findOne({ _id: user._id })
        if (u.role == user.role) return new Meteor.Error('role equal, no change !')
        Users.update({ _id: user._id }, { $set: { role: user.role, scores: null } })
        if (u.role == 'judge') Meteor.call('score.del', { user: u._id }) && Meteor.call('user.randJudge', 1)
    },
    'user.remove'(user) {
        Users.remove({ _id: user._id })
        if (user.role == 'judge') Meteor.call('score.del', { user: user._id }) && Meteor.call('user.randJudge', 1)
    }
})