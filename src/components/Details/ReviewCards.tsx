import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { MarkerObject, ReviewObject } from "../../api/model";
import { BigBlueButton, StarRating } from "../Utils";
import {Link} from 'react-router-dom';
import oxygen from "../../images/oxygen.svg";
import affordability from "../../images/affordability.svg";
import icu from "../../images/icu.svg";
import starsvg from "../../images/borderstar.svg";
import ventilator from "../../images/ventilator.svg";
import care from "../../images/care.svg";
import profile from "../../images/profile-image.svg";
import Avatar from '@mui/material/Avatar';
import tick from "../../images/Tick icon.svg";
import cross from "../../images/Cross icon.svg";
import Rating from "@mui/material/Rating";
import LinearProgress from "@mui/material/LinearProgress";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./ReviewCards.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import stars from "../../images/5stars.svg";
import profile from "../../images/profile-image.svg"; 

interface ReviewState {
  model: MarkerObject;
}

export default class ReviewCards extends Component<ReviewState> {

  render() {
    return (
      <div>
        <div>
          <div className="d-flex mt-1 pl-4">
            <h6>
              <b>Infrastructure Quality</b>
            </h6>
          </div>

          <div className="dpts-pic d-flex justify-content-between pl-3">
            <div className="d-flex justify-content-between ">
              <img className="pic m-2" src={oxygen} alt="dpt" />

              <p className="justify-content-start pt-2 text-left">
                <b>Oxygen</b>
                <br />
                <small>Ratings {this.props.model.oxygen_rating}</small>
              </p>
            </div>
            <div className="d-flex align-items-baseline">
              <StarRating rating={this.props.model.oxygen_rating} />
            </div>
          </div>

          <div className="dpts-pic d-flex justify-content-between pl-3">
            <div className="d-flex justify-content-between ">
              <img className="pic m-2" src={affordability} alt="dpt" />

              <p className="justify-content-start pt-2 text-left">
                <b>Affordability</b>
                <br />
                <small>Ratings {this.props.model.financial_rating}</small>
              </p>
            </div>
            <div className="d-flex align-items-baseline">
              <StarRating rating={this.props.model.financial_rating} />
            </div>
          </div>
        </div>

        <div>
          <div className="d-flex mt-4 pl-4">
            <h6>
              <b>Infrastructure Availability</b>
            </h6>
          </div>

          <div className="dpts-pic d-flex justify-content-between pl-3">
            <div className="d-flex justify-content-between ">
              <img className="pic m-2" src={oxygen} alt="dpt" />

              <p className="justify-content-start pt-2 text-left">
                <b>Oxygen</b>
                <br />
                <small>
                  Availability {this.props.model.oxygen_availability}%
                </small>
              </p>
            </div>
            <div className="d-flex align-items-center mr-1 pr-4">
              <h6 style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                <b>{this.props.model.oxygen_availability}%</b>
              </h6>
            </div>
          </div>

          <div className="dpts-pic d-flex justify-content-between pl-3">
            <div className="d-flex justify-content-between ">
              <img className="pic m-2" src={icu} alt="dpt" />

              <p className="justify-content-start pt-2 text-left">
                <b>ICU</b>
                <br />
                <small>Availability {this.props.model.icu_availability}%</small>
              </p>
            </div>
            <div className="d-flex align-items-center mr-1 pr-4">
              <h6 style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                <b>{this.props.model.icu_availability}%</b>
              </h6>
            </div>
          </div>

          <div className="dpts-pic d-flex justify-content-between pl-3">
            <div className="d-flex justify-content-between ">
              <img className="pic m-2" src={ventilator} alt="dpt" />

              <p className="justify-content-start pt-2 text-left">
                <b>Ventilator</b>
                <br />
                <small>
                  Availability {this.props.model.ventilator_availability}%
                </small>
              </p>
            </div>
            <div className="d-flex align-items-center mr-1 pr-4">
              <h6 style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                <b>{this.props.model.ventilator_availability}%</b>
              </h6>
            </div>
          </div>
        </div>

        <div>
          <div className="d-flex mt-4 pl-4">
            <h6>
              <b>Ratings and Reviews</b>
            </h6>
          </div>

          <RatingBar reviews={this.props.model.comment} />
        </div>

        <div>
         
          <div className="d-flex mx-4 mt-2">
            <img src={profile} alt="img" />
            <Rating
              className="required m-3 justify-content-between"
              name="size-large"
              defaultValue={0}
              size="large"
            />
          </div>

          <div>
            {this.props.model.comment.map((comment:ReviewObject, index:number) =>(
             <Accordion sx={{boxShadow:"none", border: 0}} className="mr-2">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon fontSize="small" />} 
              >
                <Typography>
                  <div className="d-flex justify-content-between mx-2 w-100 p-1">
                    <div className="mr-2 ">
                      <Avatar src={profile} alt="img" >{comment.written_by_name}</Avatar>
                    </div>
                    <div className="d-flex justify-content-center align-items-center ml-1">
                      <p className="d-flex justify-content-between align-items-center p-0 m-0">
                        <small><b style={{color:"#303030"}}>{comment.written_by_name}</b></small>                        
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-end flex-grow-1 pr-3">
                      <p className="d-flex align-items-center p-0 mr-2 my-0">
                      <small style={{ color: "#C7C9D9" }} className="ml-2">
                        {comment.datef}
                        </small>
                      </p>
                      <p
                        style={{ color: "#687684" }}
                        className="justify-content-center align-items-center p-0 m-0"
                      >
                      {comment.total_rating}
                      </p>
                      <img alt={""} className="pl-1" src={starsvg} />
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                    <p style={{color:"#868383"}} className="ml-4 text-left">{comment.comment}</p>
                  <div className="dpts-pic d-flex justify-content-between pl-3">
                    <div className="d-flex justify-content-between ">
                      <img className="pic m-2" src={oxygen} alt="dpt" />

                      <p className="justify-content-start pt-2 text-left">
                        <b style={{color: "#222B45"}}>Oxygen Availability</b>
                        <br />
                        
                          {comment.oxygen_availability?(<small style={{color: "#6B779A"}}>Available <img src={tick} alt={"tick"}/></small>)
                          :<small style={{color: "#6B779A"}}>Unavailable <img src={cross} alt={"cross"} /></small>}  
                        
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center flex-column text-right mr-1 ">
                      <h6 className="align-self-end mb-0 mr-2"
                        style={{
                          color:"#687684"
                        }}
                      >
                        {comment.oxygen_rating}
                      </h6>
                      <Rating
              className="mr-1"
              name="disabled"
              value={comment.oxygen_rating}
              disabled
              precision={0.5}
            />
                    </div>
                  </div>

                      <div className="d-flex mt-4 pl-4">
                <h6>
                <b>Ratings and Reviews</b>
                </h6>
               </div>
               <RatingBar />
        </div>
                  <div className="dpts-pic d-flex justify-content-between pl-3">
                    <div className="d-flex justify-content-between ">
                      <img className="pic m-2" src={icu} alt="dpt" />

                      <p className="justify-content-start pt-2 text-left">
                        <b style={{color: "#222B45"}}>ICU Availability</b>
                        <br />
                        
                          {comment.icu_availability?(<small style={{color: "#6B779A"}}>Available <img src={tick} alt={"tick"}/></small>)
                          :<small style={{color: "#6B779A"}}>Unavailable <img src={cross} alt={"cross"} /></small>}  
                        
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center flex-column text-right mr-1 ">
                      <h6 className="align-self-end mb-0 mr-2"
                        style={{
                          color:"#687684"
                        }}
                      >
                        {comment.icu_availability}
                      </h6>
                      <Rating
              className="mr-1"
              name="disabled"
              value={comment.icu_availability}
              disabled
              precision={0.5}
            />
                    </div>
                  </div>

                  <div className="dpts-pic d-flex justify-content-between pl-3">
                    <div className="d-flex justify-content-between ">
                      <img className="pic m-2" src={ventilator} alt="dpt" />

                      <p className="justify-content-start pt-2 text-left">
                        <b style={{color: "#222B45"}}>Ventilator Availability</b>
                        <br />
                        
                          {comment.ventilator_availability?(<small style={{color: "#6B779A"}}>Available <img src={tick} alt={"tick"}/></small>)
                          :<small style={{color: "#6B779A"}}>Unavailable <img src={cross} alt={"cross"} /></small>}  
                        
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center flex-column text-right mr-1 ">
                      <h6 className="align-self-end mb-0 mr-2"
                        style={{
                          color:"#687684"
                        }}
                      >
                        {comment.ventilator_availability}
                      </h6>
                      <Rating
              className="mr-1"
              name="disabled"
              value={comment.ventilator_availability}
              disabled
              precision={0.5}
            />
                    </div>
                  </div>


                  <div className="dpts-pic d-flex justify-content-between pl-3">
                    <div className="d-flex justify-content-between ">
                      <img className="pic m-2" src={care} alt="dpt" />

                      <p className="d-flex justify-content-center align-items-center pt-2 text-left">
                        <b style={{color: "#222B45"}}>Care Rating</b>                       
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center flex-column text-right mr-1 ">
                      <h6 className="align-self-end mb-0 mr-2"
                        style={{
                          color:"#687684"
                        }}
                      >
                        {comment.care_rating}
                      </h6>
                      <Rating
              className="mr-1"
              name="disabled"
              value={comment.care_rating}
              disabled
              precision={0.5}
            />
                    </div>
                  </div>

                   <div className="dpts-pic d-flex justify-content-between pl-3">
                    <div className="d-flex justify-content-between ">
                      <img className="pic m-2" src={affordability} alt="dpt" />

                      <p className="d-flex justify-content-center align-items-center pt-2 text-left">
                        <b style={{color: "#222B45"}}>Affordability Rating</b>                       
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center flex-column text-right mr-1 ">
                      <h6 className="align-self-end mb-0 mr-2"
                        style={{
                          color:"#687684"
                        }}
                      >
                        {comment.financial_rating}
                      </h6>
                      <Rating
              className="mr-1"
              name="disabled"
              value={comment.financial_rating}
              disabled
              precision={0.5}
            />
                    </div>
                  </div>        

                </Typography>
              </AccordionDetails>
            </Accordion>
            ))}
          </div>
        </div>

        <Container className="p-4">
          <Link to={`/details/reviews/${this.props.model.id}`}>
            <BigBlueButton text="Write a Review" />
          </Link>  
        </Container>
      </div>
    );
  }
}

interface RatingState {
  reviews: ReviewObject[];
  
}

class RatingBar extends Component<RatingState> {
  avgRating = () => {

    const length = this.props.reviews.length;
    let sum = 0;

    let rating = {
      avg: 0,
      ones: 0,
      twos: 0,
      threes: 0,
      fours: 0,
      fives: 0,
    };

    // eslint-disable-next-line array-callback-return
    this.props.reviews.map((comment, index) => {
      sum += comment.total_rating;

      switch (comment.total_rating) {
        case 1:
          rating.ones += 1;
          break;
        case 2:
          rating.twos += 1;
          break;
        case 3:
          rating.threes += 1;
          break;
        case 4:
          rating.fours += 1;
          break;
        case 5:
          rating.fives += 1;
          break;
      }
    });

    rating.avg = sum/length;
    rating.ones /= length;
    rating.twos /= length;
    rating.threes /= length;
    rating.fours /= length;
    rating.fives /= length;

    return rating;
  };

   
  render() {
    const ratingData = this.avgRating();
    console.log(ratingData);
    return (
      <>
        <div className="d-flex justify-content-between align-items-center px-4">
          <div className="d-flex flex-column m-0 p-0">
            <h4 className="m-0 p-0">
              <b>{ratingData.avg}</b>
            </h4>
            <Rating
              className="w-25"
              name="disabled"
              value={ratingData.avg}
              disabled
              precision={0.1}
            />

            <p className="m-0 p-0">
              <small>({this.props.reviews.length})</small>
            </p>
          </div>

          <div className="w-100 mx-4">
            <LinearProgress
              sx={{ width: "100%", color: "grey.500" }}
              className="rt-bar mb-1"
              variant="determinate"
              value={ratingData.fives * 100}
            />
            <LinearProgress
              sx={{ width: "100%", color: "grey.500" }}
              className="rt-bar mb-1"
              variant="determinate"
              value={ratingData.fours * 100}
            />
            <LinearProgress
              sx={{ width: "100%", color: "grey.500" }}
              className="rt-bar mb-1"
              variant="determinate"
              value={ratingData.threes * 100}
            />
            <LinearProgress
              sx={{ width: "100%", color: "grey.500" }}
              className="rt-bar mb-1"
              variant="determinate"
              value={ratingData.twos * 100}
            />
            <LinearProgress
              sx={{ width: "100%", color: "grey.500" }}
              className="rt-bar mb-1"
              variant="determinate"
              value={ratingData.ones * 100}
            />
          </div>

          <InfoOutlinedIcon sx={{ color: "#6B779A" }} />
        </div>
      </>
    );
  }
}
