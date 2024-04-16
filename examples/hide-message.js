const pressAnyKey = require('../index.js')

pressAnyKey("This message will never seen", {
    ctrlC: false,
    hideMessage: true
})
    .then(() => {
        console.log('You pressed any key')
    })
    .catch(() => {
        console.log('This message will never been seen')
    })
