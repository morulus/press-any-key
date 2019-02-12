const pressAnyKey = require('../index.js')

pressAnyKey("Press any key to resolve, or CTRL+C to reject", {
  ctrlC: "reject"
})
  .then(() => {
    console.log('You pressed any key')
  })
  .catch(() => {
    console.log('You pressed CTRL+C')
  })
