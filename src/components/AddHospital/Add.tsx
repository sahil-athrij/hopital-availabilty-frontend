import {AuthComponent, AuthState} from "../../api/auth";
import React from "react";
import {Route} from "react-router";

import {AddHospital} from "./AddHospital";
import {AddHospitalPhoto} from "./AddHospitalPhoto";

export class Add extends AuthComponent<Record<string, unknown>, AuthState>
{
    render() 
    {
        if (this.state.auth) 
        
            return (
                <React.Fragment>
                    <Route path={"/addHospital/photo/:hspId"}>
                        <AddHospitalPhoto/>
                    </Route>
                    <Route exact={true} path={"/addHospital"}>
                        <AddHospital/>
                    </Route>
                </React.Fragment>
            );
        
        else 
        {
            this.performAuth();
            return <></>;
        }
    }
}
