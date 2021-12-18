import {Omemo} from "./omemo";
import {Storage} from "./storage";

export class Connection
{
    onMessage;

    constructor(username, onMessage)
    {
        this.username = username;
        this.onMessage = onMessage;
        this.resolves = {};

        const websocket = new WebSocket("ws://localhost:2222/connection");
        this.websocket = websocket;

        this.send = (o) => websocket.send(JSON.stringify(o));

        websocket.onopen = () =>
        {
            console.log("socket opened");

            this.send({
                type: "register",
                username: this.username
            });
        };

        websocket.onmessage = async (event) =>
        {
            console.log("received message %s", event.data);

            const msg = JSON.parse(event.data);

            switch (msg.type)
            {
            case "registered":
                const devices = msg.devices;
                console.log("registered, already registered devices: \n%s", JSON.stringify(devices, null, 4));

                const storage = new Storage();
                this.omemo = new Omemo(storage, this, devices.length);
                if (devices.length > 0)
                    this.updateDevices({
                        username: this.username,
                        devices: devices
                    });

                this.omemo.prepare();
                break;
            case "devices":
                this.updateDevices(msg);
                break;
            case "bundle":
                if (!(msg.deviceId in this.resolves))
                    break;

                const bundle = msg.bundle;

                for (let i = 0; i < this.resolves[msg.deviceId].length; i++)
                    this.resolves[msg.deviceId].pop()(bundle);

                break;
            case "message":
                if ("encrypted" in msg)
                    this.onMessage(await this.decrypt(msg));
                else
                    this.onMessage(message);
                break;
            default:
                console.warn("unknown message type: %s", msg.type);
            }
        };

        websocket.onclose = function (event)
        {
            console.log("close %s", event);
        };

        window.onbeforeunload = function ()
        {
            websocket.onclose = () => undefined;
            websocket.close();
        };
    }

    publishDevices(devices)
    {
        console.log("sending devices: \n%s", JSON.stringify(devices, null, 4));
        this.send({
            type: "devices",
            username: this.username,
            devices: devices
        });
    }

    publishBundle(deviceId, bundle)
    {
        this.send({
            type: "bundle",
            deviceId: deviceId,
            username: this.username,
            bundle: bundle
        });
    }

    async sendMessage(to, message)
    {
        const encryptedMessage = await this.omemo.encrypt(to, message);
        console.log("sending message: %s to %s", message, to);
        this.send({
            type: "message",
            from: this.username,
            to: to,
            encrypted: encryptedMessage
        });
    }

    async decrypt(message)
    {
        const decrypted = await this.omemo.decrypt(message);
        console.log("decrypted message: %s", decrypted);

        return decrypted;
    }

    updateDevices(message)
    {
        const ownJid = this.username;
        const deviceIds = message.devices;

        if (ownJid === message.username)
            this.omemo.storeOwnDeviceList(deviceIds);
        //@TODO handle own update (check for own device id)
        else
            this.omemo.storeDeviceList(message.username, deviceIds);

    }

    getBundle(deviceId)
    {
        return new Promise( (resolve) =>
        {
            if (!(deviceId in this.resolves))
                this.resolves[deviceId] = [];

            this.resolves[deviceId].push(resolve);
            this.send({
                type: "getBundle",
                deviceId: deviceId
            });
        });
    }
}
