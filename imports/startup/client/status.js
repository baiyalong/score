
import ifvisible from 'ifvisible';

export default function status() {

    // If page is visible right now
    if (ifvisible.now()) {
        // Display pop-up
        console.log(Date(), 'now')
    }

    ifvisible.on("blur", function () {
        // example code here..
        console.log(Date(), 'blur')
    });

    ifvisible.on("focus", function () {
        // resume all animations
        console.log(Date(), 'focus')
    });

    ifvisible.on("idle", function () {
        // Stop auto updating the live data
        console.log(Date(), 'idle')
    });

    ifvisible.on("wakeup", function () {
        // go back updating data
        console.log(Date(), 'wakeup')
    });

}