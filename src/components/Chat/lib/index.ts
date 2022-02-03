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
    content?: string,
    time: string,
    seen: boolean
    mime?: string
    attachment?: string
}

export default class SignalConnection
{
    private readonly connection;
    private messages?: Array<ChatMessage>;
    private readonly onMessage;
    private readonly to;
    private readonly username;

    constructor(username: string, to: string, onMessage: (messages: ChatMessage[]) => void)
    {
        this.connection = new Connection(username, to, this.handleMessage);
        this.onMessage = onMessage;
        this.to = to;
        this.username = username;
    }

    getTime = (date: Date) => date.toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric", hour12: true});



    handleMessage = async (message: string, from: string, mime: string) =>
    {
        console.log(message, "Handle Message");

        if (!this.messages)
            this.messages = await localForage.getItem(`messages-${from}`) || [];

        const type = from === this.username ? "sent" : "received";

        const msg = {time: this.getTime(new Date()), seen: false, type};

        if(!mime)
            this.messages.push({...msg, content: message} as ChatMessage);
        else
            this.messages.push({...msg, attachment: message, mime} as ChatMessage);

        await localForage.setItem(`messages-${from}`, this.messages);
        this.onMessage(this.messages);
    };

    async sendMessage(message: string, mime?: string)
    {
        if (!this.messages)
            this.messages = await localForage.getItem(`messages-${(this.to)}`) || [];

        await this.connection.sendMessage(message, mime)
            .then(() =>
            {
                const msg = {time: this.getTime(new Date()), seen: false, type: "sent"};

                if(!mime)
                    this.messages?.push({...msg, content: message} as ChatMessage);
                else
                    this.messages?.push({...msg, attachment: message, mime} as ChatMessage);

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
