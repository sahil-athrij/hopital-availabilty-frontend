import {Connection} from "./connection";

export const NUM_PRE_KEYS = 10;
export const AES_KEY_LENGTH = 128;
export const AES_TAG_LENGTH = 128;
export const AES_EXTRACTABLE = true;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const libSignal = (window).libsignal;

export const KeyHelper = libSignal.KeyHelper;
export const SignalProtocolAddress = libSignal.SignalProtocolAddress;
export const SessionBuilder = libSignal.SessionBuilder;
export const SessionCipher = libSignal.SessionCipher;

export default class SignalConnection
{
    connection: Connection;
    to: string;
    messages: Array<string> = [];

    constructor(username: string, to: string)
    {
        this.to = to;
        this.connection = new Connection(username, this.handleMessage);
    }

    handleMessage = (message: string) =>
    {
        console.log(message, "Received message");
        this.messages.push(message);
    };

    getMessages()
    {
        return this.messages;
    }

    async sendMessage(message: string)
    {
        return this.connection.sendMessage(this.to, message);
    }
}
