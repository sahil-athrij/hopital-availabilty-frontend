import React from "react";
import {Col, Container} from "react-bootstrap";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";

import './index.css'
import SwipeableTextMobileStepper from "./Banners";
import {getParam} from "../../api/QueryCreator";

import {SearchResults} from "../cards/SearchResultCard";
import Homecover from "../../images/Needmedihome.svg"
import {Link} from 'react-router-dom';
import Righticon from "../../images/righticon.svg"
import Addhosp from "../../images/addhospcard.svg"
import Givehelp from "../../images/givehelpcard.svg"
import Searchhosp from "../../images/searchhospcard.svg"

interface IndexState extends AuthState {
    display: boolean
    lat?: string,
    lng?: string,
}

/**
 * @extends  AuthComponent<AuthPropsLoc, IndexState>
 */

class IndexLoc extends AuthComponent<AuthPropsLoc, IndexState> {

    constructor(props: AuthPropsLoc) {
        super(props);
        let lat = getParam('lat',) // Obtain value Of lat stored in local storage during previous query
        let lng = getParam('lng',)
        this.state = {
            ...this.state,
            display: true,
            lat, lng
        }
    }

    /**
     * Descibes the Index page including swipable carousels
     * @returns { JSX.Element } index Component
     */

    render() {

        return (
            <React.Fragment>
                <Container fluid={true} className="mt-4 p-5 ">
                </Container>
                <div className="usertext text-left mt-1">
                    {this.state.user?.username ? `Welcome, ${this.state.user.username}` : "Welcome"}
                </div>
                <Container className="text-left">
                    <img className="needmedi" src={Homecover}/>
                    <Link to="/profile/addRequest">
                        <div className="helpbar">
                            <div className="rigtharrow"><img className="iconimg" src={Righticon}/></div>
                            <h5 className="problem">Any problems?</h5>

                            <h6 className="probsec">Request Medical help here</h6>
                        </div>
                    </Link>
                </Container>
                <Container className="w-100">
                    <div className="servicehead text-left">
                        Services
                    </div>
                    <div className="ml-2 container d-flex justify-content-between">

                        <div className="homecard">
                            <img src={Addhosp}/>
                        </div>
                        <div className="homecard">
                            <img src={Givehelp}/>
                        </div>
                        <div className="homecard">
                            <img src={Searchhosp}/>
                        </div>


                    </div>
                </Container>

                <Container className="mb-5 pt-3 text-left">
                    {/* Displays the component when lat and lng are non-null */}
                    {this.state.lat && this.state.lng ? <>
                        <div className=" d-flex justify-content-between">
                        <h6 className="hospnear">Hospitals Near You</h6>
                         <p className=" mr-1">See All</p>
                        </div>
                        <Col xs={12} id="searchresults">
                            <SearchResults updateParent={() => {
                            }}/>
                        </Col>
                    </> : <></>
                    }
                </Container>

            </React.Fragment>)
    }

}

export const Index = withRouter(IndexLoc);