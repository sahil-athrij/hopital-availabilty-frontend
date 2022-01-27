import React, {Component} from "react";
import RTCVideo from "./RTCVideo";
import Form from "./Form";
import Websocket from "./Websocket";
import PeerConnection from "./PeerConnection";
import {DEFAULT_CONSTRAINTS, DEFAULT_ICE_SERVERS, TYPE_ROOM, TYPE_ANSWER} from "./functions/constants";
import {buildServers, generateRoomKey, createMessage, createPayload} from "./functions/utils";
import "core-js/stable";
import "regenerator-runtime";


interface RTCMeshProps {
    mediaConstraints: MediaStreamConstraints
    iceServers: string[]
    URL: string

}

interface RTCMeshState {
    iceServers: RTCIceServer[],
    mediaConstraints: MediaStreamConstraints
    localMediaStream: null | MediaStream | void
    remoteMediaStream: null | MediaStream | void
    roomKey: null | number | string,
    socketID: null | string | number,
    connectionStarted: boolean,
    text: string
}

class RTCMesh extends Component<RTCMeshProps, RTCMeshState> 
{
    wantCamera: boolean;
    socket: WebSocket;
    rtcPeerConnection: RTCPeerConnection;

    constructor(props: RTCMeshProps) 
    {
        super(props);
        const {mediaConstraints, iceServers} = props;
        // build iceServers config for RTCPeerConnection
        const iceServerURLs = buildServers(iceServers);
        this.state = {
            iceServers: iceServerURLs || DEFAULT_ICE_SERVERS,
            mediaConstraints: mediaConstraints || DEFAULT_CONSTRAINTS,
            localMediaStream: null,
            remoteMediaStream: null,
            roomKey: null,
            socketID: null,
            connectionStarted: false,
            text: ""
        };
        this.wantCamera = true;
        this.socket = new WebSocket(this.props.URL);
        this.rtcPeerConnection = new RTCPeerConnection({iceServers: this.state.iceServers});
    }

    openCamera = async (fromHandleOffer: boolean) => 
    {
        const {mediaConstraints, localMediaStream} = this.state;
        try 
        {
            if (!localMediaStream) 
            {
                let mediaStream;
                if (this.wantCamera) mediaStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
                else mediaStream = await navigator.mediaDevices.getDisplayMedia(mediaConstraints);

                return fromHandleOffer ? mediaStream : this.setState({localMediaStream: mediaStream});
            }
        }
        catch (error) 
        {
            console.error("getUserMedia Error: ", error);
        }
    };

    handleOffer = async (data: { payload: any; }) => 
    {
        const {localMediaStream, roomKey, socketID} = this.state;
        const {payload} = data;
        await this.rtcPeerConnection.setRemoteDescription(payload.message);
        let mediaStream = localMediaStream;
        if (!mediaStream) mediaStream = await this.openCamera(true);
        this.setState({connectionStarted: true, localMediaStream: mediaStream}, async () => 
        {
            const answer = await this.rtcPeerConnection.createAnswer();
            await this.rtcPeerConnection.setLocalDescription(answer);
            const payload = createPayload(roomKey as string, socketID as string, answer);
            const answerMessage = createMessage(TYPE_ANSWER, payload);
            this.socket.send(JSON.stringify(answerMessage));
        });
    };

    handleAnswer = async (data: { payload: any; }) => 
    {
        const {payload} = data;
        await this.rtcPeerConnection.setRemoteDescription(payload.message);
    };

    handleIceCandidate = async (data: { payload: { message: any; }; }) => 
    {
        const {message} = data.payload;
        const candidate = JSON.parse(message);
        await this.rtcPeerConnection.addIceCandidate(candidate);
    };

    handleShareDisplay = async () => 
    {
        this.wantCamera = !this.wantCamera;
        if (this.state.connectionStarted) 
        {
            const {mediaConstraints, localMediaStream} = this.state;
            let mediaStream;
            if (this.wantCamera) mediaStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
            else mediaStream = await navigator.mediaDevices.getDisplayMedia(mediaConstraints);

            const screenStream = mediaStream.getVideoTracks()[0];
            const transceiver = this.rtcPeerConnection.getTransceivers()[0];

            if (localMediaStream) 
            {

                localMediaStream.removeTrack(localMediaStream.getTracks()[0]);
                localMediaStream.addTrack(screenStream);
            }
            await transceiver["sender"].replaceTrack(screenStream);
        }
    };

    sendRoomKey = () => 
    {
        const {roomKey, socketID} = this.state;
        if (!roomKey) 
        {
            const key = generateRoomKey();
            const roomData = createMessage(TYPE_ROOM, createPayload(key, socketID as string));
            this.setState({roomKey: key});
            this.socket.send(JSON.stringify(roomData));
            alert(key);
        }
    };

    handleSocketConnection = (socketID: any) => 
    {
        this.setState({socketID});
    };

    handleConnectionReady = (message: { startConnection: any; }) => 
    {
        console.log("Inside handleConnectionReady: ", message);
        if (message.startConnection)

            this.setState({connectionStarted: message.startConnection});

    };

    addRemoteStream = (remoteMediaStream: any) => 
    {
        this.setState({remoteMediaStream});
    };

    handleSubmit = (event: { preventDefault: () => void; }) => 
    {
        event.preventDefault();
        const {text, socketID} = this.state;
        // send the roomKey
        // Remove leading and trailing whitespace
        if (text.trim()) 
        {
            const roomKeyMessage = createMessage(TYPE_ROOM, createPayload(text, socketID as string));
            this.socket.send(JSON.stringify(roomKeyMessage));
        }

        this.setState({text: "", roomKey: text.trim()});
    };

    handleChange = (event: { target: { value: string; }; }) => 
    {
        this.setState({
            text: event.target.value
        });
    };

    render() 
    {
        const {
            localMediaStream,
            remoteMediaStream,
            text,
            roomKey,
            socketID,
            iceServers,
            connectionStarted,
        } = this.state;
        const sendMessage = this.socket.send.bind(this.socket);

        return (
            <>
                <Websocket
                    socket={this.socket}
                    // setSendMethod={this.setSendMethod}
                    handleSocketConnection={this.handleSocketConnection}
                    handleConnectionReady={this.handleConnectionReady}
                    handleOffer={this.handleOffer}
                    handleAnswer={this.handleAnswer}
                    handleIceCandidate={this.handleIceCandidate}
                />
                <PeerConnection
                    rtcPeerConnection={this.rtcPeerConnection}
                    iceServers={iceServers}
                    localMediaStream={localMediaStream as MediaStream}
                    addRemoteStream={this.addRemoteStream}
                    startConnection={connectionStarted}
                    sendMessage={sendMessage}
                    roomInfo={{socketID, roomKey}}
                />
                <RTCVideo mediaStream={localMediaStream}/>
                <RTCVideo mediaStream={remoteMediaStream}/>

                <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    hasRoomKey={roomKey}
                    text={text}
                />

                <section className='button-container'>
                    <button className='button button--start-color' onClick={this.openCamera}/>
                    <button onClick={this.handleShareDisplay}>Share Screen</button>
                    <button className='button button--stop-color' onClick={null}/>
                </section>
            </>
        );
    }
}

export default RTCMesh;
