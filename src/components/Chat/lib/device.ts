import {SessionBuilder, SessionCipher, SignalProtocolAddress} from "./index";
import { Store } from "./store";

export class Device
{
    private readonly store: Store;
    private readonly address: { getDeviceId: () => number; };
    private session?: boolean;

    constructor(jid: string, id: number, store: Store)
    {
        this.address = new SignalProtocolAddress(jid, id);
        this.store = store;
    }

    async decrypt(ciphertext: string, preKey = false)
    {
        const sessionCipher = new SessionCipher(this.store, this.address);
        let plaintextBuffer;

        if (preKey)
            plaintextBuffer = await sessionCipher.decryptPreKeyWhisperMessage(ciphertext, "binary");
        else
            plaintextBuffer = await sessionCipher.decryptWhisperMessage(ciphertext, "binary");

        return plaintextBuffer;
    }

    async encrypt(plaintext: ArrayBufferLike)
    {
        try 
        {
            if (!await this.store.hasSession(this.address.toString()))
                await this.establishSession();

            const session = this.getSession();
            const ciphertext = await session?.encrypt(plaintext);

            return {
                preKey: ciphertext.type === 3,
                ciphertext: ciphertext,
                deviceId: this.address.getDeviceId()
            };
        }
        catch (err) 
        {
            console.log("Error:", err);
            console.warn("Could not encrypt data for device with id " + this.address.getDeviceId());

            return null; // Otherwise Promise.all throws an error
        }
    }

    processPreKeyMessage(preKeyBundle: unknown)
    {
        const builder = new SessionBuilder(this.store, this.address);

        return builder.processPreKey(preKeyBundle);
    }

    async establishSession()
    {
        const signalBundle = await this.store.getPreKeyBundle(this.address);

        this.processPreKeyMessage(signalBundle);
    }

    getSession() 
    {
        return this.session || (this.session = new SessionCipher(this.store, this.address));
    }
}
