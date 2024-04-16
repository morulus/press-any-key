declare module "press-any-key" {

    interface IOptions {
        /**
         * The exit code, or "reject" (do reject the promise), or false to perceive as pressing any key.
         */
        ctrlC?: "reject" | false | number,
        /**
         * Preserve the message in the log
         */
        preverseLog?: boolean,
        /**
         * Hide the message
         */
        hideMessage?: boolean,
    }
    /**

     @param message The message is a string that will be displayed in standard output, before it starts to listen for key pressing. Pass null if you'd like to use default message.
     @param options
     @example
     ```
     pressAnyKey()
     .then(() => {
     // ... User presses a key
     })
     ```
     */
    function pressAnyKey(message?: string, options?: IOptions): Promise<any>
    export = pressAnyKey;
}