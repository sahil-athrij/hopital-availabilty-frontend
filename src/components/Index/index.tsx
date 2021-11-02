import React from "react";
import {Col, Container} from "react-bootstrap";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";

import "./index.css";
import {getParam} from "../../api/QueryCreator";

import {SearchResults} from "../cards/SearchResultCard";
import Homecover from "../../images/illustration.png";
import {Link} from "react-router-dom";
import Addhosp from "../../images/addhospcard.svg";
import Givehelp from "../../images/givehelpcard.svg";
import Nurse from "../../images/nurse 1.png";
import Medicine from "../../images/Medicine.svg";
import Doc from "../../images/Doc.svg";
import Ambulanceimg from "../../images/ambulance 1.png";
import Laboratory from "../../images/laboratory 1.png";
import BloodBank from "../../images/blood-bank 1.png";
import request from "../../images/helphand.svg";




interface IndexState extends AuthState
{
    display: boolean
    lat?: string,
    lng?: string,
    activestep:number,
}

/**
 * @extends  AuthComponent<AuthPropsLoc, IndexState>
 */

class IndexLoc extends AuthComponent<AuthPropsLoc, IndexState>
{

    constructor(props: AuthPropsLoc)
    {
        super(props);
        const lat = getParam("lat",); // Obtain value Of lat stored in local storage during previous query
        const lng = getParam("lng",);
        this.state = {
            ...this.state,
            display: true,
            lat, lng,
            activestep:0,
        };
    }
    
    handleStepChange = (step: number) =>
    {
        this.setState({activestep:step});
    };

    /**
     * Descibes the Index page including swipable carousels
     * @returns { JSX.Element } index Component
     */

    render()
    {

        return (
            <React.Fragment>
                <Container fluid={true} className="mt-2 p-5 ">
                </Container>
                <Container className="text-left">
                    <div style={{
                        backgroundColor: "#3E64FF",
                        borderRadius: "1.25rem",
                        boxShadow: "0px 25px 58px rgba(62, 100, 255, 0.3)"
                    }} className="card text-white">
                        <div className="d-flex align-items-start flex-column mb-5 pb-2">
                            <h1 className="text-white mx-4 mt-4 mb-2"><b>NeedMedi</b></h1>
                            <h1 className="text-white mx-4 mb-2"><b>is for all</b></h1>
                            <h6 className="text-white mx-4 my-0"><b>Your complete partner in</b></h6>
                            <h6 className="text-white mx-4 my-0"><b>terms of medical help</b></h6>
                        </div>
                        <img style={{borderRadius: "1.25rem"}} className="mx-4 mb-0" src={Homecover} alt="home"/>
                    </div>
                    {/*<Link style={{textDecoration: "none"}} to="/addRequest">*/}
                    {/*    <div className="helpbar">*/}
                    {/*        <div className="rigtharrow"><img className="iconimg" src={Righticon} alt=""/></div>*/}
                    {/*        <h5 className="problem">Any problems?</h5>*/}

                    {/*        <h6 className="probsec">Request Medical help here</h6>*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                </Container>

                <div className="servicehead text-left d-flex justify-content-between mb-3">
                       Health Care Services
                </div>
                <div>
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

                </div>
                <div>

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

                </div>
                <div>

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


                <Container className="mb-5 pb-3 pt-3 text-left">
                    {/* Displays the component when lat and lng are non-null */}
                    {this.state.lat && this.state.lng ? <>
                        <div className=" d-flex justify-content-between">
                            <h6 className="hospnear">Hospitals Near You</h6>
                            <p className=" mr-1">See All</p>
                        </div>
                        <Col xs={12} id="searchresults">
                            <SearchResults updateParent={() => null}/>
                        </Col>
                    </> : <></>
                    }
                </Container>

            </React.Fragment>);
    }

}

export const Index = withRouter(IndexLoc);
