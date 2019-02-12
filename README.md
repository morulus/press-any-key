press-any-key
==

An utility to launch the simplest confirmation dialog.

```
npx -q press-any-key
Press any key to continue...
```

If user presses any key it will exit with code 0. In the case of pressing CTRL+C it will exit with code 1.

## Install

If you wish to use the utility from a npm scripts, you can install it into your project as a usual npm dependency.

```shell
npm install press-any-key --save-dev
```

But you can also use [npx](https://www.npmjs.com/package/npx) to invoke the command without install.

```
npx -q press-any-key
```

## Arguments

```
press-any-key <message> [...options]
```

By the default, the message is `"Press any key to continue..."`, but if you would like you can specify your own message as the first argument.

```shell
press-any-key "Press any key to run the application"
```

**Options:**

`--ctrlc <code>` Exit code on pressing CTRL-C.
`--preserve-log` Do not clean the message, after resolve

## How to route

You can use standard bash logical operators `&&` and `||` to perform branching.

```shell
npx -q press-any-key && echo "A good choice!" || echo "Bye bye :("
```

Or you can rely on the fact that CTRL + C, by default, exits the process.

For example, you have a script that performs irreversible actions, and to avoid accidental execution of the script, you can add additional confirmation.

```bash
echo 'You are about to delete all files in current directory'
npx -q press-any-key
rm -rf *
```

```shell
You are about to delete all files in the current directory
Press any key to continue...
```

## Programmatic usage

You can use the package _press-any-key_ API in your node.js script.

```js
const pressAnyKey = require('press-any-key');

pressAnyKey()
  .then(() => {
    // ... User presses a key
  })
```

### API

```
pressAnyKey(message, options)
```

The message is a string that will be displayed in standard output, before it starts to listen for key pressing. Pass `null` if you'd like to use default message.

**Options:**

  - **`ctrlC`** The exit code, or `"reject"` (do reject the promise), or false to perceive as pressing any key.
  - **`preverseLog`** Preserve the message in the log

By the default when user presses CTRL+C the function will exit the process. But you able to change the standart behavior of CTRL+C by passing option `ctrlC` with the value `"reject"`. In this case, pressing CTRL+C wont exit the process, but do reject the promise.

```js
const pressAnyKey = require('press-any-key');

pressAnyKey("Press any key to resolve, or CTRL+C to reject", {
  ctrlC: "reject"
})
  .then(() => {
    console.log('You pressed any key')
  })
  .catch(() => {
    console.log('You pressed CTRL+C')
  })
```

Author
--

Vladimir Kalmykov <vladimirmorulus@gmail.com>

License
--

MIT
