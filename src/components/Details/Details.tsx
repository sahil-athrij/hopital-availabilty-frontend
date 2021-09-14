import {Marker, MarkerObject} from "../../api/model";
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

import './details.css'
import {Container, Row} from "react-bootstrap";
import {StarRating} from "../cards/StarRating";
import {Popover} from "@material-ui/core";
import {CSSTransition} from "react-transition-group";
import {FullScreenReview} from "../FullScreen/FullScreenReview";
import Loader from "react-loader-spinner";
import {withRouter} from "react-router";

import doctorsvg from '../../images/doctor.svg';
import layoutsvg from '../../images/layout.svg';
import reviewsvg from '../../images/review.svg';
import starsvg from '../../images/star.svg';

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
        let open = Boolean(this.state.open_availability);
        let currentLocation = this.props.location.pathname + this.props.location.search + this.props.location.hash

        console.log(model)
        return (
            this.state.ready ?
                <>
                    <div className="container-center-horizontal">
                        <div className="hospitalpagereviewsscreen">
                            <div className="overlap-group14">
                                <div
                                    className="overlap-group10"
                                    style={{backgroundImage: `url(${overlapGroup10})`}}
                                >
                                    <div className="flex-row">
                                        <Back/>
                                        <img className="image" src={image}/>
                                        <img className="icon" src={icon}/>
                                    </div>
                                    <div className="overlap-group13">
                                        <Group6916/>
                                        <div className="overlap-group11">
                                            <Group6907/>
                                            <Group6918/>
                                        </div>
                                        <Group6917/>
                                    </div>
                                    <div className="overlap-group2">
                                        <div className="overlap-group1">
                                            <img className="rectangle" src={rectangle}/>
                                            <div className="overlap-group">
                                                <img
                                                    className="vector"
                                                    src="hospital-page-doctors-vector-2.png"
                                                />
                                                <img className="vector-1" src={vector2}/>
                                                <img className="vector-2" src={vector3}/>
                                                <img className="vector-3" src={vector4}/>
                                                <div className="group">
                                                    <img className="vector-4" src={vector5}/>
                                                    <img className="vector-5" src={vector6}/>
                                                </div>
                                                <img className="vector-6" src={vector7}/>
                                                <img className="vector-7" src={vector8}/>
                                                <img className="vector-8" src={vector9}/>
                                                <img className="vector-9" src={vector10}/>
                                                <img className="vector-10" src={vector11}/>
                                                <img className="vector-11" src={vector12}/>
                                                <img className="vector-12" src={vector13}/>
                                                <img className="vector-13" src={vector14}/>
                                                <img className="vector-14" src={vector15}/>
                                                <img className="vector-15" src={vector16}/>
                                                <img className="vector-16" src={vector17}/>
                                                <img className="vector-17" src={vector18}/>
                                            </div>
                                            <img className="rectangle-1" src={rectangle2}/>
                                            <img className="rectangle-2" src={rectangle3}/>
                                        </div>
                                        <div className="patientsnunito-bold-lynch-12px">
                                            {patients}
                                        </div>
                                        <div
                                            className="text-1nunito-semi-bold-ebony-clay-17px"
                                        >
                                            {text18}
                                        </div>
                                        <div className="experiencenunito-bold-lynch-12px">
                                            {experience}
                                        </div>
                                        <div
                                            className="x10-yrsnunito-semi-bold-ebony-clay-16px"
                                        >
                                            {x10Yrs}
                                        </div>
                                        <Rectangle156/>
                                        <div className="ratingsnunito-bold-lynch-12px">
                                            {ratings}
                                        </div>
                                        <div
                                            className="text-2nunito-semi-bold-ebony-clay-17px"
                                        >
                                            {text19}
                                        </div>
                                        <img className="rating-1" src={rating1}/>
                                    </div>
                                    <div className="group-6915">
                                        <div className="overlap-group5">
                                            <div className="overlap-group2-1">
                                                <div className="overlap-group4">
                                                    <Quality
                                                        heading={qualityProps.heading}
                                                    />
                                                    <Message
                                                        chatMeUpSharePh={messageProps.chatMeUpSharePh}
                                                    />
                                                </div>
                                                <div className="flex-col">
                                                    <Group92
                                                        star6={group92Props.star6}
                                                        star7={group92Props.star7}
                                                        star8={group92Props.star8}
                                                        star9={group92Props.star9}
                                                        star10={group92Props.star10}
                                                    />
                                                    <Group92
                                                        star6={group922Props.star6}
                                                        star7={group922Props.star7}
                                                        star8={group922Props.star8}
                                                        star9={group922Props.star9}
                                                        star10={group922Props.star10}
                                                        className={group922Props.className}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="audio"
                                                style={{backgroundImage: `url(${audio})`}}
                                            >
                                                <div
                                                    className="icon-1"
                                                    style={{backgroundImage: `url(${icon2})`}}
                                                >
                                                    <img
                                                        className="affordable-1"
                                                        src={affordable1}
                                                    />
                                                </div>
                                                <div className="flex-col-1">
                                                    <div
                                                        className="audio-callnunito-bold-ebony-clay-16px"
                                                    >
                                                        {audioCall}
                                                    </div>
                                                    <div
                                                        className="call-your-doctor-dirnunito-bold-lynch-12px"
                                                    >
                                                        {callYourDoctorDir}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="overlap-group3">
                                            <Communication/>
                                            <Group6903
                                                messageProps={group6903Props.messageProps}
                                            />
                                            <Group6904/>
                                            <Group6905/>
                                        </div>
                                        <div
                                            className="headingnunito-semi-bold-ebony-clay-18px"
                                        >
                                            {heading}
                                        </div>
                                    </div>
                                    <Group6946/>
                                    <div className="overlap-group12">
                                        <div className="group-6955">
                                            <img className="round" src={round}/>
                                            <div className="overlap-group8">
                                                <Group6912/>
                                                <div className="overlap-group1-1">
                                                    <TextMessage/>
                                                    <div className="group-34">
                                                        <div
                                                            className="timenunito-normal-ghost-14px"
                                                        >
                                                            {time}
                                                        </div>
                                                        <div className="icon-outline-back">
                                                            <div className="overlap-group-1">
                                                                <img
                                                                    className="icon-outline-ba-background-mask"
                                                                    src={iconOutlineBackBackgroundMask}
                                                                />
                                                                <img
                                                                    className="arrow-chevronleft"
                                                                    src={arrowChevron_Left}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="linegp">
                                            <div
                                                className="message"
                                                style={{backgroundImage: `url(${message})`}}
                                            >
                                                <div className="overlap-group-2">
                                                    <img
                                                        className="oxygen-mask-1"
                                                        src={oxygenMask1}
                                                    />
                                                    <img
                                                        className="rectangle-3"
                                                        src={rectangle4}
                                                    />
                                                </div>
                                                <div className="overlap-group1-2">
                                                    <div
                                                        className="availablenunito-bold-lynch-12px"
                                                    >
                                                        {available}
                                                    </div>
                                                    <div className="group-6956">
                                                        <div
                                                            className="messagingnunito-bold-ebony-clay-14px"
                                                        >
                                                            {messaging}
                                                        </div>
                                                        <div
                                                            className="tick-icon"
                                                            style={{backgroundImage: `url(${tickIcon})`}}
                                                        >
                                                            <img
                                                                className="tick-icon-1"
                                                                src={tickIcon2}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="star">
                                                <div
                                                    className="text-6nunito-normal-pale-sky-12px"
                                                >
                                                    {text23}
                                                </div>
                                                <Group6921
                                                    icon={group6921Props.icon}
                                                    icon2={group6921Props.icon2}
                                                    icon3={group6921Props.icon3}
                                                    icon4={group6921Props.icon4}
                                                    icon5={group6921Props.icon5}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="group-6950">
                                        <div
                                            className="message-1"
                                            style={{backgroundImage: `url(${message2})`}}
                                        >
                                            <div
                                                className="icon-2"
                                                style={{backgroundImage: `url(${icon3})`}}
                                            >
                                                <img
                                                    className="intensivist-1"
                                                    src={intensivist1}
                                                />
                                            </div>
                                            <div className="group-6926">
                                                <div
                                                    className="messaging-1nunito-bold-ebony-clay-14px"
                                                >
                                                    {messaging2}
                                                </div>
                                                <div className="group-6957">
                                                    <div
                                                        className="chat-me-up-share-phnunito-bold-lynch-12px"
                                                    >
                                                        {chatMeUpSharePh}
                                                    </div>
                                                    <div
                                                        className="overlap-group1-3"
                                                        style={{backgroundImage: `url(${overlapGroup1})`}}
                                                    >
                                                        <div
                                                            className="x"
                                                            style={{backgroundImage: `url(${x})`}}
                                                        >
                                                            <div
                                                                className="overlap-group-3"
                                                                style={{backgroundImage: `url(${overlapGroup})`}}
                                                            >
                                                                <img
                                                                    className="vector-18"
                                                                    src={vector19}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group-6925">
                                            <div className="text-7">
                                                {text24}
                                            </div>
                                            <Group6921
                                                icon={group69212Props.icon}
                                                icon2={group69212Props.icon2}
                                                icon3={group69212Props.icon3}
                                                icon4={group69212Props.icon4}
                                                icon5={group69212Props.icon5}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="message-2"
                                        style={{backgroundImage: `url(${message3})`}}
                                    >
                                        <Icon2
                                            icon={icon2Props.icon}
                                            ventilator1={icon2Props.ventilator1}
                                        />
                                        <div className="overlap-group2-2">
                                            <div className="overlap-group1-4">
                                                <div
                                                    className="tick-icon-2"
                                                    style={{backgroundImage: `url(${tickIcon3})`}}
                                                ></div>
                                                <div
                                                    className="chat-me-up-share-ph-1nunito-bold-lynch-12px"
                                                >
                                                    {chatMeUpSharePh2}
                                                </div>
                                                <div
                                                    className="help-circle"
                                                    style={{backgroundImage: `url(${helpCircle})`}}
                                                >
                                                    <div
                                                        className="overlap-group-4"
                                                        style={{backgroundImage: `url(${overlapGroup2})`}}
                                                    >
                                                        <img
                                                            className="vector-19"
                                                            src={vector20}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="messaging-2nunito-bold-ebony-clay-14px"
                                            >
                                                {messaging3}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="group-6952">
                                        <div
                                            className="message-3"
                                            style={{backgroundImage: `url(${message4})`}}
                                        >
                                            <Icon2
                                                icon={icon22Props.icon}
                                                ventilator1={icon22Props.ventilator1}
                                                className={icon22Props.className}
                                            />
                                            <div
                                                className="messaging-3nunito-bold-ebony-clay-14px"
                                            >
                                                {messaging4}
                                            </div>
                                        </div>
                                        <Group6927
                                            group6921Props={group6927Props.group6921Props}
                                        />
                                    </div>
                                    <div className="group-6953">
                                        <div
                                            className="message-4"
                                            style={{backgroundImage: `url(${message5})`}}
                                        >
                                            <Icon2
                                                icon={icon23Props.icon}
                                                ventilator1={icon23Props.ventilator1}
                                                className={icon23Props.className}
                                            />
                                            <div
                                                className="messaging-4nunito-bold-ebony-clay-14px"
                                            >
                                                {messaging5}
                                            </div>
                                        </div>
                                        <Group6927
                                            className={group69272Props.className}
                                            group6921Props={group69272Props.group6921Props}
                                        />
                                    </div>
                                    <Group6946
                                        className={group6946Props.className}
                                    />
                                </div>
                                <img className="bg" src={bg}/>
                                <div className="dr-bellamy-nicholas">
                                    {drBellamyNicholas}
                                </div>
                                <About2 icon={about2Props.icon}/>
                                <img className="line-break" src={lineBreak}/>
                                <img className="line-break-1" src={lineBreak2}/>
                                <img className="line-break-2" src={lineBreak3}/>
                                <Button/>
                            </div>
                        </div>
                    </div>
                </> :
                <Container fluid={true} className="my-5 py-5 ">
                    <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
                </Container>


        );
    }

}

class Back extends React.Component {
    render() {
        return (
            <div className="back">
                <img
                    className="icon-3"
                    src="hospital-page-doctors-icon.png"
                />
            </div>
        );
    }
}


class Group6916 extends React.Component {
    render() {
        return (
            <div className="group-6916">
                <div className="group-6841">
                    <TurnRight />
                </div>
                <div className="x1000nunito-semi-bold-ebony-clay-17px">
                    Phone
                </div>
            </div>
        );
    }
}


class TurnRight extends React.Component {
    render() {
        return (
            <div className="turnright">
                <div className="turn-right"></div>
            </div>
        );
    }
}


class Group6907 extends React.Component {
    render() {
        return (
            <div className="group-6907">
                <div className="map-pin">
                    <div className="overlap-group-5">
                        <img
                            className="vector-20"
                            src="vector-1.png"
                        />
                    </div>
                </div>
                <div className="viralogistnunito-semi-bold-lynch-14px">
                    Kakkanad,Pallinada, Kannayanur,Kerala
                </div>
            </div>
        );
    }
}


class Group6918 extends React.Component {
    render() {
        return (
            <div className="group-6918">
                <Group6906 />
                <div className="x45nunito-semi-bold-ebony-clay-17px">
                    Share
                </div>
            </div>
        );
    }
}


class Group6906 extends React.Component {
    render() {
        return (
            <div className="group-6906">
                <div className="share-2">
                    <div className="overlap-group-6">
                        <img
                            className="vector-21"
                            src="hospital-page-doctors-vector-21.png"
                        />
                        <img
                            className="vector-22"
                            src="hospital-page-doctors-vector-21.png"
                        />
                        <img
                            className="vector-23"
                            src="hospital-page-doctors-vector-21.png"
                        />
                        <img
                            className="vector-24"
                            src="hospital-page-vector-4.png"
                        />
                        <img
                            className="vector-25"
                            src="hospital-page-vector-5.png"
                        />
                    </div>
                </div>
            </div>
        );
    }
}


class Group6917 extends React.Component {
    render() {
        return (
            <div className="group-6917">
                <div className="group-6839">
                    <div className="overlap-group-7">
                        <img
                            className="vector-26"
                            src="vector-26.png"
                        />
                    </div>
                </div>
                <div
                    className="x10-yrs-1nunito-semi-bold-ebony-clay-16px"
                >
                    Route Map
                </div>
            </div>
        );
    }
}


class Rectangle156 extends React.Component {
    render() {
        return (
            <div className="rectangle-156">
                <img
                    className="rectangle-156-1"
                    src="hospital-page-doctors-rectangle-156.png"
                />
            </div>
        );
    }
}


class Quality extends React.Component {
    render() {
        const { heading } = this.props;

        return (
            <div className="quality">
                <div
                    className="heading-1nunito-semi-bold-ebony-clay-18px"
                >
                    {heading}
                </div>
            </div>
        );
    }
}


class Message extends React.Component {
    render() {
        const { chatMeUpSharePh, className } = this.props;

        return (
            <div className={`message-5 ${className || ""}`}>
                <div className="overlap-group-8">
                    <img
                        className="oxygen-mask-1-1"
                        src="hospital-page-oxygen-mask-1.png"
                    />
                </div>
                <div className="flex-col-2">
                    <div className="messaging-5nunito-bold-ebony-clay-16px">
                        Oxygen
                    </div>
                    <div
                        className="chat-me-up-share-ph-2nunito-bold-lynch-12px"
                    >
                        {chatMeUpSharePh}
                    </div>
                </div>
            </div>
        );
    }
}


class Group92 extends React.Component {
    render() {
        const { star6, star7, star8, star9, star10, className } = this.props;

        return (
            <div className={`group-92 ${className || ""}`}>
                <img className="star-6" src={star6} />
                <img className="star-1" src={star7} />
                <img className="star-1" src={star8} />
                <img className="star-9" src={star9} />
                <img className="star-1" src={star10} />
            </div>
        );
    }
}


class Communication extends React.Component {
    render() {
        return (
            <div className="communication">
                <div
                    className="availabilitynunito-semi-bold-ebony-clay-18px"
                >
                    Infrastructure Availability
                </div>
            </div>
        );
    }
}


class Group6903 extends React.Component {
    render() {
        const { messageProps } = this.props;

        return (
            <div className="group-6903">
                <Message
                    chatMeUpSharePh={messageProps.chatMeUpSharePh}
                    className={messageProps.className}
                />
                <div className="percentnunito-bold-ebony-clay-18px">
                    0%
                </div>
            </div>
        );
    }
}


class Group6904 extends React.Component {
    render() {
        return (
            <div className="group-6904">
                <div className="audio-1">
                    <div className="overlap-group1-5">
                        <div className="chart-heartbeat">
                            <div className="overlap-group-9">
                                <img
                                    className="vector-27"
                                    src="vector-20.png"
                                />
                                <img
                                    className="vector-28"
                                    src="vector-21.png"
                                />
                                <img
                                    className="vector-29"
                                    src="hospital-page-vector-8.png"
                                />
                                <img
                                    className="vector-30"
                                    src="hospital-page-vector-9.png"
                                />
                                <img
                                    className="vector-31"
                                    src="hospital-page-vector-10.png"
                                />
                                <img
                                    className="vector-32"
                                    src="vector-25.png"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-col-3">
                        <div
                            className="audio-call-1nunito-bold-ebony-clay-16px"
                        >
                            ICU
                        </div>
                        <div
                            className="call-your-doctor-dir-1nunito-bold-lynch-12px"
                        >
                            Availability&nbsp;&nbsp;0%.
                        </div>
                    </div>
                </div>
                <div className="percent-1nunito-bold-ebony-clay-18px">
                    0%
                </div>
            </div>
        );
    }
}


class Group6905 extends React.Component {
    render() {
        return (
            <div className="group-6905">
                <div className="video-call">
                    <div className="overlap-group-10">
                        <img
                            className="ventilator-1"
                            src="hospital-page-ventilator-1.png"
                        />
                    </div>
                    <div className="flex-col-4">
                        <div
                            className="descriptionnunito-bold-ebony-clay-16px"
                        >
                            Ventilator
                        </div>
                        <div className="description-1nunito-bold-lynch-12px">
                            Availability 0%.
                        </div>
                    </div>
                </div>
                <div className="percent-2nunito-bold-ebony-clay-18px">
                    0%
                </div>
            </div>
        );
    }
}


class Group6946 extends React.Component {
    render() {
        const { className } = this.props;

        return (
            <div className={`group-6946 ${className || ""}`}>
                <img
                    className="round-1"
                    src="round-1.png"
                />
                <div className="overlap-group-11">
                    <Group6912 />
                    <div className="overlap-group1-6">
                        <TextMessage />
                        <div className="group-34-1">
                            <div className="time-1nunito-normal-ghost-14px">
                                11-09-2021
                            </div>
                            <div className="icon-outline-back-1">
                                <div className="overlap-group-12">
                                    <img
                                        className="icon-outline-ba-background-mask-1"
                                        src="icon-outline-back-backgroundmask.png"
                                    />
                                    <img
                                        className="arrow-chevronleft-1"
                                        src="arrow-chevronleft-1.png"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class Group6912 extends React.Component {
    render() {
        return (
            <div className="group-6912">
                <div className="textnunito-normal-pale-sky-14px">
                    4.5
                </div>
                <img
                    className="icon-4"
                    src="hospital-page-icon-4.png"
                />
            </div>
        );
    }
}


class TextMessage extends React.Component {
    render() {
        return (
            <div className="text-message">
                <div className="titlenunito-semi-bold-mine-shaft-16px">
                    Roger Hulg
                </div>
            </div>
        );
    }
}


class Group6921 extends React.Component {
    render() {
        const { icon, icon2, icon3, icon4, icon5, className } = this.props;

        return (
            <div className={`group-6921-2 ${className || ""}`}>
                <img className="icon-5" src={icon} />
                <img className="icon-6" src={icon2} />
                <img className="icon-7" src={icon3} />
                <img className="icon-6" src={icon4} />
                <img className="icon-7" src={icon5} />
            </div>
        );
    }
}


class Icon2 extends React.Component {
    render() {
        const { icon, ventilator1, className } = this.props;

        return (
            <div
                className={`icon-9 ${className || ""}`}
                style={{ backgroundImage: `url(${icon})` }}
            >
                <img className="ventilator-1-1" src={ventilator1} />
            </div>
        );
    }
}


class Group6927 extends React.Component {
    render() {
        const { className, group6921Props } = this.props;

        return (
            <div className={`group-6927 ${className || ""}`}>
                <div className="text-3nunito-normal-pale-sky-12px">
                    4.5
                </div>
                <Group6921
                    icon={group6921Props.icon}
                    icon2={group6921Props.icon2}
                    icon3={group6921Props.icon3}
                    icon4={group6921Props.icon4}
                    icon5={group6921Props.icon5}
                    className={group6921Props.className}
                />
            </div>
        );
    }
}


class About2 extends React.Component {
    render() {
        const { icon } = this.props;

        return (
            <div className="about">
                <div className="flex-row-1nunito-semi-bold-ebony-clay-18px">
                    <div className="about-1">
                        About
                    </div>
                    <div className="about-2">
                        4.5
                    </div>
                    <img className="icon-10" src={icon} />
                </div>
                <p className="hospitalnamenunito-bold-lynch-14px">
                    One of the leading Multi-Specialty Hospitals in Ernakulam with 3- Decades of service excellence&amp; with 300
                    beds and a full complement of specialist doctors
                </p>
            </div>
        );
    }
}


class Button extends React.Component {
    render() {
        return (
            <div className="button">
                <div className="overlap-group9">
                    <div className="button-1nunito-bold-white-16px">
                        Write a Review
                    </div>
                </div>
            </div>
        );
    }
}


export const Details = withRouter(DetailsLoc)