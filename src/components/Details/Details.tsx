import {Marker, MarkerObject} from "../../api/model";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import React from "react";

import './details.css'
import {Container} from "react-bootstrap";
import Loader from "react-loader-spinner";
import {withRouter} from "react-router";

import doctorsvg from '../../images/doctor.svg';
import layoutsvg from '../../images/layout.svg';
import reviewsvg from '../../images/review.svg';
import starsvg from '../../images/star.svg';

import image from "./icons/image@2x.png"
import icon from "./icons/icon-1@2x.png"
import icon2 from "./icons/icon@2x.png"
import vector4 from "./icons/shareicon.svg"
import vector26 from "./icons/vector-26@2x.png"
import map_pin from "./icons/map-pin.svg"

import  { DepartmentCards } from "./DepatrmentCards"
import {DoctorCards} from "./DoctorCards";


interface DetailsState extends AuthState {
    id: number,
    model: MarkerObject,
    ready: boolean,
    open_availability: HTMLElement | null,
    popovertext: string,
    show_review: boolean,
}


class DetailsLoc extends AuthComponent<AuthPropsLoc, DetailsState> {


    constructor(props: AuthPropsLoc) {
        super(props);
        this.state = {
            ...this.state,
            id: 0,
            ready: false,
            open_availability: null,
            popovertext: 'Percentage Probability of Availing the services',
            show_review: false
        }
    }


    hashChange = () => {
        if (!this.props.location.hash.includes('review')) {
            this.setState({show_review: false})
        } else {
            this.setState({show_review: true})
        }
    }

    async refreshReviews() {
        this.setState({ready: false})
        //TODO: fix later
        // @ts-ignore
        let {hspId} = this.props.match.params
        let marker = await Marker.get(hspId) as MarkerObject

        this.setState({model: marker, ready: true, id: hspId})

    }

    async componentDidMount() {
        super.componentDidMount()
        await this.refreshReviews()
    }

    handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        this.setState({open_availability: event.currentTarget});
    };
    handleClose = () => {
        this.setState({open_availability: null});
    };

    handlePhotoUpload = () => {
        this.props.history.push(`/addHospital/photo/${this.state.id}`)

    }

    render() {
        let {model} = this.state

        console.log(model)
        return (
            this.state.ready ?
                <>
                    <div className="container-center-horizontal">
                        <div className="hospitalpagereviewsscreen">
                            <div className="overlap-group14">
                                <div
                                    className="overlap-group10"

                                >
                                    <div className="w-100 flex-row container pt-5">
                                        <div className="w-100 d-flex flex-row justify-content-between">
                                            <img alt={""}
                                                 className="details-icon"
                                                 src={icon2}
                                            />
                                            <img alt={""} className="details-icon" src={icon}/>
                                        </div>

                                        <img alt={""} className="details-image m-0" src={image}/>
                                    </div>

                                    <div className="details-name p-1">
                                        Ernakulam Medical Centre
                                    </div>
                                    <div className="overlap-group13 justify-content-center d-flex flex-column">
                                        <Group6907 />

                                        <div className="w-100 d-flex justify-content-around">
                                            <Group6916/>
                                            <Group6918/>
                                            <Group6917/>
                                        </div>

                                    </div>
                                    <div className="hosp-about">
                                        <div className="w-100 d-flex flex-row justify-content-between nunito-semi-bold-ebony-clay-18px">
                                            <div className="about-1">
                                                About
                                            </div>
                                            <div className="doctor-about-2">
                                                4.5
                                                <img alt={""} className="staricon" src={starsvg} />
                                            </div>

                                        </div>
                                        <p className="hospitalname text-justify nunito-bold-lynch-14px">
                                            One of the leading Multi-Specialty Hospitals in Ernakulam with 3- Decades of service excellence&amp; with 300
                                            beds and a full complement of specialist doctors
                                        </p>
                                    </div>
                                    <div className="container d-flex justify-content-between">

                                        <div className="card-about card-1">
                                            <img src={doctorsvg} alt={"doctor svg"} />
                                            <p className="m-0"><b>1000+</b><br/>Doctors</p>
                                        </div>

                                        <div className="card-about card-1">
                                            <img src={layoutsvg} alt={"layout svg"} />
                                            <p className="m-0"><b>good</b><br/>Layout</p>
                                        </div>

                                        <div className="card-about card-1">
                                            <img src={reviewsvg} alt={"review svg"} />
                                            <p className="m-0"><b>4.5<br/></b>Ratings<br/>&amp; Reviews</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DoctorCards models={model.doctors} />
                </> :
                <Container fluid={true} className="my-5 py-5 ">
                    <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
                </Container>


        );
    }

}

class Group6916 extends React.Component {
    render() {
        return (
            <div className="d-flex flex-column align-items-center">
                <div className="group-6841">
                    <div className="turnright">
                        <div className="turn-right"/>
                    </div>
                </div>
                <div className="x1000  nunito-semi-bold-ebony-clay-17px">
                    Phone
                </div>
            </div>
        );
    }
}

class Group6907 extends React.Component {
    render() {
        return (
            <div className="w-100 d-flex flex-row justify-content-center">
                <div className="map-pin">
                    <div className="overlap-group-5">
                        <img alt={""}
                             className="vector-20"
                             src={map_pin}
                        />
                    </div>
                </div>
                <div className="details-place">
                    Kakkanad,Pallinada, Kannayanur,Kerala
                </div>
            </div>
        );
    }
}


class Group6918 extends React.Component {
    render() {
        return (
            <div className="d-flex flex-column align-items-center">
                <Group6906/>
                <div className="  nunito-semi-bold-ebony-clay-17px">
                    Share
                </div>
            </div>
        );
    }
}


class Group6906 extends React.Component {
    render() {
        return (
            <div className="group-6839">

                    <div className="overlap-group-7">

                        <img alt={""}
                             className="vector-24"
                             src={vector4}
                        />

                    </div>
                </div>
        );
    }
}


class Group6917 extends React.Component {
    render() {
        return (
            <div className="d-flex flex-column align-items-center">
                <div className="group-6839">
                    <div className="overlap-group-7">
                        <img alt={""}
                             className="vector-26"
                             src={vector26}
                        />
                    </div>
                </div>
                <div
                    className="x10-yrs-1  nunito-semi-bold-ebony-clay-16px"
                >
                    Route Map
                </div>
            </div>
        );
    }
}


export const Details = withRouter(DetailsLoc);