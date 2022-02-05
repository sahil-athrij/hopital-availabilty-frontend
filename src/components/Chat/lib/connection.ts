import {Omemo, StanzaInterface} from "./omemo";
import {Storage} from "./storage";
import {getAuth} from "../../../api/auth";
import localForage from "localforage";

export class Connection
{
    private readonly onMessage;
    readonly username;
    private readonly to;
    private readonly resolves: Record<string, Array<(bundle: unknown) => void>>;
    private readonly send;
    private omemo?: Omemo;
    private lastMessage = "";
    readonly disconnect;

    constructor(username: string, to: string, onMessage: (message: string, from: string, mime: string) => unknown)
    {
        this.username = username;
        this.onMessage = onMessage;
        this.to = to;
        this.resolves = {};

        const channel = new WebSocket(
            `${process.env.BASE_URL?.replace("http", "ws")}/ws/chat/message?token=${getAuth()}`);

        this.send = (o: object) => channel.send(JSON.stringify(o));

        this.disconnect = () => channel.close();

        channel.onopen = () =>
            this.send({
                type: "register",
                username: this.username
            });

        channel.onmessage = async ({data}) =>
        {
            if(this.lastMessage === data)
                return;

            this.lastMessage = data;

            console.log("received message of type", data.type);

            const msg = JSON.parse(data);

            switch (msg.type)
            {
            case "registered":
                const ownId = await localForage.getItem<number>("deviceId");

                const devices = msg.devices.filter((id: number) => Number(id) !== ownId);
                console.log("registered, already registered devices: \n", devices);

                const storage = new Storage();
                this.omemo = new Omemo(storage, this, devices.length);
                if (devices.length > 0)
                    this.updateDevices({
                        username: this.username,
                        devices: devices
                    });

                await this.omemo.prepare();

                if(ownId)
                    this.publishDevices([...devices, ownId], ownId);

                break;
            case "devices":
                this.updateDevices(msg);
                break;
            case "bundle":
                if (!(msg.deviceId in this.resolves))
                    break;

                const bundle = msg.bundle;

                for (let i = 0; i < this.resolves[msg.deviceId].length; i++)
                {
                    const fn = this.resolves[msg.deviceId].pop();
                    if(fn)
                        fn(bundle);
                }

                break;
            case "message":
                if ("encrypted" in msg)
                    this.onMessage(await this.decrypt(msg), msg.from, msg.mime);
                break;
            default:
                console.warn("unknown message type: %s", msg.type);
            }
        };
    }

    publishDevices(devices: Array<number>, ownDeviceId: number)
    {
        console.log("sending devices: \n%s", JSON.stringify(devices, null, 4));
        this.send({
            type: "devices",
            username: this.username,
            devices: devices,
            ownDeviceId
        });
    }

    publishBundle(deviceId: number, bundle: unknown)
    {
        this.send({
            type: "bundle",
            deviceId: deviceId,
            username: this.username,
            bundle: bundle
        });
    }

    async sendMessage(message: string, mime?:string)
    {
        const encryptedMessage = await this.omemo?.encrypt(this.to, message);
        console.log("sending message to", this.to);

        this.send({
            type: "message",
            from: this.username,
            to: this.to,
            encrypted: encryptedMessage,
            mime
        });
    }

    async decrypt(message: StanzaInterface) : Promise<string>
    {
        if(!this.omemo)
            throw Error("Not O-memo initialised");

        return await this.omemo.decrypt(message);
    }

    updateDevices(message: { devices: Array<string>, username: string })
    {
        const ownJid = this.username;
        const deviceIds = message.devices;

        if (ownJid === message.username)
            this.omemo?.storeOwnDeviceList(deviceIds);
        //@TODO handle own update (check for own device id)
        else
            this.omemo?.storeDeviceList(message.username, deviceIds);
    }

    getBundle(deviceId: number)
    {
        return new Promise( (resolve) =>
        {
            if (!(deviceId in this.resolves))
                this.resolves[deviceId] = [];

            this.resolves[deviceId].push(resolve);
            this.send({
                type: "getBundle",
                deviceId,
                username: this.to
            });
        });
    }
}
