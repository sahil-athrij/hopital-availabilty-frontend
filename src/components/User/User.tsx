import {AuthComponent, AuthState} from "../../api/auth";
import {AuthPropsLoc} from "../GiveHelp/GiveHelp";
import {withRouter} from "react-router";
import * as React from "react";
import { Container } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LoginVector from "../../images/LoginVector.png";
import {BigBlueButton} from "../Utils";
import Addhosp from "../../images/addhospcard.svg";
import Givehelp from "../../images/givehelpcard.svg";
import Nurse from "../../images/nurse 1.png";
import Ambulanceimg from "../../images/ambulance 1.png";
import Medicine from "../../images/Medicine.svg";
import {Link} from "react-router-dom";
import Doc from "../../images/Doc.svg";
import Laboratory from "../../images/laboratory 1.png";
import BloodBank from "../../images/blood-bank 1.png";
import request from "../../images/helphand.svg";
import "./User.css";


interface Userstate extends AuthState {
    active:boolean,
}



class User extends AuthComponent<AuthPropsLoc, Userstate>
{

    constructor(props: AuthPropsLoc)
    {
        super(props);
        this.state = {
            ...this.state,


        };


    }
    render()
    {
        if (this.state.auth)
            return (
                <div>
                    <Container className="w-100 pb-5">
                        <div className="d-flex justify-content-between w-100 px-0  mt-4 mb-3 ">
                            <ArrowBackIcon  onClick={() => this.props.history.goBack()}  />
                            <p className="Yourprof w-100 text-left align-self-center ">Back</p>
                            <MoreVertIcon/>
                        </div>
                        <div>
                            <img src={LoginVector} alt={"Login vector"}/>
                            <div className="logintext">You need to Login to continue</div>
                        </div>
                        <div className="mb-3">
                            <BigBlueButton  onClick={this.performAuth} text={"Log In"}/>
                        </div>
                        <div className="mb-3">
                            <div className="container d-flex justify-content-between  p-0 align-self-center px-2">
                                <div className="homecard">
                                    <img src={Addhosp} alt=""/>
                                    <div className="cardtxt ">Hospital</div>
                                </div>
                                <div className="homecard">
                                    <img src={Givehelp} alt=""/>
                                    <div className="cardtxt ">Give help</div>
                                </div>
                                <div className="homecard">
                                    <img className="mb-2" src={Nurse} alt=""/>
                                    <div className="cardtxt m-0">Nurse</div>
                                </div>
                            </div>
                            <div className="container d-flex justify-content-between my-2 p-0 align-self-center px-2">

                                <div className="homecard d-flex flex-column ">
                                    <img src={Ambulanceimg} alt=""/>
                                    <div className="cardtxt ">Ambulance</div>
                                </div>
                                <div className="homecard">
                                    <img src={Medicine} alt=""/>
                                    <div className="cardtxt ">Medicine</div>
                                </div>
                                <Link style={{textDecoration:"none"}} className="homecard" to="/adddoctor/">
                                    <div >
                                        <img src={Doc} alt=""/>
                                        <div className="cardtxt m-0">Doctor</div>
                                    </div>
                                </Link>
                            </div>
                            <div className="container d-flex justify-content-between  p-0 align-self-center px-2">
                                <div className="homecard">
                                    <img src={Laboratory} alt=""/>
                                    <div className="cardtxt ">Laboratory</div>
                                </div>
                                <div className="homecard">
                                    <img src={BloodBank} alt=""/>
                                    <div className="cardtxt ">Blood Bank</div>
                                </div>
                                <div className="homecard">
                                    <img className="mb-2" src={request} alt=""/>
                                    <div className="cardtxt m-0">Request</div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mb-4">
                            <p className="bottomtxt  m-0">Don’t have an account?</p>
                            <button onClick={this.performAuth} className="signuptxt">Sign Up</button>
                        </div>
                        <hr className="linestyle"/>
                        <div className="endtxt pb-4">We appreciate your kindness</div>
                    </Container>
                </div>
            );
        
        else
        {
            console.log(this.state);
            return (
                <div>
                    hy
                </div>
            );
        }
    }
}


export const UserPage = withRouter(User);
