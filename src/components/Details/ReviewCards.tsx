import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { MarkerObject } from "../../api/model";
import { BigBlueButton, StarRating} from "../Utils";
import oxygen from "../../images/oxygen.svg";
import affordability from "../../images/affordability.svg";
import icu from "../../images/icu.svg";
import ventilator from "../../images/ventilator.svg";
import stars from "../../images/5stars.svg";
import profile from "../../images/profile-image.svg";
import Rating from "@mui/material/Rating";
import LinearProgress from "@mui/material/LinearProgress";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface ReviewObject {
  model: MarkerObject;
}

export default class ReviewCards extends Component<ReviewObject> {
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
                <small>Availability {this.props.model.oxygen_availability}%</small>
              </p>
            </div>
            <div className="d-flex align-items-center mr-1 pr-4">
              <h6 style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}><b>{this.props.model.oxygen_availability}%</b></h6>  
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
              <h6 style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}><b>{this.props.model.icu_availability}%</b></h6>  
            </div>
          </div>

          <div className="dpts-pic d-flex justify-content-between pl-3">
            <div className="d-flex justify-content-between ">
              <img className="pic m-2" src={ventilator} alt="dpt" />

              <p className="justify-content-start pt-2 text-left">
                <b>Ventilator</b>
                <br />
                <small>Availability {this.props.model.ventilator_availability}%</small>
              </p>
            </div>
            <div className="d-flex align-items-center mr-1 pr-4">
              <h6 style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}><b>{this.props.model.ventilator_availability}%</b></h6>  
            </div>
          </div>

        </div>

        <div>

              <div className="d-flex mt-4 pl-4">
                <h6>
                <b>Ratings and Reviews</b>
                </h6>
               </div> 

               <RatingBar reviews={this.props.model.comment}/>
            

        </div>

       

        <div>

            <div className="d-flex flex-column text-left mt-4 pl-4">
                    <h6 className="m-0"><b>Rate and Review</b></h6>
                    <p className="p-0 m-0"><small>Share your experience to help others</small></p>
            </div> 

            <div className="d-flex mx-4 ">
                <img src={profile} alt="img" />
                <Rating name="size-large" defaultValue={0} size="large" />
            </div>

        </div>

        <Container className="p-4">
          <BigBlueButton text="Write a Review"/> 
        </Container>
      </div>
    );
  }
}


interface RatingObject {
  reviews: ReviewObject[];
}

class RatingBar extends Component<RatingObject> {

  avgRating = () => {

    let rating = {
      sum: 0,
      ones: 0,
      twos: 0,
      threes: 0,
      fours: 0,
      fives: 0
    }

    this.props.reviews.map((comment, index) => {
      rating.sum += comment.total_rating;
      switch(comment.total_rating){
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



    })

  }

  render() {
    this.avgRating();
    return (
        <>
          <div className="d-flex justify-content-between align-items-center px-4">
            <div className="d-flex flex-column m-0 p-0">
              <h4 className="m-0 p-0">
                <b>21</b>
              </h4>
              <Rating className="w-25" name="disabled" value={3.6} disabled precision={0.1} />

              <p className="m-0 p-0">
                <small>({this.props.reviews.length})</small>
              </p>
            </div>

            <div className="w-100 mx-4">
              <LinearProgress sx={{ width: '100%', color: 'grey.500' }} className="rt-bar mb-1" variant="determinate" value={50} />
              <LinearProgress sx={{ width: '100%', color: 'grey.500' }} className="rt-bar mb-1" variant="determinate" value={50} />
              <LinearProgress sx={{ width: '100%', color: 'grey.500' }} className="rt-bar mb-1" variant="determinate" value={50} />
              <LinearProgress sx={{ width: '100%', color: 'grey.500' }} className="rt-bar mb-1" variant="determinate" value={50} />
              <LinearProgress sx={{ width: '100%', color: 'grey.500' }} className="rt-bar mb-1" variant="determinate" value={50} />
            </div>

            <InfoOutlinedIcon sx={{color:"#6B779A"}}/>

          </div>
        </>
    );
  }
}
