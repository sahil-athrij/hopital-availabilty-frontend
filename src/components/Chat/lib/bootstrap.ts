import {Random} from "./random";
import {KeyHelper, NUM_PRE_KEYS} from "./index";
import {Bundle} from "./bundle";

export class Bootstrap
{
    constructor(store, connection) 
    {
        this.store = store;
        this.connection = connection;
    }

    async prepare() 
    {
        if (!this.store.isReady()) 
        
            await this.setup();
        

        if (!this.store.isPublished()) 
        {
            const bundle = await this.generateBundle();

            // @TODO catch error
            await this.connection.publishBundle(this.store.getDeviceId(), bundle.toObject());
            this.store.put("published", true);

            // @TODO catch error
            await this.addDeviceIdToDeviceList();
        }

        console.debug("OMEMO prepared");
    }

    setup() 
    {
        return Promise.all([
            this.generateDeviceId(),
            KeyHelper.generateIdentityKeyPair(),
            KeyHelper.generateRegistrationId(),
        ]).then(([deviceId, identityKey, registrationId]) => 
        {
            this.store.put("deviceId", deviceId);
            this.store.put("identityKey", identityKey);
            this.store.put("registrationId", registrationId);
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

    async generatePreKey(id) 
    {
        const preKey = await KeyHelper.generatePreKey(id);

        await this.store.storePreKey(id, preKey.keyPair);

        return preKey;
    }

    async generateSignedPreKey(id) 
    {
        const identity = await this.store.getIdentityKeyPair();
        const signedPreKey = await KeyHelper.generateSignedPreKey(identity, id);

        await this.store.storeSignedPreKey(id, signedPreKey.keyPair);

        return signedPreKey;
    }

    addDeviceIdToDeviceList() 
    {
        const deviceIds = this.store.getOwnDeviceList();
        const ownDeviceId = this.store.getDeviceId();

        if (deviceIds.indexOf(ownDeviceId) < 0) 
        //@REVIEW string vs number
            deviceIds.push(ownDeviceId);
        

        return this.connection.publishDevices(deviceIds);
    }
}
