import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import IconButton from "@mui/material/IconButton";
import CallEndIcon from "@mui/icons-material/CallEnd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HttpsIcon from "@mui/icons-material/Https";
import {AuthComponent, AuthPropsLoc, AuthState, Friend} from "../../api/auth";
import {withRouter} from "react-router";
import Avatar from "@mui/material/Avatar";
import {Link} from "react-router-dom";
import WebRTC from "./WebRTC";
import React from "react";
import {Button} from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#083CBE" : grey[800],
}));

interface VideoCallState extends AuthState {
    acceptCall: (value: (PromiseLike<boolean> | boolean)) => void;
    openStatus: boolean;
    chatUser: Friend;
    rtc: WebRTC
}

class VideoCallLoc extends AuthComponent<AuthPropsLoc, VideoCallState>
{
    private readonly localVideo = React.createRef<HTMLVideoElement>();
    private readonly remoteVideo = React.createRef<HTMLVideoElement>();

    constructor(props: AuthPropsLoc)
    {
        super(props);

        const chatUser = this.state.user?.chat_friends?.find((friend) => friend.token === this.props.match.params.chatId);

        if (!chatUser || !this.state.user?.tokens.private_token)
            this.props.history.replace("/chat");
        else
            this.state = {
                ...this.state,
                openStatus: false,
                chatUser
            };
    }

    async componentDidMount()
    {
        super.componentDidMount();

        if (!this.state.auth || !this.state.user?.tokens?.private_token)
            return this.performAuth();

        if(this.localVideo.current && this.remoteVideo.current)
            this.setState({
                rtc: new WebRTC(
                    this.state.user?.tokens?.private_token,
                    this.state.chatUser.token,
                    this.localVideo.current,
                    this.remoteVideo.current,
                    this.notifyUser
                )
            });
    }

    componentWillUnmount()
    {
        super.componentWillUnmount();
        this.state.rtc.tearDown();
    }

    notifyUser = async (msg?: string) =>
    {
        window.alert(msg);
        const setState = this.setState.bind(this);
        return new Promise<boolean>((acceptCall) => setState({acceptCall}));
    };

    render()
    {
        return (
            <>
                <div style={{zIndex: 50, height: "100vh", color: "#8DB5B4"}}>
                    <div style={{padding: "1rem"}} className="d-flex justify-content-center align-items-center">
                        <Link style={{textDecoration: "none"}} to={`/chat/${this.state.chatUser.token}`}>
                            <KeyboardArrowDownIcon color={"error"} />
                        </Link>
                        <HttpsIcon style={{height: "1rem"}}/>
                        <p className="m-0" >End-to-end encrypted</p>
                    </div>
                    {0 ?
                        <div style={{color: "#F0F0F0"}}>
                            <Avatar src={this.state.chatUser.profile} alt={this.state.chatUser.name}/>
                            <h3 className="mt-3">{this.state.chatUser.name}</h3>
                            <p>Calling</p>
                        </div> :
                        <>
                            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                            <video ref={this.localVideo} muted={true} autoPlay={true}/>
                            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                            <video ref={this.remoteVideo} autoPlay={true} />
                            <Button onClick={() => this.state.rtc.makeCall()}>Call</Button>
                            <Button onClick={() => this.state.acceptCall(true)}>Accept</Button>
                            <Button onClick={() => this.state.acceptCall(false)}>Reject</Button>
                            <Button onClick={() => this.state.rtc.tearDown()}>Stop</Button>

                        </>
                    }
                </div>
                <Global
                    styles={{
                        ".MuiDrawer-root > .MuiPaper-root": {
                            height: "10%",
                            overflow: "visible",
                        },
                    }}
                />
                <SwipeableDrawer
                    style={{zIndex: 100}}
                    anchor="bottom"
                    open={this.state.openStatus}
                    disableSwipeToOpen={false}
                    onClose={() => this.setState({openStatus: false})}
                    onOpen={() => this.setState({openStatus: true})}
                >
                    <StyledBox
                        sx={{
                            position: "absolute",
                            top: "-5rem",
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            visibility: "visible",
                            right: 0,
                            left: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <IconButton onClick={()=>this.setState({openStatus: false})}>
                            <KeyboardArrowDownIcon />
                        </IconButton>
                        <div style={{paddingBottom: "2rem"}} className="d-flex justify-content-around w-100">
                            <IconButton>
                                <FlipCameraIosIcon style={{color: "#fff"}}/>
                            </IconButton>

                            <IconButton style={{color: "#fff"}}>
                                <VolumeUpIcon/>
                            </IconButton>

                            <IconButton style={{color: "#fff"}}>
                                <VideocamOffIcon/>
                            </IconButton>

                            <IconButton style={{color: "#fff"}}>
                                <MicOffIcon/>
                            </IconButton>

                            <IconButton style={{color: "#fff", background: "#E91C43"}}>
                                <CallEndIcon/>
                            </IconButton>

                        </div>
                    </StyledBox>
                    <StyledBox
                        sx={{
                            px: 2,
                            pb: 2,
                            height: "100%",
                            overflow: "auto",
                        }}
                    >
                    </StyledBox>
                </SwipeableDrawer>
            </>
        );
    }
}

export default withRouter(VideoCallLoc);
