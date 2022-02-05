import {
    DEFAULT_CONSTRAINTS,
    DEFAULT_ICE_SERVERS,
    TYPE_ANSWER, TYPE_CALL_END,
    TYPE_CALL_REJECT,
    TYPE_ICECANDIDATE,
    TYPE_OFFER, TYPE_REGISTER,
    WEBSOCKET_URL
} from "./constants";
import {ready} from "localforage";

interface WsMessage
{
    type: string;
    data: unknown;
    error?: string;
}

export default class WebRTC
{
    private readonly localVideo: HTMLVideoElement;
    private readonly remoteVideo: HTMLVideoElement;

    private readonly send: (type: string, data: unknown) => void;
    private readonly peer: RTCPeerConnection;
    private peerReady: Promise<unknown>;
    private inCall = false;

    private setRemoteDescription?: { resolve: (value: RTCSessionDescriptionInit) => void; reject: (reason?: unknown) => void; };
    private readonly notifyUser: (msg?: string) => Promise<boolean>;

    readonly tearDown: () => void;

    constructor(token: string, to: string, localVideo: HTMLVideoElement, remoteVideo: HTMLVideoElement, notifyUser: (msg?: string) => Promise<boolean>)
    {
        this.localVideo = localVideo;
        this.remoteVideo = remoteVideo;
        this.notifyUser = notifyUser;

        const metadata = {token, to};

        const socket = new WebSocket(WEBSOCKET_URL + token);
        const opened = new Promise<void>((resolve) => socket.onopen = () =>
        {
            socket.send(JSON.stringify({type: TYPE_REGISTER, metadata}));
            resolve();
        });

        socket.onmessage = ({data}) => this.onMessage(JSON.parse(data));

        this.send = (type, data: unknown) => opened.then(() => socket.send(JSON.stringify({type, data, metadata})));

        this.peer = new RTCPeerConnection({iceServers: DEFAULT_ICE_SERVERS});
        this.peerReady = new Promise((resolve) => this.peer.onnegotiationneeded = resolve);
        this.peer.onicecandidate = ({candidate}) => this.send(TYPE_ICECANDIDATE, candidate);
        this.peer.ontrack = ({streams}) => this.remoteVideo.srcObject = streams[0];

        socket.onclose = this.tearDown = () =>
        {
            for (const video of [localVideo, remoteVideo])
                if(video.srcObject)
                    for(const tracks of (video.srcObject as MediaStream).getTracks())
                        tracks.stop();

            socket.close();
            this.peer.close();
            this.inCall = false;
            this.makeCall = () => Promise.resolve();
        };
    }

    async makeCall()
    {
        if (this.inCall)
            throw new Error("Already in a call.");

        this.inCall = true;

        await this.setUpLocalMedia();
        await ready;

        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(offer);

        this.send(TYPE_OFFER, this.peer.localDescription);
        const remote = await new Promise<RTCSessionDescriptionInit>((resolve, reject) =>
            this.setRemoteDescription = {resolve, reject});

        await this.peer.setRemoteDescription(new RTCSessionDescription(remote));
    }

    private async handleOffer(offer: RTCSessionDescriptionInit)
    {
        if(this.inCall)
            return this.send(TYPE_CALL_REJECT, "Already in a call");

        await this.peer.setRemoteDescription(new RTCSessionDescription(offer));

        if(!await this.notifyUser("Incoming call"))
            return this.send(TYPE_CALL_REJECT, "Call declined");

        await this.setUpLocalMedia();
        await this.peer.setLocalDescription(await this.peer.createAnswer());

        this.send(TYPE_ANSWER, this.peer.localDescription);
    }

    private async setUpLocalMedia()
    {
        const stream = await navigator.mediaDevices.getUserMedia(DEFAULT_CONSTRAINTS);

        this.localVideo.srcObject = stream;
        for(const track of stream.getTracks())
            this.peer.addTrack(track, stream);
    }

    private async onMessage({type, data, error}: WsMessage)
    {
        switch (type)
        {
        case TYPE_ICECANDIDATE:
            await this.peer.addIceCandidate(data as RTCIceCandidateInit | undefined);
            break;
        case TYPE_ANSWER:
            if (this.setRemoteDescription)
                if (error)
                    this.setRemoteDescription.reject(error);
                else
                    this.setRemoteDescription.resolve(data as RTCSessionDescriptionInit);
            break;
        case TYPE_OFFER:
            await this.handleOffer(data as RTCSessionDescriptionInit);
            break;
        case TYPE_CALL_REJECT:
        case TYPE_CALL_END:
            this.tearDown();
            this.notifyUser(data as string).then();
            break;
        default:
            console.warn("Unknown message type", type);
        }
    }

}
