
import Users from './users';


Meteor.methods({
    'user.connect'(user) {
        return Users.upsert({ fp: user.fp }, { $set: { fp: user.fp, conn: user.conn, online: true } })
        // return User.findOne({ fp: user.fp })
    },
    'user.disconnect'(user) {
        return Users.update({ conn: user.conn }, { $set: { conn: null, online: false } })
    },
    'user.resetJudge'() {
        return Users.update({ role: 'judge' }, { $set: { role: 'audience', scores: null } })
    },
    'user.randJudge'(count) {
        var judges = Users.find({ online: true, role: 'audience' }).fetch().sort(() => Math.random() > .5).slice(0, Math.max(0, count))
        return Users.update({ _id: { $in: judges.map(e => e._id) } }, { $set: { role: 'judge' } })
    },
    'user.changeRole'(user) {
        if (user.role == 'judge') return new Error('can not change to judge !')
        var u = Users.findOne({ _id: user._id })
        if (u.role == user.role) return new Error('role equal, no change !')
        Users.update({ _id: user._id }, { $set: { role: user.role, scores: null } })
        if (u.role == 'judge') Meteor.call('user.randJudge', 1)
    },
    'user.score'(score) {

    }
})