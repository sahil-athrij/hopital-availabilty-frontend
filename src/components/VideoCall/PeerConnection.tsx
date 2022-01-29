import React, {Component} from "react";
import {createMessage, createPayload} from "./functions/utils";
import {TYPE_OFFER, TYPE_ICECANDIDATE} from "./functions/constants";

interface PeerConnectionProps {
    localMediaStream: MediaStream,
    rtcPeerConnection: RTCPeerConnection,
    roomInfo: {
        roomKey: string | null, socketID: string |null
    }
    sendMessage: (message: string) => void;
    addRemoteStream:(remoteMediaStream: MediaStream)=>void,
    startConnection:boolean
}

class PeerConnection extends Component <PeerConnectionProps> 
{
    constructor(props: PeerConnectionProps) 
    {
        super(props);
    }

    addMediaStreamTrack = async () => 
    {

        const {localMediaStream, rtcPeerConnection} = this.props;
        console.log("addMediaStream: ", localMediaStream);
        if (localMediaStream)

            await localMediaStream.getTracks().forEach((mediaStreamTrack) => 
            {
                rtcPeerConnection.addTrack(mediaStreamTrack);
            });

    };

    handleOnNegotiationNeeded = async () => 
    {
        const {sendMessage, roomInfo, rtcPeerConnection} = this.props;
        try 
        {
            const offer = await rtcPeerConnection.createOffer();
            await rtcPeerConnection.setLocalDescription(offer);
            const payload = createPayload(roomInfo.roomKey as string, roomInfo.socketID as string, rtcPeerConnection.localDescription);
            const offerMessage = createMessage(TYPE_OFFER, payload);
            sendMessage(JSON.stringify(offerMessage));
        }
        catch (error) 
        {
            console.error("handleNegotiationNeeded Error: ", error);
        }
    };

    handleOnIceEvent = (rtcPeerConnectionIceEvent: { candidate: any; }) =>
    {
        if (rtcPeerConnectionIceEvent.candidate) 
        {
            const {sendMessage, roomInfo} = this.props;
            const {candidate} = rtcPeerConnectionIceEvent;
            const payload = createPayload(roomInfo.roomKey as string, roomInfo.socketID as string, JSON.stringify(candidate));
            const iceCandidateMessage = createMessage(TYPE_ICECANDIDATE, payload);
            sendMessage(JSON.stringify(iceCandidateMessage));
        }
    };

    handleOnTrack = (trackEvent: { track: MediaStreamTrack; }) =>
    {
        const remoteMediaStream = new MediaStream([trackEvent.track]);
        this.props.addRemoteStream(remoteMediaStream);
    };

    componentDidMount() 
    {
        const {rtcPeerConnection} = this.props;
        rtcPeerConnection.onnegotiationneeded = this.handleOnNegotiationNeeded;
        rtcPeerConnection.onicecandidate = this.handleOnIceEvent;
        rtcPeerConnection.ontrack = this.handleOnTrack;
    }

    componentDidUpdate(prevProps: { startConnection: any; })
    {
        if (this.props.startConnection !== prevProps.startConnection)

            this.addMediaStreamTrack().then();

    }

    render() 
    {
        return (
            <>
            </>
        );
    }
}

export default PeerConnection;
