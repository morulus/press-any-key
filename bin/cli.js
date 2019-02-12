#!/usr/bin/env node
const argv = process.argv.slice(2);
const opt = {
  preverseLog: argv.indexOf('--preserve-log') >= 0
};

// Get ctrl-C option
const cci = argv.indexOf('--ctrlc')
if (cci >= 0) {
  const ccv = parseInt(argv[cci + 1])
  if (isNaN(ccv)) {
    throw new TypeError("--ctrlc value should be a number")
  }
  opt.ctrlC = isNaN(ccv) ? 1 : ccv
}

const firstArg = argv[0]
const msg = firstArg && firstArg[0] !== '-' ? firstArg : undefined

require('../index.js')(msg, opt);
