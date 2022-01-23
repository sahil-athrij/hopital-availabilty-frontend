import {Connection} from "./connection";
import {toast} from "react-toastify";

export const NUM_PRE_KEYS = 10;
export const AES_KEY_LENGTH = 128;
export const AES_TAG_LENGTH = 128;
export const AES_EXTRACTABLE = true;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const libSignal = libsignalc;

export const KeyHelper = libSignal.KeyHelper;
export const SignalProtocolAddress = libSignal.SignalProtocolAddress;
export const SessionBuilder = libSignal.SessionBuilder;
export const SessionCipher = libSignal.SessionCipher;

export interface ChatMessage {
    type: "sent" | "received",
    content: string,
    time: string,
    seen: boolean
}

export default class SignalConnection
{
    private readonly connection: Connection;
    private readonly messages: Record<string, Array<ChatMessage>>;

    constructor(username: string)
    {
        this.connection = new Connection(username, this.handleMessage);
        this.messages = {};
    }

    getTime = (date: Date) => date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });


    handleMessage(message: string, from: string)
    {
        if(!(from in this.messages))
            this.messages[from] = JSON.parse(localStorage.getItem(`messages-${from}`) || "[]");

        this.messages[from].push({content: message, time: this.getTime(new Date()), seen: false, type: "received"});
        localStorage.setItem(`messages-${from}`, JSON.stringify(this.messages));
    }

    async sendMessage(message: string, to: string)
    {
        if(!(to in this.messages))
            this.messages[to] = JSON.parse(localStorage.getItem(`messages-${to}`) || "[]");

        await this.connection.sendMessage(to, message)
            .then(() =>
            {
                const msg = <ChatMessage> {content: message, time: this.getTime(new Date()), seen: false, type: "sent"};

                this.messages[to].push(msg);
                localStorage.setItem(`messages-${to}`, JSON.stringify(this.messages));
            })
            .catch((error) => toast.error(error, { position: "bottom-center"}));
    }
}
