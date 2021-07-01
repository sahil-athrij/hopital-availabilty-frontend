import {AuthComponent} from "../../api/auth";
import React from "react";
import {Route} from "react-router";
import {ProfileDetails} from "./ProfileDetails";
import './profile.css'
export class Profile extends AuthComponent {
    render() {
        if (this.state.auth) {
            return (
                <>
                    <Route path={"/profile/edit"}>
                        <div>whit</div>
                    </Route>

                    <Route exact={true} path={"/profile"}>
                        <ProfileDetails/>
                    </Route>
                </>
            )
        }
    }
}
