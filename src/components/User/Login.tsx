import {AuthComponent, AuthState, reactUrl} from "../../api/auth";
import {AuthPropsLoc} from "../GiveHelp/GiveHelp";
import {withRouter} from "react-router";
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LoginVector from "../../images/LoginVector.png";
import {BigBlueButton, NineCards} from "../Utils";
import "./User.css";
import {Avatar, Container} from "@mui/material";
import {toast} from "react-toastify";


interface Userstate extends AuthState {
    active:boolean,
}



class Login extends AuthComponent<AuthPropsLoc, Userstate>
{

    constructor(props: AuthPropsLoc)
    {
        super(props);
        this.state = {
            ...this.state,


        };


    }

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
            <div>
                <Container className="w-100 pb-5">
                    <div className="d-flex justify-content-between w-100 px-0  mt-4 mb-1 ">
                        <ArrowBackIcon  onClick={() => this.props.history.goBack()}  />
                        <p className="Yourprof w-100 text-left align-self-center ">Back</p>
                        <MoreVertIcon/>
                    </div>
                    {this.state.auth?
                        <div>
                            <div className="d-flex flex-column align-items-center">
                                <Avatar src={this.state.user?.tokens.image || undefined}  sx={{
                                    width: "98px",
                                    height: "98px",
                                    marginTop:"10px",
                                    marginBottom:"9px",
                                }}>{this.state.user ? this.state.user.username[0] : "?"}</Avatar>
                                <div className="logintext">{this.state.user?.username}</div>
                            </div>
                            <div className="mb-2">
                                <BigBlueButton onClick={()=>
                                {
                                    this.removeAuth();
                                    window.location.href="/";
                                }
                                } text={"Log Out"}/>
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
                    <div className="mb-3">
                        <NineCards/>
                    </div>
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
                    <hr className="linestyle"/>
                    <div className="endtxt pb-4">We appreciate your kindness</div>
                </Container>
            </div>
        );

    }
}


export const UserPage = withRouter(Login);
