import React from "react";
import {Container} from "react-bootstrap";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {AuthenticatedBanner, Banners} from "./Banners";
import {withRouter} from "react-router";

import './index.css'


interface IndexState extends AuthState {
    display: boolean
}

class IndexLoc extends AuthComponent<AuthPropsLoc, IndexState> {

    constructor(props: AuthPropsLoc) {
        super(props);
        this.state = {
            ...this.state,
            display: true
        }
    }


    render() {

        return (
            <React.Fragment>
                <Container fluid={true} className=" mt-5 p-3 ">

                </Container>
                {
                    this.state.auth ? <AuthenticatedBanner/> : <Banners/>
                }
            </React.Fragment>)
    }

}

export const Index = withRouter(IndexLoc);