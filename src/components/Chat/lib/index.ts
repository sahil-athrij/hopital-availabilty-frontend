import {Connection} from "./connection";
import localForage from "localforage";

export const NUM_PRE_KEYS = 10;
export const AES_KEY_LENGTH = 128;
export const AES_TAG_LENGTH = 128;
export const AES_EXTRACTABLE = true;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const libSignal = window.libsignal;

export const KeyHelper = libSignal.KeyHelper;
export const SignalProtocolAddress = libSignal.SignalProtocolAddress;
export const SessionBuilder = libSignal.SessionBuilder;
export const SessionCipher = libSignal.SessionCipher;

export interface ChatMessage
{
    type: "sent" | "received",
    content: string,
    time: string,
    seen: boolean
}

export default class SignalConnection
{
    private readonly connection;
    private messages?: Array<ChatMessage>;
    private readonly onMessage;
    private readonly to;

    constructor(username: string, to: string, onMessage: (messages: ChatMessage[]) => void)
    {
        this.connection = new Connection(username, to, this.handleMessage);
        this.onMessage = onMessage;
        this.to = to;
    }

    getTime = (date: Date) => date.toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric", hour12: true});

    handleMessage = async (message: string, from: string) =>
    {
        console.log(message, "Handle Message");

        if (!this.messages)
            this.messages = await localForage.getItem(`messages-${from}`) || [];

        this.messages.push({content: message, time: this.getTime(new Date()), seen: false, type: "received"});
        await localForage.setItem(`messages-${from}`, this.messages);
        this.onMessage(this.messages);
    };

    async sendMessage(message: string)
    {
        if (!this.messages)
            this.messages = await localForage.getItem(`messages-${(this.to)}`) || [];

        await this.connection.sendMessage(message)
            .then(() =>
            {
                const msg = <ChatMessage>{content: message, time: this.getTime(new Date()), seen: false, type: "sent"};

                this.messages?.push(msg);
                this.onMessage(this.messages || []);

                return localForage.setItem(`messages-${this.to}`, this.messages);
            })
            .catch((e) => console.error(e));
    }

    tareDown()
    {
        this.connection.disconnect();
    }
}
