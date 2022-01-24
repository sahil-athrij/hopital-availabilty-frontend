import {Connection} from "./connection";
import {toast} from "react-toastify";
import localForage from "localforage";

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


    async handleMessage(message: string, from: string) 
    {
        if (!(from in this.messages))
            this.messages[from] = await localForage.getItem(`messages-${from}`) || [];

        this.messages[from].push({content: message, time: this.getTime(new Date()), seen: false, type: "received"});
        await localForage.setItem(`messages-${from}`, this.messages);
    }

    async sendMessage(message: string, to: string)
    {
        if(!(to in this.messages))
            this.messages[to] = await localForage.getItem(`messages-${to}`) || [];

        await this.connection.sendMessage(to, message)
            .then(() =>
            {
                const msg = <ChatMessage> {content: message, time: this.getTime(new Date()), seen: false, type: "sent"};

                this.messages[to].push(msg);
                return localForage.setItem(`messages-${to}`, this.messages);
            })
            .catch((error) => toast.error(error, { position: "bottom-center"}));
    }
}
