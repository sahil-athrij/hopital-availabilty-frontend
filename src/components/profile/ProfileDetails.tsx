import {AuthComponent, AuthPropsLoc, AuthState, reactUrl} from "../../api/auth";
import {Container} from "react-bootstrap";
import {withRouter} from "react-router";
import React from "react";
import {CSSTransition} from "react-transition-group";
import {FullScreenShare} from "../FullScreen/FullScreenShare";
import {Patient, PatientObject} from "../../api/model";
import icon1 from "../../images/backicon.svg";
import icon from "../Doctor/icons/icon@2x.svg";
import Editbutn from "../../images/editButton.svg"
import {Avatar, Slider} from "@mui/material";
import "./ProfileDetails.css"
import {withStyles} from "@mui/styles";
import Givehand from "../../images/Medicaidaccnt.svg";
import Friendship from "../../images/friendshipaccnt.svg";
import reviewsvg from "../../images/review.svg";
import Bloodgrp from "../../images/bloodgroup.svg";
import CovidPos from "../../images/corpos.svg";
import CovidNeg from "../../images/corneg.svg";
import Button from "@mui/material/Button";

import Maleicon from "../../images/male.svg";
import Femaleicon from "../../images/female.svg";
import TransGen from "../../images/TransGend.svg";
import PrefNSay from "../../images/genderless.svg";


const AirbnbSlider = withStyles({
    root: {
        color: '#0338B9 !important',
        height: 3,
        padding: '13px 0',
    },

    active: {},
    track: {
        height: 3,
    },
    rail: {
        color: '#d8d8d8 !important',
        opacity: 1,
        height: 3,
    },
})(Slider);



interface ProfileDetailsState extends AuthState {
    show_share: boolean;
    tab: number;
    requests: PatientObject[]
    friend_request: PatientObject[]
}


export class ProfileDetailsLoc extends AuthComponent<AuthPropsLoc, ProfileDetailsState> {
    constructor(props: AuthPropsLoc) {
        super(props);
        this.state = {
            ...this.state,
            show_share: false,
            requests: [],
            friend_request: [],
            tab: 0
        }
    }

    hashChange = () => {
        if (!this.props.location.hash.includes('share')) {
            this.setState({show_share: false})
        } else {
            this.setState({show_share: true})
        }
    }

    async componentDidMount() {
        super.componentDidMount();
        let data = await Patient.filter({}, true)
        let data1 = await Patient.action_general('friends/', {}, true)
        this.setState({requests: data.results, friend_request: data1.results})
    }

    getgender = (gender: string) => {
        if (gender === "M") {
            return (
                <img src={Maleicon}  alt=""/>)
            // eslint-disable-next-line eqeqeq
        } else if (gender === "F") {
            return (
                <img src={Femaleicon}  alt=""/>
            )
        } else if (gender === "NB") {
            return (
                <img src={TransGen} alt=""/>
            )
        } else if (gender === "NP") {
            return (
                <img src={PrefNSay}  alt=""/>
            )
        }

    }


    getTab = () => {
        if (this.state.tab === 0) {
            return (
                <div className="">
                    <Container className="maincont">
                        {this.state.requests ? (this.state.requests.map((obj) => (
                            <div>

                                <div className="mx-1">
                                    <div className="maincard d-flex flex-row justify-content-between ">

                                        <div className="  text-left pl-4 pt-4">
                                            <h1 className="title m-0">{obj.Name}{this.getgender(obj.gender)}</h1>
                                            <div className="subtitle">
                                                <div>Age:{obj.age}</div>
                                                <div>Symptoms:{obj.symptoms}</div>
                                                <div>Since:{obj.symdays}</div>
                                            </div>
                                        </div>
                                        <div className=" subtitle pr-4 pt-4 ">
                                            <div className="mt-1">{obj.blood} <img src={Bloodgrp}  alt=""/></div>
                                            <div className="mt-1">Covid:{obj.covidresult ? (<img src={CovidPos}  alt=""/>) : (
                                                <img src={CovidNeg}  alt=""/>)}</div>
                                            <div className="mt-1">CT score:{obj.ctscore}</div>
                                            <Button sx={{
                                                borderRadius: "10px",
                                                marginBottom: "1rem",
                                                textTransform: 'none',
                                                paddingX: "1.25rem",
                                                paddingY: ".25rem",marginTop:".5rem"
                                            }} className="helpbutn"
                                                    variant="contained">Edit</Button>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        ))) : null}


                    </Container>

                </div>
            )
        } else if (this.state.tab === 1) {
            return (
                <div className="m-4">

                  Tab2
                </div>

            )
        } else if (this.state.tab === 2) {
            return (
                <div className="m-4">
                    Tab3
                </div>

            )

        }

    }

    render() {
        let {user} = this.state

        return (
            <div>

            <React.Fragment>
                <div className="">
                    <Container className="w-100">
                        <div className="d-flex justify-content-between w-100 px-0  mt-4  ">
                            {/*<div className="left-align">*/}
                            <img alt={""}
                                onClick={() => this.props.history.goBack()}
                                 className=" mb-4  "
                                 src={icon1}/>
                            <p className="Yourprof w-100 text-left align-self-center ">Your Profile</p>

                            <img alt={""}
                                 className="threedot  pt-1"
                                 src={icon}
                            />

                        </div>
                    <div className="userbox d-flex flex-row align-content-around">
                        <Avatar src={this.state.user?.uploaded_images[0]?.image} sx={{marginRight:"10px",width:"75px",height:"75px"}}>{this.state.user? this.state.user.username[0]:'?'}</Avatar>
                        <div className="d-flex flex-grow-1 flex-column text-left">
                            <p className="profname">{this.state.user?.username}</p>
                            <p className="email">{this.state.user?.email}</p>
                            <p className="invitecode">Invite code: 8038RRR</p>
                        </div>
                        <button
                              className="editbutn "  ><b><img src={Editbutn}  alt=""/></b>
                        </button>
                    </div>
                        <div className="bg-grey px-4  mx-4 mb-4">
                            <div className="d-flex flex-row align-items-center">
                                <div className="d-flex flex-column">
                                    <p className="point1">75</p>
                                    <p className="point2">Points</p>
                                </div>
                                <AirbnbSlider className="slider mx-2"
                                        size="small"
                                        defaultValue={70}
                                        aria-label="Small"
                                        valueLabelDisplay="auto"
                                        disabled
                                />
                                <div className="d-flex flex-column ">
                                    <p className="point3">100</p>
                                    <p className="point4">Points</p>
                                </div>
                            </div>
                        </div>
                        <div className="container d-flex justify-content-between mb-4 p-0">

                            <div className={`card-about card-1 ${this.state.tab === 0 && "active"}`}
                                 onClick={() => this.setState({tab: 0})}>
                                <img src={Givehand} alt={"doctor svg"}/>
                                <p className="m-0"><b>1</b><br/>Requests</p>
                            </div>

                            <div className={`card-about card-1 ${this.state.tab === 1 && "active"}`}
                                 onClick={() => this.setState({tab: 1})}>
                                <img src={Friendship} alt={"layout svg"}/>
                                <p className="m-0"><b>good</b><br/>Friends</p>
                            </div>

                            <div className={`card-about card-1 ${this.state.tab === 2 && "active"}`}
                                 onClick={() => this.setState({tab: 2})}>
                                <img src={reviewsvg} alt={"review svg"}/>
                                <p className="m-0"><b><br/></b>Item three</p>
                            </div>


                        </div>
                    </Container>
                    {this.getTab()}

                </div>

                <CSSTransition classNames="filter-screen" in={this.state.show_share} timeout={300}
                               unmountOnExit>
                    <FullScreenShare
                        url={`${reactUrl}/invite?invite=${user ? user.tokens.private_token : ''}`}
                        close={() => {
                            this.props.history.goBack()
                            this.setState({show_share: false})
                        }}/>
                </CSSTransition>
            </React.Fragment>
             </div>
        )

    }

}

export const ProfileDetails = withRouter(ProfileDetailsLoc)