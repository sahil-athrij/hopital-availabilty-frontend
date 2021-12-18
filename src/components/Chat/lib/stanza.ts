import {ArrayBufferUtils} from "./arraybuffer";

interface Key
{
    rid?: string
    prekey?: boolean
    value: string
    deviceId?: string
    preKey?: string
    ciphertext?: { body: string }
}

interface Header
{
    sid: number,
    iv: string,
    keys: Array<Key>
}

interface EncryptedElementInterface
{
    header: Header
    payload: string
}

export class Stanza
{
    static buildEncryptedStanza(message: { iv: string; payload: string; keys: Array<Key> }, ownDeviceId: number)
    {
        const encryptedElement: EncryptedElementInterface = {
            header: {
                sid: ownDeviceId,
                keys: [],
                iv: ArrayBufferUtils.toBase64(message.iv)
            },
            payload: ArrayBufferUtils.toBase64(message.payload)
        };

        encryptedElement.header.keys = message.keys.map(function (key)
        {
            return {
                rid: key.deviceId,
                prekey: key.preKey ? true : undefined,
                value: btoa(<string>key.ciphertext?.body)
            };
        });

        return encryptedElement;
    }

    static parseEncryptedStanza(encryptedElement: { header: Header; payload: string; })
    {
        const headerElement = encryptedElement.header;
        const payloadElement = encryptedElement.payload;

        if (headerElement === undefined)
            return false;

        const sourceDeviceId = headerElement.sid;
        const iv = ArrayBufferUtils.fromBase64(headerElement.iv);
        const payload = ArrayBufferUtils.fromBase64(payloadElement);

        const keys = headerElement.keys.map((keyElement) => ({
            preKey: keyElement.prekey,
            ciphertext: atob(keyElement.value as string),
            deviceId: keyElement.rid
        }));

        return {
            sourceDeviceId: sourceDeviceId,
            keys: keys,
            iv: iv,
            payload: payload
        };
    }
}
