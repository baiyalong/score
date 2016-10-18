
import Users from './users';


Meteor.methods({
    'user.connect'(user) {
        this.userId ? null :
            Users.update(user, {
                $set: { conn: this.connection.id, online: true, focus: true, wakeup: true },
                $setOnInsert: { fp: user.fp, role: 'audience' }
            }, { upsert: true })
    },
    'user.disconnect'(user) {
        Users.update(user, { $set: { conn: null, online: false, focus: false, wakeup: false } })
    },
    'user.resetJudge'() {
        Meteor.call('score.delAll')
        Users.update({ role: 'judge' }, { $set: { role: 'audience' } }, { multi: true })
    },
    'user.randJudge'(count) {
        var judges = Users.find({ online: true, focus: true, role: 'audience' }).fetch().sort(() => Math.random() > .5).slice(0, Math.max(0, count) || 0)
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
    },
    'user.focus'(user) {
        Users.update(user, { $set: { focus: true } })
    },
    'user.blur'(user) {
        Users.update(user, { $set: { focus: false } })
    },
    'user.wakeup'(user) {
        Users.update(user, { $set: { wakeup: true } })
    },
    'user.idle'(user) {
        Users.update(user, { $set: { wakeup: false } })
    },
    'user.reset'() {
        Users.update({ online: true }, { $set: { conn: null, online: false, focus: false, wakeup: false } }, { multi: true })
    }
})