import * as util from "./util";
import {IDBPObjectStore} from "idb";

interface SessionCipher {
    encrypt: (message: ArrayBuffer) => Promise<{ type: number; body: string; }>;
    decryptPreKeyWhisperMessage: (body: string, type: "binary") => Promise<ArrayBuffer>;
    decryptWhisperMessage: (body: string, type: "binary") => Promise<ArrayBuffer>;
}

class SignalProtocolStore
{
    Direction = {
        SENDING: 1,
        RECEIVING: 2,
    };

    store;

    constructor(store:  IDBPObjectStore<unknown, ArrayLike<string>, string, "versionchange">)
    {
        this.store = store;
    }

    getIdentityKeyPair()
    {
        return Promise.resolve(this.get("identityKey") as {pubKey: ArrayBuffer});
    }

    getLocalRegistrationId()
    {
        return Promise.resolve(this.get("registrationId"));
    }

    put(key: string | null | undefined, value: Record<string, unknown> | ArrayBuffer)
    {
        if (key === undefined || value === undefined || key === null || value === null)
            throw new Error("Tried to store undefined/null");

        this.store.put(value, key);
    }

    async get(key: string | null | undefined, defaultValue?: object)
    {
        if (key === null || key === undefined)
            throw new Error("Tried to get value for undefined/null key");

        return await this.store.get(key) || defaultValue;
    }

    remove(key: string | null | undefined)
    {
        if (key === null || key === undefined)
        
            throw new Error("Tried to remove value for undefined/null key");
        
        localStorage.removeItem(`${this.sessionId}-${key}`);
    }

    isTrustedIdentity(identifier: string | null | undefined, identityKey?: ArrayBuffer)
    {
        if (!identifier)
            throw new Error("tried to check identity key for undefined/null key");
        

        if (!(identityKey instanceof ArrayBuffer))
            throw new Error("Expected identityKey to be an ArrayBuffer, got "+identityKey);
        

        const trusted = this.get("identityKey" + identifier);
        if (trusted === undefined)
        
            return Promise.resolve(true);
        

        return Promise.resolve(util.toString(identityKey) === util.toString(trusted));
    }

    loadIdentityKey(identifier: string | null | undefined)
    {
        if (identifier === null || identifier === undefined)
            throw new Error("Tried to get identity key for undefined/null key");
        
        return Promise.resolve(this.get("identityKey" + identifier));
    }

    saveIdentity(identifier: null | undefined, identityKey: ArrayBuffer)
    {
        if (identifier === null || identifier === undefined)
            throw new Error("Tried to put identity key for undefined/null key");


        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const address = new libsignal.SignalProtocolAddress.fromString(identifier);

        const existing = this.get("identityKey" + address.getName());
        this.put("identityKey" + address.getName(), identityKey);

        if (existing && util.toString(identityKey) !== util.toString(existing))
        
            return Promise.resolve(true);
        
        else
        
            return Promise.resolve(false);
        
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

    removeAllSessions(identifier: string)
    {
        for(let i=0; i<localStorage.length; i++)
            if(localStorage.ke(i).startsWith(`${this.sessionId}-session${identifier}`))
                localStorage.removeItem(localStorage.key(i) || "");

        return Promise.resolve();
    }

    /* Stores and loads a session cipher */
    storeSessionCipher(identifier: string, cipher: SessionCipher)
    {
        this.put("cipher" + identifier, cipher as unknown as Record<string, unknown>);
    }

    loadSessionCipher(identifier: string)
    {
        return this.get("cipher" + identifier) as SessionCipher || null;
    }
}

export default SignalProtocolStore;

