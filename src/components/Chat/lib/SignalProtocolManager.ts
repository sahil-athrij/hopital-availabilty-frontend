import {toArrayBuffer, toString} from "./util";
import SignalProtocolStore from "./SignalProtocolStore";
import {openDB} from "idb";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const signal = libsignal || window.libsignal;

const server: Record<string, PreBundleKey> = {};

interface PreBundleKey
{
    identityKey: ArrayBuffer,
    registrationId: unknown,
    preKey: { keyId: number, publicKey: unknown },
    signedPreKey: { keyId: number, publicKey: unknown, signature: unknown }
}

/**
 * A signal protocol manager.
 */
class SignalProtocolManager
{
    userId;
    store?:SignalProtocolStore;
    sessionId;

    constructor(userId: string)
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
     * @param remoteUserId The recipient user ID.
     * @param message The message to send.
     */
    async encryptMessageAsync(remoteUserId: string, message: string)
    {
        if(!this.store)
            throw new Error("User not initialised");

        let sessionCipher = await this.store.loadSessionCipher(remoteUserId);
        
        if (sessionCipher === null)
        {
            const address = new signal.SignalProtocolAddress(remoteUserId, 123);
            const sessionBuilder = new signal.SessionBuilder(this.store, address);

            const remoteUserPreKey = await this._getKeyFromServer(remoteUserId);
            await sessionBuilder.processPreKey(remoteUserPreKey);

            sessionCipher = new signal.SessionCipher(this.store, address);
            this.store.storeSessionCipher(remoteUserId, sessionCipher);
        }

        return await sessionCipher.encrypt(toArrayBuffer(message));
    }

    /**
     * Decrypts a message from a given user.
     *
     * @param remoteUserId The user ID of the message sender.
     * @param cipherText The encrypted message bundle. (This includes the encrypted message itself and accompanying metadata)
     * @returns The decrypted message string.
     */
    async decryptMessageAsync(remoteUserId: string, cipherText: { type: number; body: string; })
    {
        if(!this.store)
            throw new Error("User not initialised");

        let sessionCipher = await this.store.loadSessionCipher(remoteUserId);

        if (sessionCipher === null)
        {
            const address = new signal.SignalProtocolAddress(remoteUserId, 123);
            sessionCipher = new signal.SessionCipher(this.store, address);
            this.store.storeSessionCipher(remoteUserId, sessionCipher);
        }

        const messageHasEmbeddedPreKeyBundle = cipherText.type === 3;

        if (messageHasEmbeddedPreKeyBundle)
            return toString(await sessionCipher.decryptPreKeyWhisperMessage(cipherText.body, "binary"));
        else
            return toString(await sessionCipher.decryptWhisperMessage(cipherText.body, "binary"));
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
        // const dump = dumpBinary(key as unknown as Record<string, unknown>);
        // console.log(dump);
        // console.log(loadBinary(dump));
        server[userId] = key; // TODO Actually implement
    }

    async _getKeyFromServer(userId: string)
    {
        return server[userId]; // TODO Actually implement
    }
}

export default SignalProtocolManager;
