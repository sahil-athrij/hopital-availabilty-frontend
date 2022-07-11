import {Container} from "@mui/material";
import {AuthComponent, AuthPropsLoc, AuthState, reactUrl} from "../../api/auth";
import {withRouter} from "react-router";

import React from "react";
import {FullScreenLocationProps} from "./FullScreenLocation";

import "./location.css";
import CloseIcon from "@mui/icons-material/Close";
import {BigBlueButton} from "../Utils";
import LoginVector from "../../images/LoginVector.png";
import {toast} from "react-toastify";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PermPhoneMsgOutlinedIcon from "@mui/icons-material/PermPhoneMsgOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Divider from "@mui/material/Divider";



interface MenuBoxProps extends AuthPropsLoc {
    close: () => void
    refresh_parent?: () => void
}




interface UserMenuBoxState extends AuthState {
    show_share: boolean
}

class UserMenuBoxLoc extends AuthComponent<MenuBoxProps, UserMenuBoxState> 
{
    constructor(props: MenuBoxProps) 
    {
        super(props);
        this.state = {
            ...this.state,
            show_share: false
        };
    }

    hashChange = () => 
    {
        if (!this.props.location.hash.includes("share")) 
        
            this.setState({show_share: false});
        
        else 
        
            this.setState({show_share: true});
        
    };

    handleinvite = async () => 
    {
        const shareData = {
            title: "NeedMedi",
            text: `${this.state.user?.username} Invited you to needmedi.com`,
            url: `${reactUrl}/invite?invite=${this.state.user?.tokens.private_token}`
        };

        try 
        {
            await navigator.share(shareData);
            toast.success("Invited Successfully", {
                position: "bottom-center"
            });
        }
        catch (error) 
        {
            toast.error((error as { details: string }).details, {
                position: "bottom-center"
            });
        }
    };

    render() 
    {



        return (
            <Container className="w-100" sx={{paddingRight:"0"}} >
                <div className="d-flex justify-content-between w-100 mt-4 p-0">
                    <CloseIcon  onClick={() => this.props.close()}/>
                    <p style={{paddingRight: "16px", fontWeight:700, fontSize: "19px", fontFamily: "Nunito"}} className="Yourprof w-100 m-0 text-center">Menu</p>
                    {/*<MoreVertIcon/>*/}
                </div>
                {this.state.auth?
                    <div>
                        {/*<div className="d-flex flex-column align-items-center">*/}
                        {/*    <Avatar src={this.state.user?.tokens.profile || undefined}  sx={{*/}
                        {/*        width: "98px",*/}
                        {/*        height: "98px",*/}
                        {/*        marginTop:"10px",*/}
                        {/*        marginBottom:"9px",*/}
                        {/*    }}>{this.state.user ? this.state.user.username[0] : "?"}</Avatar>*/}
                        {/*    <div className="logintext">{this.state.user?.username}</div>*/}
                        {/*</div>*/}
                        <nav>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={()=> this.props.history.push("/profile")}>
                                        <ListItemIcon>
                                            <PermIdentityOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Profile" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                                <ListItem disablePadding>
                                    <ListItemButton onClick={this.handleinvite}>
                                        <ListItemIcon>
                                            <ShareOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Share to friends" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <VolunteerActivismOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Donate" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ForumOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Feedback" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PermPhoneMsgOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Contact" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <InfoOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="About Us" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </nav>
                        <div className="mt-4 d-flex">
                            <BigBlueButton style={{width: "148px", height: "34px", fontWeight: "700", fontSize: "19px", fontFamily: "Nunito", borderRadius: "12px"}} onClick={async ()=> window.confirm("Say good bye!") &&
                                    await this.removeAuth() && (window.location.href="/")} text={"Log Out"}/>
                        </div>
                    </div>

                    :<>
                        <div className="p-3">
                            <div>
                                <img src={LoginVector} alt={"Login vector"}/>
                                <div className="logintext">You need to Login to continue</div>
                            </div>
                            <div className="mb-2">
                                <BigBlueButton style={{width: "148px", height: "34px", fontWeight: "700", fontSize: "19px", fontFamily: "Nunito", borderRadius: "12px"}} onClick={this.performAuth} text={"Log In"}/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mb-4">
                            <p className="bottomtxt  m-0">Don’t have an account?</p>
                            <button onClick={this.performAuth} className="signuptxt">Sign Up</button>
                        </div>
                    </>
                }
            </Container>
        );
    }
}

export const UserMenuBox = withRouter(UserMenuBoxLoc);


export class FullScreenUser extends AuthComponent<FullScreenLocationProps, AuthState> 
{

    render() 
    {

        return (<div className="fixed-top w-75 z-index-1031 h-100 bg-white header">

            {/*<Container fluid={true} className="py-3 bg-grey justify-content-start">*/}
            {/*    <button className="BlueBackground p-2" onClick={() => {*/}
            {/*        this.props.close()*/}
            {/*    }}>*/}
            {/*        <Back/>*/}
            {/*    </button>*/}
            {/*    <div className="h3 m-0 mx-2">*/}
            {/*        Need Medi*/}
            {/*    </div>*/}
            {/*</Container>*/}
            <Container className="p-0">

                <UserMenuBox close={this.props.close} refresh_parent={this.refresh}/>

            </Container>
        </div>);
    }
}
