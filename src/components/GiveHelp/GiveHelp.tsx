import {Patient, PatientObject} from "../../api/model";
import {AuthComponent, AuthState} from "../../api/auth";
import {RouteComponentProps, withRouter} from "react-router";
import {ResponsiveProps} from "../ResponsiveComponent";
import * as React from "react";
import close from "../../images/close.svg";
import Button from "@mui/material/Button";
import {Container} from "@mui/material";
import "./GiveHelp.css";
import Maleicon from "../../images/male.svg";
import Femaleicon from "../../images/female.svg";
import CovidPos from "../../images/corpos.svg";
import CovidNeg from "../../images/corneg.svg";
import Bloodgrp from "../../images/bloodgroup.svg";
import TransGen from "../../images/TransGend.svg";
import PrefNSay from "../../images/genderless.svg";


interface PatientState extends AuthState {
    models: PatientObject[];


}


export type AuthPropsLoc = RouteComponentProps<ResponsiveProps>

export class GiveHelp extends AuthComponent<AuthPropsLoc, PatientState> 
{

    constructor(props: AuthPropsLoc) 
    {
        super(props);
        this.state = {
            ...this.state,


        };


    }

    componentDidMount() 
    {

        Patient.action_general("all", {}, true).then((patients) => 
        {
            const results = patients.results;
            this.setState({models: results});
        });
        console.log(this.state.models);
    }

    getgender = (gender: string) => 
    {
        if (gender === "M") 
        
            return (
                <img src={Maleicon}  alt=""/>);
        
        else if (gender === "F") 
        
            return (
                <img src={Femaleicon}  alt=""/>
            );
        
        else if (gender === "NB") 
        
            return (
                <img src={TransGen}  alt=""/>
            );
        
        else if (gender === "NP") 
        
            return (
                <img src={PrefNSay}  alt=""/>
            );
        

    };


    // savePatient = async () => {
    //     console.log(this.state)
    //     const toSend = this.state;
    //
    //     toSend.user = null;
    //
    //
    //     if (this.state.Name && this.state.gender && this.state.symptoms)
    //         Patient.create({...toSend,})
    //             .then(() => {
    //                 this.props.history.push(`/`)
    //                 toast.success('Successfully added your details', {
    //                     position: 'bottom-center'
    //                 })
    //             }).catch((error) => {
    //             toast.error(error.details, {
    //                 position: 'bottom-center'
    //             })
    //         })
    //     else
    //         toast.error("please enter the required details", {
    //             position: 'bottom-center'
    //         })
    // }


    render() 
    {
        if (!this.state.auth) 
        {
            this.performAuth();
            return (<></>);
        }
        else 
        {
            console.log(this.state);
            return (
                <div className="mb-3">

                    <Container className=" tophead d-flex justify-content-between p-3  ">
                        <img src={close} onClick={() => this.props.history.goBack()} alt={"close"}/>
                        <p className="align-self-center m-0 p-0 text-left flex-grow-1 pl-4"><b>Give Help</b>
                        </p>
                        <Button className="sub"
                            variant="contained">Submit</Button>

                    </Container>

                    <Container className="maincont">
                        {this.state.models ? (this.state.models.map((obj) => (
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
                                                textTransform: "none",
                                                paddingX: "1.25rem",
                                                paddingY: ".25rem", marginTop:".5rem"
                                            }} className="helpbutn"
                                            variant="contained">Help</Button>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        ))) : null}


                    </Container>

                </div>


            );
        }
    }
}


export const Givehelp = withRouter(GiveHelp);
