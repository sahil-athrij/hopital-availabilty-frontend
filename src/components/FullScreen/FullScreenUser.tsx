import {Container, Avatar} from "@mui/material";
import {AuthComponent, AuthPropsLoc, AuthState, reactUrl} from "../../api/auth";
import {withRouter} from "react-router";

import React from "react";
import {FullScreenLocationProps} from "./FullScreenLocation";

import "./location.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {BigBlueButton, NineCards} from "../Utils";
import LoginVector from "../../images/LoginVector.png";
import {toast} from "react-toastify";

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
            <div className="w-100">
                <Container className="w-100 pb-5">
                    <div className="d-flex justify-content-between w-100 px-0  mt-4 mb-1 ">
                        <ArrowBackIcon  onClick={() => this.props.close()}/>
                        <p className="Yourprof w-100 text-left align-self-center ">Back</p>
                        <MoreVertIcon/>
                    </div>
                    {this.state.auth?
                        <div>
                            <div className="d-flex flex-column align-items-center">
                                <Avatar src={this.state.user?.tokens.profile || undefined}  sx={{
                                    width: "98px",
                                    height: "98px",
                                    marginTop:"10px",
                                    marginBottom:"9px",
                                }}>{this.state.user ? this.state.user.username[0] : "?"}</Avatar>
                                <div className="logintext">{this.state.user?.username}</div>
                            </div>
                            <div className="mb-2">
                                <BigBlueButton onClick={async ()=> window.confirm("Say good bye!") &&
                                    await this.removeAuth() && (window.location.href="/")} text={"Log Out"}/>
                            </div>
                        </div>

                        :<div>
                            <div>
                                <img src={LoginVector} alt={"Login vector"}/>
                                <div className="logintext">You need to Login to continue</div>
                            </div>
                            <div className="mb-2">
                                <BigBlueButton onClick={this.performAuth} text={"Log In"}/>
                            </div>
                        </div>}
                    {this.state.auth?
                        <div className="d-flex justify-content-center mb-4">
                            <p className="bottomtxt  m-0">Do you want to invite friends?</p>
                            <button onClick={this.handleinvite} className="signuptxt">Invite Now</button>
                        </div>:
                        <div className="d-flex justify-content-center mb-4">
                            <p className="bottomtxt  m-0">Don’t have an account?</p>
                            <button onClick={this.performAuth} className="signuptxt">Sign Up</button>
                        </div>
                    }
                    <div className="mb-3">
                        <NineCards/>
                    </div>
                    <hr className="linestyle"/>
                    <div className="endtxt pb-4">We appreciate your kindness</div>
                </Container>
            </div>
        );
    }
}

export const UserMenuBox = withRouter(UserMenuBoxLoc);


export class FullScreenUser extends AuthComponent<FullScreenLocationProps, AuthState> 
{

    render() 
    {

        return (<div className="fixed-top w-100 z-index-1031 h-100 bg-white header">

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
            <Container className="mt-2">

                <UserMenuBox close={this.props.close} refresh_parent={this.refresh}/>

            </Container>
        </div>);
    }
}
