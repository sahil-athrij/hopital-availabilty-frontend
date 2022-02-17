import {AuthComponent, AuthPropsLoc, AuthState, Friend} from "../../api/auth";
import {withRouter} from "react-router";

import SignalConnection, {ChatMessage} from "./lib";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Account from "../../images/ventilator.svg";
import VideocamIcon from "@mui/icons-material/Videocam";
import IconButton from "@mui/material/IconButton";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import InputBase from "@mui/material/InputBase";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import "./Swiper.css";
import DoneIcon from "@mui/icons-material/Done";
import React, {ChangeEvent, createRef, CSSProperties} from "react";
import localForage from "localforage";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Picker from "emoji-picker-react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import BubbleContent from "./BubbleContent";

interface ChatState extends AuthState {
    chat: string;
    messages: Array<ChatMessage>;
    chatUser: Friend;
    connection: SignalConnection;
    mime?: string;
    showPicker: boolean;
    filePopover: boolean;
    fileContent?: string
}

const messageStyle = {
    sent: {background: "#385FF6", color: "#F7F7F7"},
    received: {background: "#F7F7F7", color: "#1B1A57"},
};


class ChatLoc extends AuthComponent<AuthPropsLoc, ChatState> 
{

    private readonly messagesEndRef = createRef<HTMLDivElement>();
    private readonly fileInput = createRef<HTMLInputElement>();
    private readonly imageInput = createRef<HTMLInputElement>();
    private readonly attachButton = createRef<HTMLButtonElement>();

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
                messages: [],
                showPicker: false,
                filePopover: false,
            };
    }

    // onEmojiClick = () => {
    //     // setInputStr((prevInput) => prevInput + emojiObject.emoji);
    //     // this.setState({ShowPicker: false});
    // };
    // onEmojiClick = (event, emojiObject) => {
    //     setInputStr((prevInput) => prevInput + emojiObject.emoji);
    //     this.setState({ShowPicker: false});
    // };

    onMessage = (messages: Array<ChatMessage>) => this.setState({messages}, () => this.scrollToBottom());

    scrollToBottom = () => this.messagesEndRef.current?.scrollIntoView({behavior: "smooth"});


    resetState = (event: KeyboardEvent) => 
    {
        if (event.key === "Escape")
            this.setState({
                showPicker: false,
                filePopover: false

            });

    };

    async componentDidMount() 
    {
        super.componentDidMount();
        if (!this.state.auth || !this.state.user?.tokens?.private_token)
            return this.performAuth();

        this.onMessage(await localForage.getItem(`messages-${this.state.chatUser.token}`) || []);

        this.setState({
            connection: new SignalConnection(this.state.user.tokens.private_token, this.state.chatUser.token, this.onMessage)
        });

        document.addEventListener("keydown", this.resetState, false);

    }

    componentWillUnmount() 
    {
        super.componentWillUnmount();
        this.state.connection.tareDown();
    }

    sendMessage = async () => 
    {
        if (this.state.chat)
            await this.state.connection?.sendMessage(this.state.chat, this.state.mime);

        this.setState({chat: "", mime: undefined, filePopover: false});
    };

    sendFile = async () => 
    {
        if (this.state.fileContent)
            await this.state.connection?.sendMessage(this.state.fileContent, this.state.mime);

        this.setState({fileContent: undefined, mime: undefined, filePopover: false});
    };

    uploadFile = async (event: ChangeEvent<HTMLInputElement>) => 
    {
        const reader = new FileReader();
        const read = new Promise((resolve, reject) => 
        {
            reader.onloadend = resolve;
            reader.onerror = reject;
        });

        const file = event.target.files?.[0];

        if (file) 
        {
            reader.readAsDataURL(file);
            await read;

            this.setState({
                mime: file?.type || "application/octet-stream",
                fileContent: reader.result?.toString()
            });

            await this.sendFile();
        }
    };

    handleInputChange = async (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => 
    {
        if (event.key === "Enter" && !event.shiftKey)
            return this.sendMessage();

        else
            return false;
    };

    render() 
    {
        return (
            <>
                <div style={{height: "91vh"}}>
                    <div className="d-flex px-3 align-items-center top-nav-chat">
                        <Link style={{textDecoration: "none"}} to="/chat">
                            <ArrowBackIcon sx={{color: "#4F5E7B"}}/>
                        </Link>

                        <img style={{borderRadius: "50%", marginLeft: "1rem"}} src={Account} alt=""/>
                        <div style={{marginLeft: "1rem", paddingTop: "1rem"}} className="d-flex flex-column text-start">
                            <div className="h5 m-0 fw-bold">{this.state.chatUser.name}</div>
                            <div>Last seen on {this.state.chatUser.last_seen}</div>
                        </div>
                        <Link style={{textDecoration: "none"}} to={`/video_call/${this.state.chatUser.token}`}>
                            <VideocamIcon sx={{marginLeft: "auto", marginRight: "1rem"}} color="action"/>
                        </Link>
                    </div>


                    <div className="chat-main">
                        <p style={{margin: ".5rem", fontSize: "10px", color: "#A1A1BC"}}>Message Now</p>

                        {this.state.messages.map(({content, type, time, attachment, mime}, i) => 
                        {

                            const next = this.state.messages[i + 1];
                            const prev = this.state.messages[i - 1];
                            const corner_top = (prev?.type === type) ? "8px" : "25px";
                            const corner_bottom = (next?.type === type) ? "8px" : "25px";

                            console.log(mime);
                            const border: CSSProperties = type !== "sent" ? {
                                borderTopLeftRadius: corner_top,
                                borderBottomLeftRadius: corner_bottom,

                            } : {
                                borderTopRightRadius: corner_top,
                                borderBottomRightRadius: corner_bottom
                            };
                            if (attachment)

                                border.position = "relative";

                            else 
                            {
                                border.padding = ".25rem";
                                border.paddingLeft = "1rem";
                                border.paddingRight = "1rem";
                                border.paddingTop = ".5rem";
                            }

                            const timeStyle: CSSProperties = content ? {display: "flex", alignSelf: "end"} :
                                {
                                    display: "flex", alignSelf: "end", position: "absolute",
                                    bottom: "4px",
                                    right: "4px",
                                    opacity: "1"
                                };
                            return (
                                <div ref={this.messagesEndRef}
                                    className={`d-flex align-items-center mb-1 mx-2 ${prev?.type !== type ? "mt-4" : "mt-0"} ${type === "sent" ? "justify-content-end" : "justify-content-start"}`}

                                    key={i}>
                                    <div style={{
                                        ...messageStyle[type],
                                        ...border,

                                    }} className="d-flex flex-column message-bubble ">
                                        <BubbleContent content={content} messageStyle={messageStyle[type]}
                                            attachment={attachment} border={border} mime={mime} />
                                        <div className="ms-1" style={timeStyle}>
                                            <p style={{
                                                marginBottom: "0",
                                                fontSize: "8px",
                                                marginLeft: "auto",
                                            }}>{time}</p>
                                            {type === "sent" && <DoneIcon sx={{height: "12px"}}/>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


                <div className={"bottom-texting-bar d-flex flex-column align-items-center w-100"}>
                    <div className={"d-flex align-items-center flex-row"}>

                        <IconButton sx={{p: "10px"}} aria-label="menu">
                            <SentimentSatisfiedAltIcon onClick={() => 
                            {
                                this.setState({showPicker: !this.state.showPicker});
                            }}/>
                        </IconButton>
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            value={this.state.chat}
                            placeholder="Write a message..."
                            multiline
                            onKeyDown={(event) =>
                                this.handleInputChange(event)}
                            onChange={(event) => this.setState({chat: event.target.value})}
                        />

                        <div>
                            <IconButton sx={{p: "10px"}}
                                onClick={() => this.setState({filePopover: !this.state.filePopover})}
                                ref={this.attachButton}>
                                <AttachFileIcon/>
                            </IconButton>
                            <Popper className="d-flex justify-content-center align-items-center"
                                style={{zIndex: 1000, width: "100vw"}}
                                open={this.state.filePopover}
                                anchorEl={this.attachButton.current}
                                transition>
                                {({TransitionProps}) => (
                                    <Fade style={{width: "95vw", height: "6rem", }} {...TransitionProps}
                                        timeout={150}>
                                        <Paper
                                            className="d-flex align-items-center justify-content-around mb-3">
                                            <Typography sx={{p: 2}}><InsertDriveFileIcon
                                                sx={{color: "#5157ae", fontSize: "2rem"}}
                                                onClick={() => this.fileInput.current?.click()}/><p
                                                style={{fontSize: "13px", marginBottom: "0"}}>Document</p>
                                            </Typography>
                                            <Typography sx={{p: 2}}><PermMediaIcon
                                                sx={{color: "#b462cf", fontSize: "2rem"}}
                                                onClick={() => this.imageInput.current?.click()}/><p
                                                style={{fontSize: "13px", marginBottom: "0"}}>Media</p>
                                            </Typography>
                                            <Typography sx={{p: 2}}><CameraAltIcon
                                                sx={{color: "#d44a6d", fontSize: "2rem"}}
                                                onClick={() => this.imageInput.current?.click()}/><p
                                                style={{fontSize: "13px", marginBottom: "0"}}>Camera</p>
                                            </Typography>
                                        </Paper>
                                    </Fade>
                                )}
                            </Popper>
                        </div>

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
                        <input type="file" hidden onChange={this.uploadFile} accept="video/*,image/*"
                            ref={this.imageInput}/>
                        <input type="file" hidden onChange={this.uploadFile} accept="*" ref={this.fileInput}/>
                    </div>
                    <div style={{bottom: "4rem"}}>
                        {this.state.showPicker && (
                            <Picker pickerStyle={{width: "100%"}}
                                onEmojiClick={(event, emojiObject) => this.setState({chat: this.state.chat + emojiObject.emoji})}/>
                        )}

                    </div>
                </div>


            </>
        );
    }
}

export default withRouter(ChatLoc);
