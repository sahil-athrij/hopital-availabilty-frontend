import {AuthComponent, AuthPropsLoc, AuthState, getAuth} from "../../api/auth";

import {withRouter} from "react-router";
import React from "react";

import {Button, Container} from "@mui/material";
import Loader from "react-loader-spinner";

import Typography from "@mui/material/Typography";
import {baseUrl, post} from "../../api/api";

interface AddFriendState extends AuthState{
    ready: boolean;
    message: string;
}

class AddFriend extends AuthComponent<AuthPropsLoc, AddFriendState>
{
    async componentDidMount()
    {
        super.componentDidMount();
        const token = this.props.match.params.token;

        await post(`${baseUrl}/auth/users/friend/`, {token}, {"Authorization": `Bearer ${getAuth()}`})
            .then(() => this.setState({message: "Friend Added"}))
            .catch((error) => this.setState({message: error.message || "Oops Something went wrong."}));

        this.setState({ready:true});
    }

    render()
    {
        if (!this.state.auth) 
        {
            this.performAuth();
            return (<></>);
        }
        return (
            <Container className="mt-5 pt-5">
                {this.state.ready ?
                    <Typography variant={"h5"}>
                        {this.state.message}<br/>
                        <Button variant={"contained"} onClick={this.props.history.goBack}>Go Back</Button>
                    </Typography> :
                    <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
                }
            </Container>
        );
    }

}


export const AddFriendComponent = withRouter(AddFriend);
