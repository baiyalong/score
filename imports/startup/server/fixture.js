
Meteor.startup(() => {
    Meteor.call('user.reset')
    if (Meteor.users.find().count() == 0)
        Accounts.createUser({ username: 'admin', password: 'qwe' })
})


