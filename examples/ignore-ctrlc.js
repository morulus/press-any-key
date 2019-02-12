const pressAnyKey = require('../index.js')

pressAnyKey("Press any key, including CTRL+C, to continue...", {
  ctrlC: false
})
  .then(() => {
    console.log('You pressed any key')
  })
  .catch(() => {
    console.log('This message will never been seen')
  })
