import {AuthComponent, AuthState} from "../../api/auth";
import {AuthPropsLoc} from "../GiveHelp/GiveHelp";
import {withRouter} from "react-router";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import {Avatar, Container, TextField} from "@mui/material";

import * as React from "react";
import "./edit.css";

import Campic from "../../images/cam-pic.jpg";
import {StickyHead} from "../Utils";
import {toast} from "react-toastify";
import {UserObject} from "../../api/model";


interface Editstate extends AuthState
{
    active: boolean,

}


class Edit extends AuthComponent<AuthPropsLoc, Editstate>
{

    constructor(props: AuthPropsLoc)
    {
        super(props);
        this.state = {
            ...this.state,


        };

    }


    save = () =>
    {
        if (!this.state.user)
        
            return;
        
        return this.state.user.save().then(() =>
        {
            this.props.history.push("/profile");
            toast.success("Successfully edited your details", {
                position: "bottom-center"
            });
        }).catch((error) =>
        {
            toast.error(error.details, {
                position: "bottom-center"
            });
        });


    };


    render()
    {

        return (
            <div>
                <StickyHead title="Edit Your Profile" action={"Save"} onClick={this.save}
                    goBack={this.props.history.goBack}/>
                <Container className="d-flex justify-content-center my-3">
                    <Avatar sx={{width: "107px", height: "107px"}} src={Campic}/>
                </Container>
                {this.state.user &&
                <Container className="px-5 ">
                    <p className="txthead mt-3 ">FIRST NAME</p>
                    <div className="d-flex justify-content-between flex-row align-items-center">
                        <TextField
                            value={this.state.user?.first_name}
                            fullWidth
                            onChange={({target}) => this.setState({
                                ...this.state,
                                user: {...this.state.user, first_name: target.value} as UserObject
                            })}
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <button onClick={() =>
                                    {
                                        this.setState({
                                            ...this.state,
                                            user: {...this.state.user, first_name: ""} as UserObject
                                        });
                                    }}>
                                        <HighlightOffIcon/>
                                    </button>
                                ),
                            }}
                        />

                    </div>
                    <p className="txthead mt-3">LAST NAME</p>
                    <div className="d-flex justify-content-between flex-row align-items-center">
                        <TextField
                            value={this.state.user?.last_name}
                            fullWidth
                            onChange={({target}) => this.setState({
                                ...this.state,
                                user: {...this.state.user, last_name: target.value} as UserObject
                            })}
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <button onClick={() =>
                                    {
                                        this.setState({
                                            ...this.state,
                                            user: {...this.state.user, last_name: ""} as UserObject
                                        });
                                    }}>
                                        <HighlightOffIcon/>
                                    </button>
                                ),
                            }}
                        />
                    </div>
                    <p className="txthead mt-3">EMAIL</p>
                    <div className="d-flex justify-content-between flex-row align-items-center">
                        <TextField
                            value={this.state.user?.email}
                            fullWidth
                            onChange={({target}) => this.setState({
                                ...this.state,
                                user: {...this.state.user, email: target.value} as UserObject
                            })}
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <button onClick={() =>
                                    {
                                        this.setState({
                                            ...this.state,
                                            user: {...this.state.user, email: ""} as UserObject
                                        });
                                    }}>
                                        <HighlightOffIcon/>
                                    </button>
                                ),
                            }}
                        />
                    </div>
                    <p className="txthead mt-3">PHONE</p>
                    <div className="d-flex justify-content-between flex-row align-items-center">
                        <TextField
                            value={this.state.user?.tokens?.phone_number}
                            fullWidth
                            onChange={({target}) => this.setState({
                                ...this.state,
                                user: {
                                    ...this.state.user,
                                    tokens: {...this.state.user?.tokens, phone_number: target.value}
                                } as UserObject
                            })}
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <button onClick={() =>
                                    {
                                        this.setState({
                                            ...this.state,
                                            user: {
                                                ...this.state.user,
                                                tokens: {...this.state.user?.tokens, phone_number: ""}
                                            } as UserObject
                                        });
                                    }}>
                                        <HighlightOffIcon/>
                                    </button>
                                ),
                            }}
                        />
                    </div>
                    <div className="bottom-sec">
                        <hr className="linestyle"/>
                        <div className="endtxt pb-4">We appreciate your kindness</div>
                    </div>
                </Container>}


            </div>
        );
    }
}

export const EditPage = withRouter(Edit);
