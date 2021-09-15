import React, {Component} from "react";
import {DepartmentObject} from "../../api/model";

import {Container} from "react-bootstrap";
import "./DepartmentCards.css";
import deptimage from "../../images/doctor.svg";
import str from "../../images/star.svg";

export class DepartmentCards extends Component<{ models: DepartmentObject[] },{}> {
    render() {
        console.log(this.props.models)
        return (
            <Container fluid={true} className='m-0 p-0'>
                <div className="dpts">
                  {this.props.models.map((model, i) => <h1>{model.name}</h1>)}
                  
                    <div className="dpts-pic">
                        <img src={deptimage} alt="dpt"/>
                    </div>

                    <div className="dpts-cnt">
                        <p><b>Anaesthesiology</b><br/><small>Ratings 1.0</small></p>
                    </div>

                    <div className="dpts-rtg">
                        <img src={str} alt="rating" />
                    </div>

                </div>

            </Container>
        )
    }
}

