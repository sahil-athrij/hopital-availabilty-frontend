import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import {MarkerObject} from '../../api/model';
import {BigBlueButton, StarRating} from "../Utils";

interface ReviewObject{
    model: MarkerObject;
}

export default class ReviewCards extends Component<ReviewObject> {

    render() {
        return (
            <div>
                {this.props.model.oxygen_rating}

                        <div className="dpts">
                                <div>
                                    <div className="dpts-pic d-flex justify-content-between p-2">
                                        <div className="d-flex justify-content-between p-2">
                                            <img className="pic m-2" src={model.name.icon || "fallback_image.png"}
                                                 alt="dpt"/>

                                            <p className="justify-content-start p-2">
                                                <b>Oxygen</b><br/><small>Ratings {this.props.model.oxygen_rating}</small></p>
                                        </div>
                                        <div className="dpts-rtg d-flex flex-row justify-content-sm-around">
                                          <StarRating rating={model.rating}/>
                                            <div className="d-flex m-2 p-2">
                                                <img className="arrw align-self-center" src={vector} alt="arrow"/>
                                            </div>
                                        </div>


                                    </div>
                                </div>
            
                        </div>

            
            <Container className="p-4">
                <BigBlueButton text="Add Department"/>
            </Container>
           


            </div>
        )
    }
}
