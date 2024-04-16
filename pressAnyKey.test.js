const pressAnyKey = require('./index.js');
const sinon = require('sinon');
const stripAnsi = require('strip-ansi');  // Import strip-ansi
require('jest-sinon');

describe('pressAnyKey function', () => {
    let stdinResumeStub, stdinSetRawModeStub, stdinOnceStub, stdoutWriteStub, exitStub;

    beforeEach(() => {
        stdinResumeStub = sinon.stub(process.stdin, 'resume');
        stdinSetRawModeStub = sinon.stub(process.stdin, 'setRawMode');
        stdinOnceStub = sinon.stub(process.stdin, 'once');
        stdoutWriteStub = sinon.stub(process.stdout, 'write');
        exitStub = sinon.stub(process, 'exit');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should display default message and resolve on key press', async () => {
        stdinOnceStub.callsFake((event, handler) => handler(Buffer.from([0])));
        await pressAnyKey();
        const output = stripAnsi(stdoutWriteStub.args.map(arg => arg[0]).join(''));
        expect(output).toContain('Press any key to continue...');
        expect(stdinResumeStub.calledOnce).toBe(true);
    });

    it('should display custom message and resolve on key press', async () => {
        const customMessage = "Press ENTER to exit...";
        stdinOnceStub.callsFake((event, handler) => handler(Buffer.from([0])));
        await pressAnyKey(customMessage);
        const output = stripAnsi(stdoutWriteStub.args.map(arg => arg[0]).join(''));
        expect(output).toContain(customMessage);
    });

    it('should display no message and resolve on key press', async () => {
        const customMessage = "Press ENTER to exit...";
        stdinOnceStub.callsFake((event, handler) => handler(Buffer.from([0])));
        await pressAnyKey(customMessage, {
            hideMessage: true
        });
        const output = stripAnsi(stdoutWriteStub.args.map(arg => arg[0]).join(''));
        expect(output).toBe("");
    });

    it('should handle CTRL+C based on options', async () => {
        let errorCaught = null;
        stdinOnceStub.callsFake((event, handler) => handler(Buffer.from([3])));
        try {
            await pressAnyKey(null, { ctrlC: 'reject' });
        } catch (error) {
            errorCaught = error;
        }
        expect(errorCaught).toBeDefined();
        expect(errorCaught.message).toBe("User pressed CTRL+C");
    });

    it('should exit with specified code when ctrlC is a number', async () => {
        stdinOnceStub.callsFake((event, handler) => handler(Buffer.from([3])));
        await pressAnyKey(null, { ctrlC: 99 });
        expect(exitStub.calledWith(99)).toBe(true);
    });

    it('should not exit or reject when ctrlC is false', async () => {
        stdinOnceStub.callsFake((event, handler) => handler(Buffer.from([0])));
        await pressAnyKey(null, { ctrlC: false });
        expect(exitStub.called).toBe(false);
    });
});