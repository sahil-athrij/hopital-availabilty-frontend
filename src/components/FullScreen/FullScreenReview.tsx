import React from "react";
import {Container} from "react-bootstrap";
import {ReactComponent as Back} from "../../images/back.svg";
import {IoPersonCircleSharp} from "react-icons/all";
import {StarRatingReview} from "../inputs/StarRatingReview";
import {YesNoInput} from "../inputs/YesNoInput";
import {InputAdornment, TextField} from "@mui/material";
import {Review} from "../../api/model";
import {AuthComponent, AuthState} from "../../api/auth";
import {toast} from "react-toastify";

import "./location.css";


interface ReviewBoxProps {
    marker: number,
    close: () => void,
    refresh_parent?: () => void
}


interface ReviewBoxState extends AuthState {
    marker: number,
    name: string,
    care_rating: number,
    covid_rating: number,
    oxygen_rating: number,
    financial_rating: number,
    avg_cost: number,
    oxygen_availability: number | null,
    icu_availability: number | null,
    ventilator_availability: number | null,
    allow_post: boolean
}

export class ReviewBox extends AuthComponent<ReviewBoxProps, ReviewBoxState>
{

    constructor(props: ReviewBoxProps) 
    {
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


        };
    }

    setValue = (param: string, value: number | string | boolean) => 
    {

        this.setState(({[param]: value} as unknown as ReviewBoxState ),
            () => 
            {
                const allow_post = this.state.care_rating !== 0 && this.state.covid_rating !== 0 && this.state.oxygen_rating !== 0
                    && this.state.financial_rating !== 0 && this.state.avg_cost !== 0 && this.state.oxygen_availability !== null
                    && this.state.icu_availability !== null && this.state.ventilator_availability !== null;
                this.setState({allow_post: allow_post});
            });
    };
    postData = () => 
    {
        Review.create(this.state).then(() => 
        {
            toast.success("Successfully Submitted Review", {
                position: "bottom-center",
            });
            this.props.close();
        }).catch((error) => 
        {
            const {detail} = error;
            console.log(detail);
            if (detail === "Invalid token header. No credentials provided.") 
            {
                this.refreshAuth();
                this.postData();
            }
            else 
            
                toast.error(detail, {
                    position: "bottom-center",
                });
            
        });
    };

    render() 
    {


        return (

            <React.Fragment>
                <div className="w-100  text-left">
                    <div className="d-flex flex-row ">
                        <IoPersonCircleSharp size={35} height={30}/>
                        <div className="line-height-small">
                            <div className="h6 m-0"><b>{this.state.user ? this.state.user.username : ""}</b></div>
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
                        <YesNoInput setValue={this.setValue} value={this.state.oxygen_availability}
                            name="oxygen_availability" label="Oxygen Availability"/>
                        <YesNoInput setValue={this.setValue} value={this.state.icu_availability}
                            name="icu_availability" label="ICU Availability"/>
                        <YesNoInput setValue={this.setValue} value={this.state.ventilator_availability}
                            name="ventilator_availability" label="Ventilator Availability"/>


                        <TextField label="Average Daily Cost"
                            id="standard-adornment-amount"
                            value={this.state.avg_cost}
                            variant="outlined"
                            type="number"
                            className={"p-1 w-100"}
                            onChange={(event) => this.setValue(
                                "avg_cost", event.target.value)}
                        > <InputAdornment position="end">₹</InputAdornment>
                        </TextField>

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
            </React.Fragment>

        );
    }
}


export class FullScreenReview extends AuthComponent<ReviewBoxProps, AuthState> 
{

    render() 
    {
        const {user} = this.state;
        if (!user) 
        {
            this.performAuth();
            return <></>;
        }
        else 
        
            return (<div className="fixed-top w-100 h-100 bg-grey header d-flex flex-column  justify-content-start">

                <Container fluid={true}
                    className="py-3 bg-white neumorphic-input d-flex align-items-center justify-content-start">
                    <button className="BlueBackground p-2" onClick={() => 
                    {
                        this.props.close();
                    }}>
                        <Back/>
                    </button>
                    <div className="h3 m-0 mx-2">
                        Share Your Feedback
                    </div>
                </Container>


                <Container fluid={true} className="mt-5 pt-3 neumorphic-input bg-white">
                    <ReviewBox marker={this.props.marker} close={() => 
                    {
                        this.props.close();
                    }}/>
                </Container>
            </div>);
        
    }
}


