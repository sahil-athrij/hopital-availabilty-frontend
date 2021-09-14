import React, {Component} from "react";
import {DepartmentObject} from "../../api/model";

import {Container} from "react-bootstrap";


export class DepartmentCards extends Component<{ models: DepartmentObject[] },{}> {
    render() {
        console.log(this.props.models)
        return (
            <Container fluid={true} className='m-0 p-0'>
                {this.props.models.map((model, i) => <h1>{model.name}</h1>)}
            </Container>
        )
    }
}

