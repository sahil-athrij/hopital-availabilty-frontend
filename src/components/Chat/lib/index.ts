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

export interface ChatMessage {
    type: "sent" | "received",
    content: string,
    time: Date,
    seen: boolean
}

export default class SignalConnection
{
    private readonly connection: Connection;
    private readonly to: string;
    private readonly onMessage: (msg: ChatMessage) => void;

    constructor(username: string, to: string, onMessage: (msg: ChatMessage) => void)
    {
        this.to = to;
        this.onMessage = onMessage;
        this.connection = new Connection(username, this.handleMessage);
    }

    handleMessage = (message: string) =>
    {
        console.debug(message, "Received message");
        this.onMessage({content: message, time: new Date(), seen: false, type: "received"});
    };

    async sendMessage(message: string)
    {
        return this.connection.sendMessage(this.to, message);
    }
}
