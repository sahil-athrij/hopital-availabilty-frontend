import React from "react";
import {Container} from "react-bootstrap";
import './index.css'
import {AuthComponent, AuthProps, AuthPropsLoc, AuthState} from "../../api/auth";
import {AuthenticatedBanner, Banners} from "./Banners";
import './banner.css';
import {withRouter} from "react-router";


interface IndexState extends AuthState {
    display: boolean
}

class Index extends AuthComponent<AuthPropsLoc, IndexState> {

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

export default withRouter(Index);