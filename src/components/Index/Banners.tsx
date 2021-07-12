import {AuthComponent, AuthProps, AuthPropsLoc, AuthState} from "../../api/auth";
import {Container} from "react-bootstrap";
import {withRouter} from "react-router";
import React from "react";

export class Banners extends AuthComponent<AuthProps, AuthState> {
    render() {
        return (<Container fluid={true} className=" mt-5 blue-gradient py-2 holder">
            <div className=" p-2 text-white">
                <h3>Search For Hospitals</h3>
                <h6> hello</h6>
                <h6>take help from friends</h6>
                <h6> hello</h6>
                <div className="d-flex justify-content-even">
                    <button onClick={this.performAuth} className={"btn btn-light flex-fill m-2 py-2 round-15 bg-white"}>
                        <b>Login</b></button>
                    <button onClick={this.performAuth} className={"btn btn-light flex-fill m-2 py-2 round-15 bg-white"}>
                        <b>Sign Up</b></button>
                </div>
            </div>
        </Container>)
    }
}

export class AuthenticatedBannerLoc extends AuthComponent<AuthPropsLoc, AuthState> {
    render() {
        return (<Container fluid={true} className=" mt-5 green-gradient py-2 holder">
            <div className=" p-2 text-white">
                <h3>Search For Hospitals</h3>
                <h6> hello</h6>
                <h6>take help from friends</h6>
                <h6> hello</h6>
                <div className="d-flex justify-content-even">
                    <button onClick={() => {
                        this.props.history.push('/profile/addRequest')
                    }} className={"btn btn-light flex-fill m-2 py-2 round-15 bg-white"}>
                        <b>Request Help</b></button>
                    <button onClick={() => {
                        this.props.history.push('/profile')
                    }} className={"btn btn-light flex-fill m-2 py-2 round-15 bg-white"}>
                        <b>View Profile</b></button>
                </div>
            </div>
        </Container>)
    }
}

export const AuthenticatedBanner = withRouter(AuthenticatedBannerLoc)