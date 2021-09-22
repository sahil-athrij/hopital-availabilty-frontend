import React, {Component} from "react";
import {DepartmentObject} from "../../api/model";

import {Container} from "react-bootstrap";
import "./DepartmentCards.css";
import star from "../../images/star.svg";
import vector from "../../images/vector.svg";
import {BigBlueButton, StarRating} from "../Utils";

export class DepartmentCards extends Component<{ models: DepartmentObject[] }, {}> {
    render() {
        return (
            <div>{
                this.props.models.length ?
                    <Container fluid={true} className='m-0 p-0'>
                        <div className="dpts">
                            {this.props.models.map((model, i) => (
                                <div id={String(i)}>
                                    <div className="dpts-pic d-flex justify-content-between p-2">
                                        <div className="d-flex justify-content-between p-2">
                                            <img className="pic m-2" src={model.name.icon || "fallback_image.png"}
                                                 alt="dpt"/>

                                            <p className="justify-content-start p-2">
                                                <b>{model.name.name}</b><br/><small>Ratings {model.rating}</small></p>
                                        </div>
                                        <div className="dpts-rtg d-flex flex-row justify-content-sm-around">
                                          <StarRating rating={model.rating}/>
                                            <div className="d-flex m-2 p-2">
                                                <img className="arrw align-self-center" src={vector} alt="arrow"/>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            ))}
                        </div>

                    </Container> : <p>No Departments</p>

            }
            <Container className="p-4">
                <BigBlueButton text="Add Department"/>
            </Container>
            </div>
        )
    }
}

