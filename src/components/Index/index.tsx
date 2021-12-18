import React from "react";
import { Container} from "@mui/material";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";

import "./index.css";
import {getParam} from "../../api/QueryCreator";

import {SearchResults} from "../cards/SearchResultCard";
import Homecover from "../../images/illustration.png";
import {NineCards} from "../Utils";




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
                <Container  className="mt-2 p-5 ">
                </Container>
                <Container className="text-left px-0">
                    <div style={{
                        backgroundColor: "#3E64FF",
                        borderRadius: "1.25rem",
                        boxShadow: "0px 25px 58px rgba(62, 100, 255, 0.3)",
                        minHeight: "150px",
                        overflow: "hidden"
                    }} className="card text-white mx-2">
                        <div className="d-flex align-items-start flex-column" style={{zIndex: 2, position: "absolute"}}>
                            <h1 className="text-white mx-4 mt-4"><b>NeedMedi</b></h1>
                            <h1 className="text-white mx-4"><b>is for all</b></h1>
                            <h6 className="text-white mx-4 my-0"><b>Your complete partner in</b></h6>
                            <h6 className="text-white mx-4 my-0"><b>terms of medical help</b></h6>
                        </div>
                        <img style={{borderRadius: "1.25rem", marginLeft:"auto", width: "50%", minHeight: "150px"}} className="pt-4 mb-0" src={Homecover} alt="home"/>
                    </div>
                    {/*<Link style={{textDecoration: "none"}} to="/addRequest">*/}
                    {/*    <div className="helpbar">*/}
                    {/*        <div className="rigtharrow"><img className="iconimg" src={Righticon} alt=""/></div>*/}
                    {/*        <h5 className="problem">Any problems?</h5>*/}

                    {/*        <h6 className="probsec">Request Medical help here</h6>*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                </Container>

                <div className="servicehead text-left d-flex justify-content-between mb-4">
                       Health Care Services
                </div>
                <NineCards/>

                <Container className="mb-5 pb-3 pt-3 text-left">
                    {/* Displays the component when lat and lng are non-null */}
                    {this.state.lat && this.state.lng ? <>
                        <div className=" d-flex justify-content-between">
                            <h6 className="hospnear">Hospitals Near You</h6>
                            <p className=" mr-1">See All</p>
                        </div>
                        <div className="col col-xs-12" id="searchresults">
                            <SearchResults updateParent={() => null}/>
                        </div>
                    </> : <></>
                    }
                </Container>

            </React.Fragment>);
    }

}

export const Index = withRouter(IndexLoc);
