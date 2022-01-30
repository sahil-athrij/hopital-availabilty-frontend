import {AuthComponent, AuthPropsLoc, AuthState, Friend} from "../../api/auth";
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
import "./Swiper.css";
import DoneIcon from "@mui/icons-material/Done";
// import DoneAllIcon from "@mui/icons-material/DoneAll";
import {createRef} from "react";
import localForage from "localforage";


interface ChatState extends AuthState {
    chat: string;
    messages: Array<ChatMessage>;
    chatUser: Friend;
    connection: SignalConnection;
}

const messageStyle = {
    sent: {background: "#385FF6", color: "#F7F7F7"},
    received: {background: "#F7F7F7", color: "#1B1A57"}
};



class ChatLoc extends AuthComponent<AuthPropsLoc, ChatState> 
{

    messagesEndRef = createRef<HTMLDivElement>();

    constructor(props: AuthPropsLoc) 
    {
        super(props);

        const chatUser = this.state.user?.chat_friends?.find((friend) => friend.token === this.props.match.params.chatId);

        if (!chatUser || !this.state.user?.tokens.private_token)
            this.props.history.replace("/chat");
        else
            this.state = {
                ...this.state,
                chat: "",
                chatUser,
                messages: []
            };
    }

    onMessage = (messages: Array<ChatMessage>) =>
    {
        this.setState({messages}, () => this.scrollToBottom());
        console.log("messages");
        console.log(messages);
    };

    scrollToBottom = () => this.messagesEndRef.current?.scrollIntoView({behavior: "smooth"});

    async componentDidMount() 
    {
        super.componentDidMount();

        if (!this.state.auth || !this.state.user?.tokens?.private_token)
            return this.performAuth();

        this.onMessage(await localForage.getItem(`messages-${this.state.chatUser.token}`) || []);

        this.setState({
            connection: new SignalConnection(this.state.user.tokens.private_token, this.state.chatUser.token, this.onMessage)
        });
    }


    handleChange = (event: { target: { value: string; }; }) => 
    {
        this.setState({chat: event.target.value});
    };

    sendMessage = async () => 
    {
        if (this.state.chat)
            await this.state.connection?.sendMessage(this.state.chat);

        this.setState({chat: ""});
    };


    render() 
    {
        console.log(this.state.messages);
        return (
            <>
                <div style={{height: "90vh"}}>
                    <div style={{
                        boxShadow: "0px 10px 60px rgba(0, 0, 0, 0.0625)",
                        position: "sticky",
                        top: "0",
                        background: "#fff"
                    }}
                    className="d-flex px-3 align-items-center">
                        {/*onClick={() => this.props.history.goBack()}*/}
                        <Link style={{textDecoration: "none"}} to="/chat"><ArrowBackIcon
                            sx={{color: "#4F5E7B"}}/></Link>
                        <img style={{borderRadius: "50%", marginLeft: "1rem"}} src={Account} alt=""/>
                        <div style={{marginLeft: "1rem", paddingTop: "1rem"}} className="d-flex flex-column text-start">
                            <div className="h5 m-0 fw-bold">{this.state.chatUser.name}</div>
                            <div>online</div>
                        </div>
                        <VideocamIcon sx={{marginLeft: "auto", marginRight: "1rem"}} color="action"/>
                        <MoreVertIcon/>
                    </div>


                    <div className="chat-main" style={{
                        height: "89%",
                        position: "relative",
                        overflowY: "auto",
                        zIndex: 100,
                        marginBottom: "3.5rem"
                    }}>
                        <p style={{margin: ".5rem", fontSize: "10px", color: "#A1A1BC"}}>Message Now</p>

                        {this.state.messages.map(({content, type, time}, i) =>
                        {

                            const next = this.state.messages[i + 1];
                            const prev = this.state.messages[i - 1];
                            const corner_top = (prev?.type === type) ? "8px" : "25px";
                            const corner_bottom =(next?.type === type) ? "8px"  : "25px";
                            const border = type !== "sent"?{borderTopLeftRadius:corner_top,
                                borderBottomLeftRadius:corner_bottom}:{borderTopRightRadius:corner_top,
                                borderBottomRightRadius:corner_bottom};
                            return (
                                <div ref={this.messagesEndRef}
                                    className={`d-flex align-items-center mb-1 mx-2 ${type[i+1] !== type[i]? "mt-5": "mt-0"} ${type === "sent" ? "justify-content-end" : "justify-content-start"}`}
                                    key={i}>
                                    <div style={{
                                        ...messageStyle[type],
                                        width: "fit-content",
                                        maxWidth: "85%",
                                        minWidth: "10%",
                                        borderRadius: "25px",
                                        ...border,
                                        wordBreak: "break-word",
                                        // wordWrap: "break-word",
                                        textAlign: "left",
                                    }} className="p-1 pt-2 px-3 d-flex flex-column">
                                        {content}
                                        {/*{!next &&*/}
                                        <div className="ms-1 d-flex align-self-end" >
                                            <p style={{
                                                marginBottom: "0",
                                                fontSize: "8px",
                                                marginLeft: "auto"
                                            }}>{time}</p>
                                            {type === "sent" && <DoneIcon sx={{height: "12px"}}/>
                                                // <DoneAllIcon sx={{height: "12px"}}/>
                                            }
                                        </div>
                                        {/*}*/}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        boxShadow: "0",
                        position: "fixed",
                        bottom: "0",
                        width: "100%",
                        height: "4rem",
                        zIndex: 200,
                        background: "#fff",
                    }}
                >
                    <IconButton sx={{p: "10px"}} aria-label="menu">
                        <SentimentSatisfiedAltIcon/>
                    </IconButton>
                    <InputBase
                        sx={{ml: 1, flex: 1}}
                        value={this.state.chat}
                        placeholder="Write a message..."
                        onChange={this.handleChange}
                    />
                    <IconButton sx={{p: "10px"}}>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton onClick={this.sendMessage} sx={{
                        p: "10px",
                        m: "10px",
                        background: "#385FF6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": {backgroundColor: "#385FF6"}
                    }}>
                        {this.state.chat ? <SendIcon sx={{color: "#fff"}}/> : <MicIcon sx={{color: "#fff"}}/>}
                    </IconButton>
                </div>
            </>
        );
    }
}

export default withRouter(ChatLoc);
