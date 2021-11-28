import * as util from "./util";
import {IDBPDatabase} from "idb";

export interface SessionCipher {
    encrypt: (message: ArrayBuffer) => Promise<{ type: number; body: string; }>;
    decryptPreKeyWhisperMessage: (body: string, type: "binary") => Promise<ArrayBuffer>;
    decryptWhisperMessage: (body: string, type: "binary") => Promise<ArrayBuffer>;
}

class SignalProtocolStore
{
    db;
    storeName;

    constructor(db: IDBPDatabase, storeName: string)
    {
        this.db = db;
        this.storeName = storeName;
    }

    async getIdentityKeyPair()
    {
        return (await this.get("identityKey")) as {pubKey: ArrayBuffer};
    }

    getLocalRegistrationId()
    {
        return Promise.resolve(this.get("registrationId"));
    }

    put(key: string | null | undefined, value: Record<string, unknown> | ArrayBuffer)
    {
        if (key === undefined || value === undefined || key === null || value === null)
            throw new Error("Tried to store undefined/null");

        const store = this.db.transaction(this.storeName, "readwrite").objectStore(this.storeName);
        store.put(value, key);
    }

    async get(key: string | null | undefined, defaultValue?: object)
    {
        if (key === null || key === undefined)
            throw new Error("Tried to get value for undefined/null key");

        const store = this.db.transaction(this.storeName, "readwrite").objectStore(this.storeName);
        return await store.get(key) || defaultValue;
    }

    remove(key: string | null | undefined)
    {
        if (key === null || key === undefined)
            throw new Error("Tried to remove value for undefined/null key");

        const store = this.db.transaction(this.storeName, "readwrite").objectStore(this.storeName);
        store.delete(key);
    }

    async isTrustedIdentity(identifier: string | null | undefined, identityKey?: ArrayBuffer)
    {
        if (!identifier)
            throw new Error("tried to check identity key for undefined/null key");

        if (!(identityKey instanceof ArrayBuffer))
            throw new Error("Expected identityKey to be an ArrayBuffer, got "+identityKey);

        const trusted = await this.get("identityKey" + identifier);
        if (trusted === undefined)
            return true;

        return util.toString(identityKey) === util.toString(trusted);
    }

    loadIdentityKey(identifier: string | null | undefined)
    {
        if (identifier === null || identifier === undefined)
            throw new Error("Tried to get identity key for undefined/null key");
        
        return Promise.resolve(this.get("identityKey" + identifier));
    }

    async saveIdentity(identifier: null | undefined, identityKey: ArrayBuffer)
    {
        if (identifier === null || identifier === undefined)
            throw new Error("Tried to put identity key for undefined/null key");

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const address = new libsignal.SignalProtocolAddress.fromString(identifier);

        const existing = await this.get("identityKey" + address.getName());
        this.put("identityKey" + address.getName(), identityKey);

        return existing && util.toString(identityKey) !== util.toString(existing);
    }

    /* Returns a keypair object or undefined */
    loadPreKey(keyId: string)
    {
        return Promise.resolve(this.get("25519KeypreKey" + keyId));
    }

    storePreKey(keyId: number, keyPair: Record<string, unknown>)
    {
        this.put("25519KeypreKey" + keyId, keyPair);
        return Promise.resolve();
    }

    removePreKey(keyId: string)
    {
        this.remove("25519KeypreKey" + keyId);
        return Promise.resolve();
    }

    /* Returns a signed keypair object or undefined */
    loadSignedPreKey(keyId: string)
    {
        const res = this.get("25519KeysignedKey" + keyId);
        return Promise.resolve(res);
    }

    storeSignedPreKey(keyId: number, keyPair: Record<string, unknown>)
    {
        this.put("25519KeysignedKey" + keyId, keyPair);
        return Promise.resolve();
    }

    removeSignedPreKey(keyId: string)
    {
        this.remove("25519KeysignedKey" + keyId);
        return Promise.resolve();
    }

    loadSession(identifier: string)
    {
        return Promise.resolve(this.get("session" + identifier));
    }

    storeSession(identifier: string, record: Record<string, unknown>)
    {
        this.put("session" + identifier, record);
        return Promise.resolve();
    }

    removeSession(identifier: string)
    {
        this.remove("session" + identifier);
        return Promise.resolve();
    }

    async removeAllSessions(identifier: string)
    {
        const store = this.db.transaction(this.storeName, "readwrite").objectStore(this.storeName);
        for(const key of await store.getAllKeys())
            if(String(key).startsWith(`session${identifier}`))
                store.delete(key);
    }
}

export default SignalProtocolStore;

