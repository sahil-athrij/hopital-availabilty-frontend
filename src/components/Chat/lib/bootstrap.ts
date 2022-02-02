import {Random} from "./random";
import {KeyHelper, NUM_PRE_KEYS} from "./index";
import {Bundle} from "./bundle";
import {Store} from "./store";
import {Connection} from "./connection";

export class Bootstrap
{
    private connection: Connection;
    private store: Store;

    constructor(store: Store, connection: Connection)
    {
        this.store = store;
        this.connection = connection;
    }

    async prepare()
    {
        if (!await this.store.isReady())
            await this.setup();

        if (!await this.store.isPublished())
        {
            const bundle = await this.generateBundle();

            await this.connection.publishBundle(await this.store.getDeviceId(), bundle.toObject());
            await this.store.put("published", true);

            await this.addDeviceIdToDeviceList();
        }
    }

    setup()
    {
        return Promise.all([
            this.generateDeviceId(),
            KeyHelper.generateIdentityKeyPair(),
            KeyHelper.generateRegistrationId(),
        ]).then(async ([deviceId, identityKey, registrationId]) =>
        {
            await this.store.put("deviceId", deviceId);
            await this.store.put("identityKey", identityKey);
            await this.store.put("registrationId", registrationId);
        });
    }

    generateDeviceId()
    {
        return Promise.resolve(Random.number(Math.pow(2, 31) - 1, 1));
    }

    async generateBundle()
    {
        console.debug("Generate OMEMO bundle");

        const preKeyPromises = [];

        for (let i = 0; i < NUM_PRE_KEYS; i++)
            preKeyPromises.push(this.generatePreKey(i));

        preKeyPromises.push(this.generateSignedPreKey(1));

        const preKeys = await Promise.all(preKeyPromises);
        const identityKey = await this.store.getIdentityKeyPair();

        return new Bundle({
            identityKey: identityKey,
            signedPreKey: preKeys.pop(),
            preKeys: preKeys
        });
    }

    async generatePreKey(id: number)
    {
        const preKey = await KeyHelper.generatePreKey(id);

        await this.store.storePreKey(id, preKey.keyPair);

        return preKey;
    }

    async generateSignedPreKey(id: number)
    {
        const identity = await this.store.getIdentityKeyPair();
        const signedPreKey = await KeyHelper.generateSignedPreKey(identity, id);

        await this.store.storeSignedPreKey(id, signedPreKey.keyPair);

        return signedPreKey;
    }

    async addDeviceIdToDeviceList()
    {
        const deviceIds = await this.store.getOwnDeviceList();
        const ownDeviceId = await this.store.getDeviceId();

        if (deviceIds.indexOf(ownDeviceId) < 0)
            deviceIds.push(ownDeviceId);

        return this.connection.publishDevices(deviceIds, ownDeviceId);
    }
}
