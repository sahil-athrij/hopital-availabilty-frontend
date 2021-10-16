import React from "react";
import { Col, Container} from "react-bootstrap";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";

import "./index.css";
import {getParam} from "../../api/QueryCreator";

import {SearchResults} from "../cards/SearchResultCard";
import Homecover from "../../images/Needmedihome.svg";
import {Link} from "react-router-dom";
import Righticon from "../../images/righticon.svg";
import Addhosp from "../../images/addhospcard.svg";
import Givehelp from "../../images/givehelpcard.svg";
import Searchhosp from "../../images/searchhospcard.svg";
import Medicine from "../../images/Medicine.svg";
import Doc from "../../images/Doc.svg";
import Ambulanceimg from "../../images/ambulanceimg.svg";

interface IndexState extends AuthState {
    display: boolean
    lat?: string,
    lng?: string,
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
            lat, lng
        };
    }

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
                <div className="usertext text-left mb-2">
                    {this.state.user?.firstname ? `Welcome, ${this.state.user.firstname}` : "Welcome"}
                </div>
                <Container className="">
                    <img className="needmedi" src={Homecover} alt=""/>
                    <Link to="/addRequest">
                        <div className="helpbar">
                            <div className="rigtharrow"><img className="iconimg" src={Righticon} alt=""/></div>
                            <h5 className="problem">Any problems?</h5>

                            <h6 className="probsec">Request Medical help here</h6>
                        </div>
                    </Link>
                </Container>
                <Container className="w-100">
                    <div className="servicehead text-left d-flex justify-content-between mb-3">
                        Services
                    </div>
                    <div className="container d-flex justify-content-between  p-0 align-self-center">
                        <div className="homecard">
                            <img src={Addhosp}  alt=""/>
                            <div className="cardtxt ">Add Hospital</div>
                        </div>
                        <div className="homecard">
                            <img src={Givehelp}  alt=""/>
                            <div className="cardtxt ">Give help</div>
                        </div>
                        <div className="homecard">
                            <img src={Searchhosp}  alt=""/>
                            <div className="cardtxt m-0">Search Hospitals</div>
                        </div>
                    </div>
                    <div className="container d-flex justify-content-between my-2 p-0 align-self-center">

                        <div className="homecard d-flex flex-column ">
                            <img src={Ambulanceimg} alt=""/>
                            <div className="cardtxt ">Ambulance</div>
                        </div>
                        <div className="homecard">
                            <img src={Medicine}  alt=""/>
                            <div className="cardtxt ">Medicine</div>
                        </div>
                        <div className="homecard">
                            <img src={Doc}  alt=""/>
                            <div className="cardtxt m-0">Doctor</div>
                        </div>
                    </div>
                </Container>

                <Container className="mb-5 pb-3 pt-3 text-left">
                    {/* Displays the component when lat and lng are non-null */}
                    {this.state.lat && this.state.lng ? <>
                        <div className=" d-flex justify-content-between">
                            <h6 className="hospnear">Hospitals Near You</h6>
                            <p className=" mr-1">See All</p>
                        </div>
                        <Col xs={12} id="searchresults">
                            <SearchResults updateParent={() =>null                  }/>
                        </Col>
                    </> : <></>
                    }
                </Container>

            </React.Fragment>);
    }

}

export const Index = withRouter(IndexLoc);
