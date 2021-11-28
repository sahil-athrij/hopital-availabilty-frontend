import {arrayBufferToBase64, base64ToArrayBuffer, toArrayBuffer, toString} from "./util";
import SignalProtocolStore, {SessionCipher} from "./SignalProtocolStore";
import {openDB} from "idb";
import {KeyExchange, KeyExchangeObject} from "../../../api/model";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const signal = libsignal || window.libsignal;

interface PreBundleKey
{
    identityKey: ArrayBuffer,
    registrationId: number,
    preKey: { keyId: number, publicKey: ArrayBuffer },
    signedPreKey: { keyId: number, publicKey: ArrayBuffer, signature: ArrayBuffer }
}

interface PreBundleKeySerialised
{
    identityKey: string,
    registrationId: number,
    preKey: { keyId: number, publicKey: string },
    signedPreKey: { keyId: number, publicKey: string, signature: string }
}

/**
 * A signal protocol manager.
 */
class SignalProtocolManager
{
    userId;
    store?:SignalProtocolStore;
    sessionId;
    remoteUserId;
    sessionCiphers: {user?: SessionCipher, remote?: SessionCipher} = {};

    constructor(userId: string, remoteUserId: string)
    {
        const previousSession = localStorage.getItem(`sessionId-${userId}`);
        let sessionId;

        if(previousSession)
            sessionId = Number(previousSession);
        else
        {
            sessionId = Number(localStorage.getItem("sessionIdIndex") || 0) + 1;
            localStorage.setItem("sessionIdIndex", sessionId.toString());
            localStorage.setItem(`sessionId-${userId}`, sessionId.toString());
        }

        this.userId = userId;
        this.sessionId = sessionId;
        this.remoteUserId = remoteUserId;
    }

    /**
     * Initialize the manager when the user logs on.
     */
    async initializeAsync()
    {
        const storeName = this.sessionId.toString();
        const db = await openDB("chat", this.sessionId, {
            upgrade: (database) => database.createObjectStore(storeName)
        });

        this.store = new SignalProtocolStore(db, storeName);

        if(await this.store.get("identityKey"))
            return;

        await this._generateIdentityAsync();
        const preKeyBundle = await this._generatePreKeyBundleAsync(this.sessionId, 123);
        await this._sendKeyToServer(this.userId, preKeyBundle);
    }

    /**
     * Encrypt a message for a given user.
     *
     * @param message The message to send.
     */
    async encryptMessageAsync(message: string)
    {
        if(!this.store)
            throw new Error("User not initialised");
        
        if (!this.sessionCiphers.user)
        {
            const address = new signal.SignalProtocolAddress(this.remoteUserId, 123);
            const sessionBuilder = new signal.SessionBuilder(this.store, address);

            const remoteUserPreKey = await this._getKeyFromServer(this.remoteUserId);
            await sessionBuilder.processPreKey(remoteUserPreKey);

            this.sessionCiphers.user = new signal.SessionCipher(this.store, address);
        }

        if(!this.sessionCiphers.user)
            throw new Error("Failed to create session cipher");

        return await this.sessionCiphers.user.encrypt(toArrayBuffer(message));
    }

    /**
     * Decrypts a message from a given user.
     *
     * @param cipherText The encrypted message bundle. (This includes the encrypted message itself and accompanying metadata)
     * @returns The decrypted message string.
     */
    async decryptMessageAsync(cipherText: { type: number; body: string; })
    {
        if(!this.store)
            throw new Error("User not initialised");

        if (!this.sessionCiphers.remote)
        {
            const address = new signal.SignalProtocolAddress(this.remoteUserId, 123);
            this.sessionCiphers.remote = new signal.SessionCipher(this.store, address);
        }

        const messageHasEmbeddedPreKeyBundle = cipherText.type === 3;

        if(!this.sessionCiphers.remote)
            throw new Error("Failed to initialise session cipher");

        if (messageHasEmbeddedPreKeyBundle)
            return toString(await  this.sessionCiphers.remote.decryptPreKeyWhisperMessage(cipherText.body, "binary"));
        else
            return toString(await  this.sessionCiphers.remote.decryptWhisperMessage(cipherText.body, "binary"));
    }

    /**
     * Generates a new identity for the local user.
     */
    async _generateIdentityAsync()
    {
        if(!this.store)
            throw new Error("User not initialised");

        const results = await Promise.all([
            signal.KeyHelper.generateIdentityKeyPair(),
            signal.KeyHelper.generateRegistrationId(),
        ]);

        this.store.put("identityKey", results[0]);
        this.store.put("registrationId", results[1]);
    }

    /**
     * Generates a new pre-key bundle for the local user.
     *
     * @param preKeyId An ID for the pre-key.
     * @param signedPreKeyId An ID for the signed pre-key.
     * @returns A pre-key bundle.
     */
    async _generatePreKeyBundleAsync(preKeyId: number, signedPreKeyId: number)
    {
        if(!this.store)
            throw new Error("User not initialised");

        const result = await Promise.all([
            this.store.getIdentityKeyPair(),
            this.store.getLocalRegistrationId()
        ]);

        const identity = result[0];
        const registrationId = result[1];

        const keys = await Promise.all([
            signal.KeyHelper.generatePreKey(preKeyId),
            signal.KeyHelper.generateSignedPreKey(identity, signedPreKeyId),
        ]);

        const preKey = keys[0];
        const signedPreKey = keys[1];

        await this.store.storePreKey(preKeyId, preKey.keyPair);
        await this.store.storeSignedPreKey(signedPreKeyId, signedPreKey.keyPair);

        return {
            identityKey: identity.pubKey,
            registrationId: registrationId,
            preKey: {
                keyId: preKeyId,
                publicKey: preKey.keyPair.pubKey
            },
            signedPreKey: {
                keyId: signedPreKeyId,
                publicKey: signedPreKey.keyPair.pubKey,
                signature: signedPreKey.signature
            }
        };
    }

    async _sendKeyToServer(userId: string, key: PreBundleKey)
    {
        const toSend: PreBundleKeySerialised = key as unknown as PreBundleKeySerialised;
        toSend.identityKey = arrayBufferToBase64(key.identityKey);
        toSend.preKey.publicKey = arrayBufferToBase64(key.preKey.publicKey);
        toSend.signedPreKey.signature = arrayBufferToBase64(key.signedPreKey.signature);
        toSend.signedPreKey.publicKey = arrayBufferToBase64(key.signedPreKey.publicKey);

        await KeyExchange.create({sender_key_bundle: toSend, receiver_token:toSend});
    }

    async _getKeyFromServer(userId: string)
    {
        const key = (await KeyExchange.filter({receiver_token: userId}, true)).results[0].data as KeyExchangeObject;
        const data = (key.sender_token === userId ? key.sender_key_bundle : key.receiver_key_bundle) as PreBundleKey;

        data.identityKey = base64ToArrayBuffer(data.identityKey);
        data.preKey.publicKey = base64ToArrayBuffer(data.preKey.publicKey);
        data.signedPreKey.signature = base64ToArrayBuffer(data.signedPreKey.signature);
        data.signedPreKey.publicKey = base64ToArrayBuffer(data.signedPreKey.publicKey);

        return data;
    }
}

export default SignalProtocolManager;
