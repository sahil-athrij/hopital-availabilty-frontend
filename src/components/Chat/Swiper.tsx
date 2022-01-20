import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Account from "../../images/ventilator.svg";
import "./Swiper.css";
import Fab from "@mui/material/Fab";
import Plus from "../../images/chat_plus.svg";
import SearchIcon from "@mui/icons-material/Search";
import chat from "../../images/chat_bw.svg";
import recent from "../../images/recent_bw.svg";
import call from "../../images/call_bw.svg";
import contact from "../../images/contact_bw.svg";
import {Link} from "react-router-dom";
import {Tab} from "@mui/material";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) 
{
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

interface SwiperState extends AuthState{
    value: number
}

export default class Swiper extends AuthComponent<AuthPropsLoc, SwiperState>
{
    constructor(props: AuthPropsLoc)
    {
        super(props);

        this.state = {...this.state, value: 0};
    }

    render()
    {
        return (
            <>
                <Tabs
                    value={this.state.value}
                    selectionFollowsFocus
                    onChange={(e, value) => this.setState({value})}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab icon={<img src={chat} alt=""/>}/>
                    <Tab icon={<img src={recent} alt=""/>}/>
                    <Tab icon={<img src={call} alt=""/>}/>
                    <Tab icon={<img src={contact} alt=""/>}/>
                </Tabs>

                <SwipeableViews
                    axis={"x"}
                    index={this.state.value}
                    onChangeIndex={(value) => this.setState({value})}
                >
                    <TabPanel value={this.state.value} index={0}>
                        <div>
                            {/*<div style={{height: "45vh"}}>*/}
                            {/*    <div style={{*/}
                            {/*        textAlign: "left",*/}
                            {/*        fontSize: "20px",*/}
                            {/*        lineHeight: "20px",*/}
                            {/*        margin: "1rem",*/}
                            {/*        paddingLeft: ".5rem"*/}
                            {/*    }}>*/}
                            {/*        Chats*/}
                            {/*    </div>*/}
                            {/*<div style={{marginBottom: "2rem"}}> TODO: Implement */}
                            {/*    <div className="d-flex justify-content-between">*/}
                            {/*        <div style={{*/}
                            {/*            textAlign: "left",*/}
                            {/*            fontSize: "18px",*/}
                            {/*            lineHeight: "24.55px",*/}
                            {/*            margin: "1rem"*/}
                            {/*        }}>*/}
                            {/*            Pinned Chats*/}
                            {/*        </div>*/}

                            {/*        <img style={{*/}
                            {/*            height: "3rem",*/}
                            {/*            borderRadius: "100%",*/}
                            {/*            marginRight: "1rem",*/}
                            {/*            alignItems: "center"*/}
                            {/*        }} src={Account} alt={"profile"}/>*/}
                            {/*    </div>*/}

                            {/*    <div className="chat-main d-flex flex-wrap justify-content-around m-2"*/}
                            {/*        style={{height: "30vh", overflow: "auto"}}>*/}

                            {/*        <div className="p-1" style={{*/}
                            {/*            width: "40%",*/}
                            {/*            background: "#F7F7F7",*/}
                            {/*            marginTop: "1rem",*/}
                            {/*            borderRadius: "8px"*/}
                            {/*        }}>*/}
                            {/*            <div className="d-flex p-2">*/}
                            {/*                <div style={{marginRight: "1rem", height: "2.5rem"}} className="d-flex">*/}
                            {/*                    <img style={{borderRadius: "100%", alignItems: "center"}}*/}
                            {/*                        src={Account} alt={"profile"}/>*/}
                            {/*                    <div style={{*/}
                            {/*                        width: "10px",*/}
                            {/*                        height: "10px",*/}
                            {/*                        borderRadius: "50%",*/}
                            {/*                        background: "#4CE417",*/}
                            {/*                        alignSelf: "end",*/}
                            {/*                        marginBottom: "1px",*/}
                            {/*                        marginLeft: "-13px"*/}
                            {/*                    }}/>*/}
                            {/*                </div>*/}
                            {/*                <p style={{fontSize: ".8rem", textAlign: "left", color: "#1B1A57"}}>Name*/}
                            {/*                    of a person</p>*/}
                            {/*            </div>*/}

                            {/*            <div className="d-flex justify-content-center align-items-center px-2 mb-2">*/}
                            {/*                <ReplyIcon sx={{height: "1rem"}} color="action"/>*/}
                            {/*                <p className="d-flex justify-content-center align-items-center mb-0"*/}
                            {/*                    style={{fontSize: ".7rem", textAlign: "left", color: "#4F5E7B"}}>Some*/}
                            {/*                    chat here...</p>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/*</div>*/}


                            <div className="m-2" style={{
                                boxShadow: "0px -8px 32px rgba(70, 96, 135, 0.1)",
                                borderRadius: "16px 16px 0 0",
                                bottom: "0",
                                height: "90vh" // TODO: This was 37 vh
                            }}>
                                <div className="d-flex align-items-center justify-content-center">
                                    <div style={{
                                        width: "30px",
                                        height: "4px",
                                        background: "#4F5E7B",
                                        marginTop: "1rem",
                                        opacity: "0.2",
                                        borderRadius: "100px"
                                    }}>
                                    </div>
                                </div>
                                <div style={{marginBottom: "1rem"}} className="d-flex justify-content-between p-2">
                                    Recent Chats
                                    <SearchIcon sx={{color: "#4F5E7B"}}/>
                                </div>

                                <div className="chat-main" style={{height: "35vh", overflow: "auto"}}>
                                    {this.state.user?.friends?.map((friend, i) =>
                                        (<Link to={`/chat/${friend.token}`} key={i}>
                                            <div className="d-flex">
                                                <div className="ms-2 me-1 d-flex">
                                                    <img className="align-items-center"
                                                        style={{borderRadius: "100%", height: "3rem"}} src={Account}
                                                        alt={"profile"}/>
                                                    <div style={{
                                                        width: "10px",
                                                        height: "10px",
                                                        borderRadius: "50%",
                                                        background: "#4CE417",
                                                        alignSelf: "end",
                                                        marginBottom: "17px",
                                                        marginLeft: "-9px"
                                                    }}/>
                                                </div>
                                                <div style={{color: "#1B1A57"}} className="text-start">
                                                    {friend.name}
                                                    <p style={{color: "#4F5E7B"}}>gdfgdfh</p>
                                                </div>
                                                <div style={{marginLeft: "auto", marginRight: ".5rem"}}
                                                    className="d-flex flex-column align-items-center">
                                                    <p style={{color: "#4F5E7B"}} className="m-0"> 18:31</p>
                                                    <div style={{
                                                        width: "24px",
                                                        height: "24px",
                                                        borderRadius: "50%",
                                                        background: "blue",
                                                        color: "#FFFFFF"
                                                    }}>3
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>)
                                    )}
                                </div>

                                <Fab style={{position: "fixed", bottom: 33, right: 20, background: "#385FF6"}}
                                    color="primary" aria-label="add">
                                    <img src={Plus} alt={"plus"}/>
                                </Fab>

                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        Resents
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                        Call
                    </TabPanel>
                    <TabPanel value={this.state.value} index={3}>
                        Contacts
                    </TabPanel>
                </SwipeableViews>
            </>
        );
    }
}
