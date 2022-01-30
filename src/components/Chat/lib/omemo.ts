import {Store} from "./store";
import {Peer} from "./peer";
import {Bootstrap} from "./bootstrap";
import {ArrayBufferUtils} from "./arraybuffer";
import {AES_TAG_LENGTH} from "./index";
import {EncryptedElementInterface, Header, Message, Stanza} from "./stanza";
import { Storage } from "./storage";
import {Connection} from "./connection";


export interface StanzaInterface {
    from: string;
    encrypted: { header: Header; payload: string; };
    type: string;

}

export class Omemo
{
    private readonly connection: Connection;
    private readonly store: Store;
    private readonly peers: Record<string, Peer>;
    private deviceNumber: number;
    private bootstrap?: Bootstrap;

    constructor(storage: Storage, connection: Connection, deviceNumber: number)
    {
        this.connection = connection;
        this.store = new Store(storage, connection, deviceNumber);
        this.peers = {};

        Peer.setOwnUid(connection.username);
        this.deviceNumber = deviceNumber;
    }

    storeOwnDeviceList(deviceList: string[])
    {
        return this.store.setOwnDeviceList(deviceList);
    }

    storeDeviceList(identifier: string, deviceList: string[])
    {
        return this.store.setDeviceList(identifier, deviceList);
    }

    prepare()
    {
        if (!this.bootstrap)
            this.bootstrap = new Bootstrap(this.store, this.connection);

        return this.bootstrap.prepare();
    }

    encrypt(contact: string, message: string) : Promise<EncryptedElementInterface>
    {
        const peer = this.getPeer(contact);

        return peer.encrypt(message)
            .then(async (encryptedMessages: Message) => Stanza.buildEncryptedStanza(encryptedMessages, await this.store.getDeviceId()));
    }

    async decrypt(stanza: StanzaInterface)
    {
        if (stanza.type !== "message")
            throw "Root element is no message element";

        const encryptedElement = stanza.encrypted;

        if (encryptedElement === undefined)
            throw "No encrypted stanza found";

        const from = stanza.from;
        const encryptedData = Stanza.parseEncryptedStanza(encryptedElement);

        if (!encryptedData)
            throw "Could not parse encrypted stanza";

        const ownDeviceId = await this.store.getDeviceId();
        const ownPreKeyFiltered = encryptedData.keys.filter(({deviceId}) => ownDeviceId === Number(deviceId));

        if (ownPreKeyFiltered.length !== 1)
            return Promise.reject(`Found ${ownPreKeyFiltered.length} PreKeys which match my device id (${ownDeviceId}).`);

        const ownPreKey = ownPreKeyFiltered[0]; //@TODO rename var
        const peer = this.getPeer(from);
        //   const exportedKey;

        let exportedKey;
        try
        {
            exportedKey = await peer.decrypt(encryptedData.sourceDeviceId, ownPreKey.ciphertext, ownPreKey.preKey);
        }
        catch (err)
        {
            throw "Error during decryption: " + err;
        }

        const exportedAESKey = exportedKey.slice(0, 16);
        const authenticationTag = exportedKey.slice(16);

        if (authenticationTag.byteLength !== 16)
            //@TODO authentication tag is also allowed to be larger
            throw "Authentication tag too short";

        const iv = (encryptedData).iv;
        const ciphertextAndAuthenticationTag = ArrayBufferUtils.concat((encryptedData).payload, authenticationTag);

        return this.decryptWithAES(exportedAESKey, iv, ciphertextAndAuthenticationTag);
    }

    async decryptWithAES(exportedAESKey: BufferSource, iv: ArrayBuffer, data: ArrayBufferView | ArrayBuffer)
    {
        const key = await window.crypto.subtle.importKey("raw", exportedAESKey, {
            name: "AES-GCM"
        }, false, ["decrypt"]);

        const decryptedBuffer = await window.crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: iv,
            tagLength: AES_TAG_LENGTH
        }, key, data);

        return ArrayBufferUtils.decode(decryptedBuffer);
    }

    getPeer = (jid: string) => this.peers[jid] || (this.peers[jid] = new Peer(jid, this.store));
}
