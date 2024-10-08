const sll = require("log-update");
const DEFAULT_MESSAGE = "Press any key to continue..."

module.exports = function pressAnyKey(mssg, options = {}) {
  mssg = mssg || DEFAULT_MESSAGE;
  const ctrlC = typeof options.ctrlC === "undefined"
    ? 1
    : options.ctrlC;
  const preserveLog = options.preserveLog || false;
  const hideMessage = options.hideMessage || false;

  if (mssg && !hideMessage) {
    sll(mssg);
  }

  return new Promise((resolve, reject) => {
    const handler = buffer => {
      process.stdin.removeListener("data", handler);
      process.stdin.setRawMode(false);
      process.stdin.pause();

      if (mssg && !preserveLog) {
        sll.clear();
      } else {
        sll.done();
        process.stdout.write("\n")
      }

      const bytes = Array.from(buffer);

      if (bytes.length && bytes[0] === 3) {
        if (ctrlC === "reject") {
          reject(new Error("User pressed CTRL+C"));
        } else if (ctrlC === false) {
          // Do nothing
        } else if (typeof ctrlC === "number") {
          process.exit(ctrlC);
        } else {
          throw new TypeError('Invalid ctrlC option');
        }
      }
      process.nextTick(resolve);
    };

    process.stdin.resume();
    process.stdin.setRawMode(true);
    process.stdin.once("data", handler);
  });
};
