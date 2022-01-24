import {ArrayBufferUtils} from "./arraybuffer";
import {Bundle} from "./bundle";
import {SignalProtocolAddress} from "./index";
import { Storage } from "./storage";
import {Connection} from "./connection";

const STORE_PREFIX = "store";
const STORE_PREFIX_SESSION = "session:";
const STORE_PREFIX_IDENTITYKEY = "identityKey:";
const STORE_PREFIX_PREKEY = "25519KeypreKey:";
const STORE_PREFIX_SIGNEDPREKEY = "25519KeysignedKey:";

export class Store
{
    private storage: Storage;
    private connection: Connection;
    private deviceNumber: number;
    private Direction: { SENDING: number; RECEIVING: number };

    constructor(storage: Storage, connection: Connection, deviceNumber: number)
    {
        this.storage = storage;
        this.connection = connection;
        this.deviceNumber = deviceNumber;
        this.Direction = {
            SENDING: 1,
            RECEIVING: 2
        };
    }

    async getOwnDeviceList(): Promise<number[]> 
    {
        return await this.get("deviceList", []);
    }

    async setOwnDeviceList(deviceList: string[]) 
    {
        await this.put("deviceList", deviceList);
    }

    getDeviceList(identifier: string)
    {
        return this.get("deviceList:" + identifier, []);
    }

    async setDeviceList(identifier: string, deviceList: string[]) 
    {
        await this.put("deviceList:" + identifier, deviceList);
    }

    async isReady() 
    {
        return await this.get("deviceId") && await this.get("identityKey") && this.get("registrationId");
    }

    async isPublished() 
    {
        return await this.get("published") === "true" || await this.get("published") === true;
    }

    getIdentityKeyPair() 
    {
        return Promise.resolve(this.get("identityKey"));
    }

    getLocalRegistrationId() 
    {
        return Promise.resolve(this.get("registrationId"));
    }

    async getDeviceId() 
    {
        return parseInt(await this.get("deviceId"));
    }

    async put(key: string, value: unknown) 
    {
        if (!key || !value || !value)
            throw new Error("Tried to store undefined/null");

        //@REVIEW serialization is done in storage.setItem
        const stringified = JSON.stringify(value, function (key, value) 
        {
            if (value instanceof ArrayBuffer)
                return ArrayBufferUtils.toArray(value);

            return value;
        });

        if (key.includes("identityKey"))
            console.log("put %s: %s \n %s \n\n", key, value, stringified);

        await this.storage.setItem(STORE_PREFIX, key, {v: stringified});
    }

    async get(key: string, defaultValue?: unknown) 
    {
        if (key === null || key === undefined)
            throw new Error("Tried to get value for undefined/null key");

        const data = await this.storage.getItem(STORE_PREFIX, key);

        if (data) 
        {
            const r = JSON.parse(data.v, function (key1, value) 
            {
                if (key1.endsWith("Key")) 
                {
                    console.log("get %s has Key %s", key, key1);
                    return ArrayBufferUtils.fromArray(value);
                }

                return value;
            });

            if (key === "identityKey")
                console.log("get %s: %s \n %s\n\n", key, data, r);


            return r;
        }

        return defaultValue;
    }

    async remove(key?: string | null) 
    {
        if (key === null || key === undefined)
            throw new Error("Tried to remove value for undefined/null key");

        await this.storage.removeItem(STORE_PREFIX, key);
    }

    async isTrustedIdentity(identifier: string, identityKey?: ArrayBuffer) 
    {
        if (!identifier)
            throw new Error("tried to check identity key for undefined/null key");


        if (!(identityKey instanceof ArrayBuffer))

            throw new Error("Expected identityKey to be an ArrayBuffer");


        const trusted = this.get(STORE_PREFIX_IDENTITYKEY + identifier);
        console.log("trusted %s \t %s \t %s", trusted === undefined, trusted, STORE_PREFIX_IDENTITYKEY + identifier);
        if (trusted === undefined)

            return Promise.resolve(true);


        return Promise.resolve(ArrayBufferUtils.isEqual(identityKey, await trusted));
    }

    async saveIdentity(identifier: string, identityKey: ArrayBuffer) 
    {
        if (!identifier)
            throw new Error("Tried to put identity key for undefined/null key");

        const address = new SignalProtocolAddress.fromString(identifier);

        const existing = this.get(STORE_PREFIX_IDENTITYKEY + address.toString());
        this.put(STORE_PREFIX_IDENTITYKEY + address.toString(), identityKey); //@REVIEW stupid?

        return Promise.resolve(existing && ArrayBufferUtils.isEqual(identityKey, await existing));
    }

    async loadPreKey(keyId: string) 
    {
        let res = await this.get(STORE_PREFIX_PREKEY + keyId);
        if (res !== undefined)

            res = {
                pubKey: res.pubKey,
                privKey: res.privKey
            };


        return Promise.resolve(res);
    }

    storePreKey(keyId: number, keyPair: unknown)
    {
        return Promise.resolve(this.put(STORE_PREFIX_PREKEY + keyId, keyPair));
    }

    removePreKey(keyId: string)
    {
        //@TODO publish new bundle

        return Promise.resolve(this.remove(STORE_PREFIX_PREKEY + keyId));
    }

    async loadSignedPreKey(keyId: string) 
    {
        let res = await this.get(STORE_PREFIX_SIGNEDPREKEY + keyId);
        if (res !== undefined)

            res = {
                pubKey: res.pubKey,
                privKey: res.privKey
            };


        return Promise.resolve(res);
    }

    storeSignedPreKey(keyId: number, keyPair: unknown)
    {
        return Promise.resolve(this.put(STORE_PREFIX_SIGNEDPREKEY + keyId, keyPair));
    }

    removeSignedPreKey(keyId: string)
    {
        return Promise.resolve(this.remove(STORE_PREFIX_SIGNEDPREKEY + keyId));
    }

    loadSession(identifier: string)
    {
        return Promise.resolve(this.get(STORE_PREFIX_SESSION + identifier));
    }

    storeSession(identifier: string, record: unknown)
    {
        return Promise.resolve(this.put(STORE_PREFIX_SESSION + identifier, record));
    }

    removeSession(identifier: string)
    {
        return Promise.resolve(this.remove(STORE_PREFIX_SESSION + identifier));
    }

    hasSession(identifier: string)
    {
        return !!this.get(STORE_PREFIX_SESSION + identifier);
    }

    removeAllSessions()
    {
        //@TODO implement removeAllSessions
        // for (var id in this.store) {
        //    if (id.startsWith(this.STORE_prefix + ':' + 'session' + identifier)) {
        //       localForage.removeItem(this.STORE_prefix + ':' + id);
        //    }
        // }
        return Promise.resolve();
    }

    async getPreKeyBundle(address: { getDeviceId: () => number; })
    {
        // TODO: get bundle form localForage
        const bundleElement = await this.connection.getBundle(address.getDeviceId());

        if (bundleElement === undefined) 
        
            return Promise.reject("Found no bundle");
        

        const bundle = Bundle.fromJSON(bundleElement as Record<string, unknown>);

        //@REVIEW registrationId??? Gajim uses probably own registration id.
        return bundle.toSignalBundle(address.getDeviceId());
    }
}
