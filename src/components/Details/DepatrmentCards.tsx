import React, {Component} from "react";
import {DepartmentObject} from "../../api/model";

import {Container} from "react-bootstrap";
import "./DepartmentCards.css";
import star from "../../images/star.svg";

export class DepartmentCards extends Component<{ models: DepartmentObject[] }, {}> {
    render() {
        return (
            this.props.models.length ?
                <Container fluid={true} className='m-0 p-0'>
                    <div className="dpts">
                        {this.props.models.map((model, i) => (
                            <div id={String(i)}>
                                <div className="dpts-pic d-flex justify-content-between p-2">
                                    <div>
                                        <img src={model.name.icon || "fallback_image.png"} alt="dpt"/>

                                        <p className="justify-content-start"><b>{model.name.name}</b><br/><small>Ratings {model.rating}</small></p>
                                    </div>
                                    <div className="dpts-rtg">
                                        <img src={star} alt="rating"/>
                                        <ArrowForwardIosIcon/>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </Container> : <p>No Departments</p>
        )
    }
}

