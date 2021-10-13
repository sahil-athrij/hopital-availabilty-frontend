import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";
import {IoCheckmarkCircleSharp, IoCloseCircleSharp} from "react-icons/all";
import React from "react";
import {Patient, PatientObject} from "../../api/model";
import {Container} from "react-bootstrap";
import Loader from "react-loader-spinner";

interface RequestDisplayProps extends AuthPropsLoc {
    request: PatientObject
}

class RequestDisplayLoc extends AuthComponent<RequestDisplayProps, AuthState> 
{

    render(): JSX.Element 
    {
        const {request} = this.props;
        return (
            <>
                <button onClick={() => 
                {
                    this.props.history.push(`/profile/request/${request.id}`);
                    this.props.history.push(`/profile/request/${request.id}`);
                    this.props.history.goBack();
                }}
                className={"neumorphic-input mt-3 w-100 btn text-left p-3 bg-white round-15 d-flex  flex-column"}>


                    <div>
                        <b>{request.Name}</b>
                    </div>
                    <div className="d-flex flex-row justify-content-between w-100">
                        <div className="d-flex flex-column">
                            <div><b>Symptoms:</b></div>
                            {request.symptoms.replace(/\n/g, ", ")}
                        </div>
                        <div className="d-flex flex-column">

                            <div><b>Conditions:</b></div>
                            <div>
                                Covid Negative : {request.covidresult ? <IoCloseCircleSharp className="text-danger"/> :
                                    <IoCheckmarkCircleSharp className="text-primary"/>}
                            </div>
                        </div>
                    </div>
                </button>
            </>
        );
    }
}


export const RequestDisplay = withRouter(RequestDisplayLoc);


interface RequestDetailsState extends AuthState {
    request?: PatientObject
}

class RequestDetailsLoc extends AuthComponent<AuthPropsLoc, RequestDetailsState> 
{

    async componentDidMount() 
    {
        super.componentDidMount();
        //TODO: Fix Later
        // @ts-ignore
        const {requestId} = this.props.match.params;
        const data = await Patient.get(requestId, {}, true);
        this.setState({request: data as PatientObject});
    }

    render() 
    {
        const {request} = this.state;
        return <>
            {request ?
                <Container className="pt-4 px-0 bg-grey min-vh-100">
                    <h4 className="mt-5 pt-4"><b>Request from {request.Name}</b></h4>

                    <div
                        className="bg-white d-flex flex-column neumorphic-input px-3 py-2 mt-3 text-left justify-content-between">
                        <h5><b>Details</b></h5>
                        <div className="d-flex flex-row py-1">
                            <div className="w-50">Patient Age : <b>{request.age}</b></div>
                            <div className="w-50"> Gender : <b>{request.gender_name}</b></div>
                        </div>
                        <div className="w-75 py-1">Address :
                            <div><b>{request.address}</b></div>
                        </div>
                        <div className="w-75 py-1">Symptoms :
                            <div><b>{request.symptoms.replace(/\n/g, ", ")}</b></div>
                        </div>
                        <div className="d-flex flex-row py-1">
                            <div className="w-50">
                                <div>Start Date :</div>
                                <b> {request.symdays.split("-").reverse().join("-")}</b>
                            </div>
                            <div className="w-50 align-items-start d-flex">
                                <div className="align-items-center d-flex">Covid Negative :
                                    {request.covidresult ? <IoCloseCircleSharp className="text-danger"/> :
                                        <IoCheckmarkCircleSharp className="text-primary"/>}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-row py-1">
                            <div className="w-50">
                                Oxygen Level :
                                <b>{request.spo2}</b>
                            </div>
                            <div className="w-50"> Patient is On Oxygen : {request.spo2 === 0 ?
                                <IoCloseCircleSharp className="text-danger"/> :
                                <IoCheckmarkCircleSharp className="text-primary"/>}</div>
                        </div>
                        <div className="d-flex flex-row py-1">
                            <div className="w-50">
                                <div>Bed Type Required :</div>
                                <b>{request.bedtype_name}</b>
                            </div>
                            <div className="w-50"> Blood Group : <b>{request.blood}</b></div>
                        </div>
                        <div className="d-flex flex-row py-1">
                            <div className="w-50">
                                <span>CT scan Done :</span>
                                <b>{request.ct ? "Yes" : "No"}</b>
                            </div>
                            <div className="w-50"> CT Score : <b>{request.ctscore}</b></div>
                        </div>
                    </div>
                </Container> :
                <Container fluid={true} className="my-5 py-5 ">
                    <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
                </Container>}
        </>;

    }
}

export const RequestDetails = withRouter(RequestDetailsLoc);
