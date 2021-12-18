import {Connection} from "./connection";

export const NUM_PRE_KEYS = 10;
export const NS_BASE = "eu.siacs.conversations.axolotl";
export const NS_DEVICELIST = NS_BASE + ".devicelist";
export const NS_BUNDLES = NS_BASE + ".bundles:";
export const AES_KEY_LENGTH = 128;
export const AES_TAG_LENGTH = 128;
export const AES_EXTRACTABLE = true;

localStorage.clear();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const libSignal = (window).libsignal;

export const KeyHelper = libSignal.KeyHelper;
export const SignalProtocolAddress = libSignal.SignalProtocolAddress;
export const SessionBuilder = libSignal.SessionBuilder;
export const SessionCipher = libSignal.SessionCipher;
export const FingerprintGenerator = libSignal.FingerprintGenerator;

let connection: Connection | undefined;

export function sendMessage(to: string, message: string)
{
    if (connection === undefined)
        throw Error("Call register before sending message");

    return connection.sendMessage(to, message);
}

export function register(username: string, onMessage: (message: string) => void)
{
    if (connection !== undefined)
        return;

    connection = new Connection(username, onMessage);
}
