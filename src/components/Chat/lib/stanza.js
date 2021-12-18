import {ArrayBufferUtils} from "./arraybuffer";

export class Stanza
{
    static buildEncryptedStanza(message, ownDeviceId) 
    {
        const encryptedElement = {
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
                value: btoa(key.ciphertext.body)
            };
        });

        return encryptedElement;
    }

    static parseEncryptedStanza(encryptedElement) 
    {
        const headerElement = encryptedElement.header;
        const payloadElement = encryptedElement.payload;

        if (headerElement === undefined) 
        
            return false;
        

        const sourceDeviceId = headerElement.sid;
        const iv = ArrayBufferUtils.fromBase64(headerElement.iv);
        const payload = ArrayBufferUtils.fromBase64(payloadElement);

        const keys = headerElement.keys.map(function (keyElement) 
        {
            return {
                preKey: keyElement.prekey,
                ciphertext: atob(keyElement.value),
                deviceId: keyElement.rid
            };
        }); //@REVIEW maybe index would be better

        return {
            sourceDeviceId: sourceDeviceId,
            keys: keys,
            iv: iv,
            payload: payload
        };
    }
}
