import {Marker, MarkerObject} from "../../api/model";
import {
    AiFillCheckCircle,
    AiFillCloseCircle,
    AiFillQuestionCircle,
    AiOutlineInfoCircle,
    BiPhoneOutgoing, FiCameraOff,
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

        this.setState({model: marker, ready: true,id:hspId})

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

    handlePhotoUpload=()=>{
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
                    {model.images && model.images[0] ?
                        <div className="backgroundRow  w-100" style={{
                            backgroundImage: `url(${model.images[0].image})`
                        }}/>
                        :
                        <div className="backgroundRow d-flex align-items-center justify-content-center w-100">

                            <MdAddAPhoto className="text-secondary" size={40}/>
                        </div>}

                    <Container fluid={true} className="d-flex flex-column py-5  px-0 ">
 {model.images && model.images[0]?
                        <div className="w-100 card-spacer "/>:
                        <div className="w-100 card-spacer " onClick={this.handlePhotoUpload}/>}
                        <div className="top-rounded bg-white text-left neumorphic-card ">
                            <div className="px-3 pt-3 py-1 border-bottom">
                                <h5>{model.name}</h5>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <div>


                                        <StarRating rating={model.care_rating}/>
                                        <span className="hospital-phone">
                                            {model.Phone !== '0000000000' && model.Phone}
                                        </span>
                                    </div>
                                    <button onClick={() => {
                                        if (this.state.auth) {
                                            this.props.history.push(currentLocation + "#review")
                                            this.setState({show_review: !this.state.show_review})
                                        } else {
                                            this.performAuth()
                                        }
                                    }}
                                            className="d-flex align-items-center mt-2 py-0 btn btn-light  bg-white rounder thin-border">
                                        <MdRateReview className="text-dark"/>
                                        <div className="p-1 px-2">write a review</div>
                                    </button>
                                </div>

                            </div>

                            <Row className="d-flex w-100 align-items-center justify-content-even flex-row
                               m-0 pb-3 mt-3 thick-border-bottom">
                                {model.Phone !== '0000000000' &&
                                <div
                                    className="d-flex justify-content-end phone-button button-container align-items-center flex-column"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        document.location.href = 'tel:' + model.Phone;

                                    }}>

                                    <button className="button-holder text-center">
                                        <BiPhoneOutgoing size={20} className="text-primary"/>
                                    </button>
                                    Phone
                                </div>}
                                <div
                                    className="d-flex justify-content-end button-container phone-button align-items-center flex-column"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        const win = window.open(`https://www.google.com/maps/search/${model.name}/@${model.lat},${model.lng},19.88z`, "_blank");
                                        if (win) {
                                            win.focus();
                                        }
                                    }}>

                                    <button className="button-holder text-center">
                                        <RiDirectionLine size={20} className="text-primary"/>
                                    </button>
                                    Route Map
                                </div>
                                <div
                                    className="d-flex justify-content-end button-container phone-button align-items-center flex-column"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        if (navigator.share) {
                                            navigator.share({
                                                title: model.name,
                                                url: this.props.location.pathname
                                            }).then(() => {
                                            })
                                        }
                                    }}>

                                    <button className="button-holder text-center">
                                        <RiShareLine size={20} className="text-primary"/>
                                    </button>
                                    Share
                                </div>

                            </Row>
                            <div className="px-3 thick-border-bottom py-3">
                                <h5>Details</h5>
                                <div className="d-flex align-items-center  flex-row">
                                    <GrLocation/>
                                    <div
                                        className="">{[model.address.village, model.address.suburb, model.address.county, model.address.state].filter(Boolean).join(', ')}</div>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <div><h6>Infrastructure Quality</h6></div>
                                    <div className="ml-3"
                                         onClick={(event) => {
                                             this.setState({popovertext: 'The Quality and Affordability of the available services'})
                                             this.handleClick(event)
                                         }}
                                    ><h6><AiOutlineInfoCircle/></h6></div>
                                </div>

                                <div className="d-flex align-items-center flex-row">
                                    <div className={"w-50"}>Oxygen</div>
                                    <StarRating rating={model.oxygen_rating}/>
                                </div>
                                <div className="d-flex align-items-center mt-2 flex-row">
                                    <div className={"w-50"}>Affordability</div>
                                    <StarRating rating={model.financial_rating}/>
                                </div>
                                <div className="d-flex align-items-center mt-2 flex-row">
                                    <div className={"w-50"}>Covid</div>
                                    <StarRating rating={model.covid_rating}/>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <div><h6>Infrastructure Availability</h6></div>
                                    <div className="ml-3"
                                         onClick={(event) => {
                                             this.setState({popovertext: 'Percentage Probability of Availing the services'})
                                             this.handleClick(event)
                                         }}
                                    ><h6><AiOutlineInfoCircle/></h6></div>
                                    <Popover
                                        id={'popovers'}
                                        open={open}
                                        anchorEl={this.state.open_availability}
                                        onClose={this.handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <div className="p-2">{this.state.popovertext}</div>
                                    </Popover>
                                </div>

                                <div className="d-flex align-items-center flex-row">
                                    <div className={"w-50"}>Oxygen</div>
                                    <div>{model.oxygen_availability} %</div>
                                </div>
                                <div className="d-flex align-items-center mt-2 flex-row">
                                    <div className={"w-50"}>ICU</div>
                                    <div> {model.icu_availability} %</div>
                                </div>
                                <div className="d-flex align-items-center mt-2 flex-row">
                                    <div className={"w-50"}>ventilator</div>
                                    <div> {model.ventilator_availability} %</div>
                                </div>

                                <div className="d-flex align-items-center mt-2 flex-row">
                                    <div className={"w-50"}>Average Daily Cost</div>
                                    <div>Rs. {model.avg_cost}</div>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 border-bottom bg-white py-3">
                            <div className="d-flex align-items-center mt-2">
                                <div><h5>Reviews</h5></div>
                                <div className="ml-3"
                                     onClick={(event) => {
                                         this.setState({popovertext: 'The Reviews are automatically monitored for foul language. Reviews are averaged with temporal weightage'})
                                         this.handleClick(event)
                                     }}
                                ><h6><AiOutlineInfoCircle/></h6></div>

                            </div>
                            <div className="d-flex justify-content-center">

                                <button onClick={() => {
                                    if (this.state.auth) {
                                        this.props.history.push(currentLocation + "#review")
                                        this.setState({show_review: !this.state.show_review})
                                    } else {
                                        this.performAuth()
                                    }
                                }}
                                        className="d-flex align-items-center mt-2 py-0 btn btn-light  bg-white rounder thin-border">
                                    <MdRateReview className="text-dark"/>
                                    <div className="p-1 px-2">write a review</div>
                                </button>
                                {
                                    this.state.auth &&
                                    <CSSTransition classNames="filter-screen" in={this.state.show_review} timeout={300}
                                                   unmountOnExit>
                                        <FullScreenReview refresh_parent={this.refresh} marker={model.id} close={() => {
                                            this.props.history.goBack()
                                            this.refreshReviews().then()
                                            this.setState({show_review: false})
                                        }}/>
                                    </CSSTransition>}
                            </div>
                        </div>
                        {model.comment.reverse().map((comment: {
                                id: number;
                                written_by_name: string;
                                datef: string;
                                care_rating: number;
                                oxygen_rating: number;
                                financial_rating: number;
                                covid_rating: number;
                                comment: string;
                                oxygen_availability: number;
                                icu_availability: number;
                                ventilator_availability: number;
                            }) =>
                                (
                                    <div key={comment.id}
                                         className="px-3 border-bottom bg-white align-items-center  text-left py-2 ">
                                        <div className="d-flex flex-row line-height-small justify-content-between mb-3">
                                            <div className="d-flex flex-row ">
                                                <IoPersonCircleSharp size={35} height={30}/>
                                                <div>
                                                    <div className="h6 m-0"><b>{comment.written_by_name}</b></div>
                                                    <small>{comment.datef.split('-').reverse().join('-')}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row justify-content-center">
                                            <div className="d-flex flex-column w-50">
                                                <small>Care Rating</small>
                                                <StarRating rating={comment.care_rating}/>
                                            </div>
                                            <div className="d-flex flex-column w-50">
                                                <small>Oxygen Rating</small>
                                                <StarRating rating={comment.oxygen_rating}/>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row justify-content-center">
                                            <div className="d-flex flex-column w-50">
                                                <small>Affordability Rating</small>
                                                <StarRating rating={comment.financial_rating}/>
                                            </div>
                                            <div className="d-flex flex-column w-50">
                                                <small>Covid Rating</small>
                                                <StarRating rating={comment.covid_rating}/>
                                            </div>

                                        </div>
                                        <div className="py-2 pl-3">"{comment.comment}"</div>


                                        <div className="d-flex flex-row justify-content-center">

                                            <div className="d-flex flex-column w-50" onClick={(event) => {
                                                let used = comment.oxygen_availability === 2 ? 'Available' :
                                                    comment.oxygen_availability === 1 ? 'Not Available' : 'not need'
                                                this.setState({popovertext: `Oxygen was ${used}`})
                                                this.handleClick(event)
                                            }}>
                                                <h6 className="d-flex align-items-center">
                                                    <span className="mr-1">Oxygen </span>
                                                    {comment.oxygen_availability === 0 ?
                                                        <AiFillQuestionCircle className="text-secondary"/> :
                                                        comment.oxygen_availability === 1 ?
                                                            <AiFillCloseCircle className="text-danger"/> :
                                                            <AiFillCheckCircle className="text-success"/>}
                                                </h6>
                                            </div>


                                            <div className="d-flex flex-column w-50" onClick={(event) => {
                                                let used = comment.icu_availability === 2 ? 'Available' :
                                                    comment.icu_availability === 1 ? 'Not Available' : 'not need'
                                                this.setState({popovertext: `ICU beds were ${used}`})
                                                this.handleClick(event)
                                            }}>
                                                <h6 className="d-flex align-items-center">
                                                    <span className="mr-1">ICU beds</span>
                                                    {comment.icu_availability === 0 ?
                                                        <AiFillQuestionCircle className="text-secondary"/> :
                                                        comment.icu_availability === 1 ?
                                                            <AiFillCloseCircle className="text-danger"/> :
                                                            <AiFillCheckCircle className="text-success"/>}
                                                </h6>
                                            </div>


                                        </div>
                                        <div className="d-flex flex-row justify-content-between" onClick={(event) => {
                                            let used = comment.ventilator_availability === 2 ? 'Available' :
                                                comment.ventilator_availability === 1 ? 'Not Available' : 'not need'
                                            this.setState({popovertext: `Ventilator beds were ${used}`})
                                            this.handleClick(event)
                                        }}>
                                            <div className="d-flex flex-column w-50">
                                                <h6 className="d-flex align-items-center">
                        <span
                            className="mr-1">Ventilator beds</span>
                                                    {comment.ventilator_availability === 0 ?
                                                        <AiFillQuestionCircle className="text-secondary"/> :
                                                        comment.ventilator_availability === 1 ?
                                                            <AiFillCloseCircle className="text-danger"/> :
                                                            <AiFillCheckCircle className="text-success"/>}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                        )}

                    </Container>
                </> :
                <Container fluid={true} className="my-5 py-5 ">
                    <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
                </Container>


        );
    }

}


export const Details = withRouter(DetailsLoc)