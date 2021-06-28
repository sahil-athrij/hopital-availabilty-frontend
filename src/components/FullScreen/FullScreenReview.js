import {Container} from "react-bootstrap";
import {ReactComponent as Back} from "../../images/back.svg";

import './location.css'
import {IoPersonCircleSharp} from "react-icons/all";
import {StarRatingReview} from "../inputs/StarRatingReview";
import {YesNoInput} from "../inputs/YesNoInput";
import {FormControl, Input, InputAdornment, InputLabel} from "@material-ui/core";
import {Review} from "../../api/model";
import {AuthComponent} from "../../api/auth";


export class ReviewBox extends AuthComponent {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            marker: this.props.marker,
            care_rating: 0,
            covid_rating: 0,
            oxygen_rating: 0,
            financial_rating: 0,
            avg_cost: 0,
            oxygen_availability: null,
            icu_availability: null,
            ventilator_availability: null,
            allow_post: false


        }
    }

    setValue = (param, value) => {
        this.setState({[param]: value},
            () => {
                let allow_post = this.state.care_rating !== 0 && this.state.covid_rating !== 0 && this.state.oxygen_rating !== 0
                    && this.state.financial_rating !== 0 && this.state.avg_cost !== 0 && this.state.oxygen_availability !== null
                    && this.state.icu_availability !== null && this.state.ventilator_availability !== null
                this.setState({allow_post: allow_post})
            })
    }
    postData = () => {
        Review.create(this.state)
    }

    render() {


        return (

            <>
                <div className="w-100  text-left">
                    <div className="d-flex flex-row ">
                        <IoPersonCircleSharp size={35} height={30}/>
                        <div className="line-height-small">
                            <div className="h6 m-0"><b>{this.state.user.username}</b></div>
                            <small>{new Date().toDateString()}</small>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between text-left mt-3 flex-wrap">
                        <div
                            className="star-holder px-3 w-50 mb-2 d-flex justify-content-center flex-column text-center">
                            <StarRatingReview setValue={this.setValue} value={this.state.care_rating} name="care_rating"
                                              label="General Care Quality"/>
                        </div>

                        <div
                            className=" star-holder px-3 w-50 mb-2 d-flex justify-content-center flex-column text-center">
                            <StarRatingReview setValue={this.setValue} value={this.state.covid_rating}
                                              name="covid_rating" type="covid"
                                              label="Coivd Care  Quality"/>
                        </div>
                        <div
                            className="star-holder px-3 w-50 mb-2 d-flex justify-content-center flex-column text-center">
                            <StarRatingReview setValue={this.setValue} value={this.state.oxygen_rating}
                                              name="oxygen_rating" type="oxygen"
                                              label="Oxygen Infrastructure "/>
                        </div>
                        <div
                            className="star-holder px-3 w-50 mb-2 d-flex justify-content-center flex-column text-center">
                            <StarRatingReview setValue={this.setValue} value={this.state.financial_rating}
                                              name="financial_rating"
                                              type="financial" label="Affordability"/>
                        </div>
                        <div className=" px-3 pt-2 w-50 mb-2 d-flex justify-content-center  flex-row text-center">
                            <YesNoInput setValue={this.setValue} value={this.state.oxygen_availability}
                                        name="oxygen_availability" label="Oxygen Availability"/>
                        </div>
                        <div className=" px-3 pt-2 w-50 mb-2 d-flex justify-content-center  flex-row text-center">
                            <YesNoInput setValue={this.setValue} value={this.state.icu_availability}
                                        name="icu_availability" label="ICU Availability"/>
                        </div>
                        <div className=" px-3 pt-2 w-50 mb-2 d-flex justify-content-center  flex-row text-center">
                            <YesNoInput setValue={this.setValue} value={this.state.ventilator_availability}
                                        name="ventilator_availability" label="Ventilator Availability"/>
                        </div>
                        <div className=" px-3 pt-3 w-50 mb-2 d-flex justify-content-center  flex-row text-center">
                            <FormControl required>
                                <InputLabel htmlFor="standard-adornment-amount">Average Daily Cost</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    value={this.state.avg_cost}
                                    type="number"

                                    onChange={(event) => this.setValue(
                                        'avg_cost', event.target.value)}
                                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                />
                            </FormControl>
                        </div>
                        <div className=" px-3 pt-2 w-100 mb-2 d-flex justify-content-center  flex-row text-center">
                            {this.state.allow_post ?
                                <button type="submit" disabled={!this.state.allow_post}
                                        onClick={this.postData}
                                        className="btn btn-dark rounder">Submit
                                </button> :
                                <button disabled className="btn disabled">Enter the required Data</button>
                            }
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

export class FullScreenReview extends AuthComponent {

    render() {
        let {user}= this.state
        if(!user){
            this.performAuth()
            return <></>
        }else {
            return (<div className="fixed-top w-100 h-100 bg-white header justify-content-start">

                <Container fluid={true} className="py-3 bg-grey d-flex align-items-center justify-content-start">
                    <div className="BlueBackground p-2" onClick={() => {
                        this.props.close()
                    }}>
                        <Back/>
                    </div>
                    <div className="h3 m-0 mx-2">
                        Share Your Feedback
                    </div>
                </Container>
                <Container fluid={true} className="mt-3">
                    <ReviewBox name="loc" close={() => {
                        this.props.close()
                    }}/>
                </Container>
            </div>)
        }
    }
}


