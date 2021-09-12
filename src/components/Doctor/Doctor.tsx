import {Doctor, DoctorObject, Marker, MarkerObject} from "../../api/model";
import {
    AiFillCheckCircle,
    AiFillCloseCircle,
    AiFillQuestionCircle,
    AiOutlineInfoCircle,
    BiPhoneOutgoing,
    GrLocation,
    IoPersonCircleSharp, MdAddAPhoto,
    MdRateReview,
    RiDirectionLine,
    RiShareLine
} from "react-icons/all";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import React from "react";

import {Container, Row} from "react-bootstrap";
import {StarRating} from "../cards/StarRating";
import {Popover} from "@material-ui/core";
import {CSSTransition} from "react-transition-group";
import {FullScreenReview} from "../FullScreen/FullScreenReview";
import Loader from "react-loader-spinner";
import {withRouter} from "react-router";

interface DetailsState extends AuthState {
    id: number,
    model: DoctorObject,
    ready: boolean,
    open_availability: HTMLElement | null,
    popovertext: string,
    show_review: boolean,


}

class DoctorLoc extends AuthComponent<AuthPropsLoc, DetailsState> {


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

    async refreshData() {
        this.setState({ready: false})
        //TODO: fix later
        // @ts-ignore
        let {docId} = this.props.match.params
        let doctor = await Doctor.get(docId) as DoctorObject

        this.setState({model: doctor, ready: true,id:docId})

    }

    async componentDidMount() {
        super.componentDidMount()
        await this.refreshData()
    }

    render() {
        let {model} = this.state
        let open = Boolean(this.state.open_availability);
        let currentLocation = this.props.location.pathname + this.props.location.search + this.props.location.hash

        return (
            this.state.ready ?
                <h1 className="my-5 py-5 ">{model.name}</h1>:
                <Container fluid={true} className="my-5 py-5 ">
                    <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
                </Container>


        );
    }

}


export const DoctorComponent = withRouter(DoctorLoc)