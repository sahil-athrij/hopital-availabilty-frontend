import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";

import SignalConnection, {ChatMessage} from "./lib";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Account from "../../images/ventilator.svg";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import InputBase from "@mui/material/InputBase";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import React from "react";


interface ChatState extends AuthState
{
    connection: SignalConnection;
    chat: string;
    messages: Array<ChatMessage>;
}

class ChatLoc extends AuthComponent<AuthPropsLoc, ChatState> 
{

    constructor(props: AuthPropsLoc) 
    {
        super(props);

        if (!this.state.user?.tokens.private_token || !this.props.match.params.chatId)
            throw Error("User not logged in");

        this.state = {
            ...this.state,
            connection: new SignalConnection(this.state.user.tokens.private_token, this.props.match.params.chatId, this.onMessage),
            chat: "",
        };
    }


    handleChange = (event: { target: { value: string; }; }) =>
    {
        this.setState({chat: event.target.value});
    };

    sendMessage = async () =>
    {
        await this.state.connection.sendMessage(this.state.chat);
        this.setState({chat: ""});
    };
    
    onMessage = (message: ChatMessage) => this.setState({messages: [...this.state.messages, message]});

    render(): JSX.Element 
    {
        return (
            <>
                <div style={{height: "100vh"}}>
                    <div style={{boxShadow: "0px 10px 60px rgba(0, 0, 0, 0.0625)"}} className="d-flex px-3 align-items-center">
                        {/*onClick={() => this.props.history.goBack()}*/}
                        <Link style={{textDecoration: "none"}} to="/chat"><ArrowBackIcon sx={{color: "#4F5E7B"}}/></Link>
                        <img style={{borderRadius: "50%", marginLeft: "1rem"}} src={Account} alt=""/>
                        <div style={{marginLeft: "1rem", paddingTop: "1rem"}} className="d-flex flex-column text-start">
                            <h5>Doctor harruy</h5>
                            <p>online</p>
                        </div>
                        <VideocamIcon sx={{marginLeft: "auto", marginRight: "1rem"}} color="action"/>
                        <MoreVertIcon/>
                    </div>
                    <p style={{margin: ".5rem", fontSize: "10px", color: "#A1A1BC"}}>Message Now</p>

                    <div className="d-flex justify-content-start align-items-center mb-3 mx-3">

                        <div style={{background: "#F7F7F7", width: "fit-content", maxWidth: "70%", borderRadius: "8px", color: "#1B1A57"}} className="text-justify p-2">
                            incoming message
                        </div>
                    </div>

                    <div className="d-flex justify-content-end align-items-center mb-3 mx-3">

                        <div style={{background: "#385FF6", width: "fit-content", maxWidth: "70%", borderRadius: "8px", color: "#FFFFFF"}} className="text-justify p-2">
                            send message
                        </div>
                    </div>

                    <form
                        style={{display: "flex", alignItems: "center", boxShadow: "0", position: "fixed", bottom: "0", width: "100%"}}
                    >
                        <IconButton sx={{ p: "10px" }} aria-label="menu">
                            <SentimentSatisfiedAltIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            value={this.state.chat}
                            placeholder="Write a message..."
                            inputProps={{ "aria-label": "search google maps" }}
                            onChange={this.handleChange}
                        />
                        <IconButton sx={{ p: "10px" }} aria-label="search">
                            <AttachFileIcon />
                        </IconButton>
                        <IconButton onClick={this.sendMessage} sx={{ p: "10px", m: "10px", background: "#385FF6", display: "flex", alignItems: "center", justifyContent: "center",
                            "&:hover": {backgroundColor: "#385FF6"}}}>
                            {this.state.chat ===""?<MicIcon sx={{ color: "#fff"}} />:<SendIcon sx={{ color: "#fff"}}/>}
                        </IconButton>
                    </form>
                </div>

            </>
        );
    }
}

export default withRouter(ChatLoc);
