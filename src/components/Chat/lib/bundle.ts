import {ArrayBufferUtils} from "./arraybuffer";
import {Random} from "./random";

export class Bundle
{
    constructor(bundle) 
    {
        this.bundle = bundle;
    }

    getIdentityKey() 
    {
        return this.bundle.identityKey;
    }

    getSignedPreKey() 
    {
        return this.bundle.signedPreKey;
    }

    getRandomPreKey() 
    {
        const numberOfPreKeys = this.bundle.preKeys.length;
        const candidateNumber = Random.number(numberOfPreKeys - 1);

        return this.bundle.preKeys[candidateNumber];
    }

    toSignalBundle(registrationId) 
    {
        const preKey = this.getRandomPreKey();
        const signedPreKey = this.getSignedPreKey();

        return {
            identityKey: this.getIdentityKey().pubKey,
            registrationId: registrationId,
            preKey: {
                keyId: preKey.keyId,
                publicKey: preKey.keyPair.pubKey
            },
            signedPreKey: {
                keyId: signedPreKey.keyId,
                publicKey: signedPreKey.keyPair.pubKey,
                signature: signedPreKey.signature
            }
        };
    }

    toObject() 
    {
        return {
            signedPreKeyPublic: {
                signedPreKeyId: this.bundle.signedPreKey.keyId,
                value: ArrayBufferUtils.toBase64(this.bundle.signedPreKey.keyPair.pubKey)
            },
            signedPreKeySignature: ArrayBufferUtils.toBase64(this.bundle.signedPreKey.signature),
            identityKey: ArrayBufferUtils.toBase64(this.bundle.identityKey.pubKey),
            preKeyPublic: this.bundle.preKeys.map(function (preKey)
            {
                return {
                    preKeyId: preKey.keyId,
                    value: ArrayBufferUtils.toBase64(preKey.keyPair.pubKey)
                };
            })
        };
    }

    static fromJSON(json) 
    {
        const xmlIdentityKey = json["identityKey"];
        const xmlSignedPreKeyPublic = json["signedPreKeyPublic"];
        const xmlSignedPreKeySignature = json["signedPreKeySignature"];
        const xmlPreKeys = json["preKeyPublic"];

        return new Bundle({
            identityKey: {
                pubKey: ArrayBufferUtils.fromBase64(xmlIdentityKey)
            },
            signedPreKey: {
                keyPair: {
                    pubKey: ArrayBufferUtils.fromBase64(xmlSignedPreKeyPublic.value)
                },
                signature: ArrayBufferUtils.fromBase64(xmlSignedPreKeySignature),
                keyId: xmlSignedPreKeyPublic.signedPreKeyId
            },
            preKeys: xmlPreKeys.map(function (element)
            {
                return {
                    keyPair: {
                        pubKey: ArrayBufferUtils.fromBase64(element.value)
                    },
                    keyId: element.preKeyId
                };
            }),
        });
    }
}
