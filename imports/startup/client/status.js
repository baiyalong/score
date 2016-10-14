
import ifvisible from 'ifvisible';

export default function status() {
    ifvisible.focus(() => Meteor.call('user.focus'));
    ifvisible.blur(() => Meteor.call('user.blur'));
    ifvisible.wakeup(() => Meteor.call('user.wakeup'));
    ifvisible.idle(() => Meteor.call('user.idle'));
}