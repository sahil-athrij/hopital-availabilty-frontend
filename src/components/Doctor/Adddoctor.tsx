import {Doctor, DoctorObject} from "../../api/model";

import "./doctor.css";

import icon1 from "./icons/icon-1@2x.svg";
import image from "./icons/image@2x.svg";
import icon from "./icons/icon@2x.svg";
import icon2 from "./icons/icon-2@2x.svg";
import icon3 from "./icons/icon-3@2x.svg";
import icon4 from "./icons/icon-4@2x.svg";
import icon5 from "./icons/icon-5@2x.svg";
import icon6 from "./icons/icon-6@2x.svg";
import icon7 from "./icons/icon-7@2x.svg";

import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";

import {Container} from "react-bootstrap";
import Loader from "react-loader-spinner";
import {withRouter} from "react-router";
import React from "react";

interface AddDoctorState extends AuthState {


}



class AddDoctor extends AuthComponent<AuthPropsLoc, AddDoctorState> {


    constructor(props: AuthPropsLoc) {
        super(props);
        this.state={...this.state,

           }
    }



    render() {
        return (
           <div>
          sggsdgsgd
           </div>


        );
    }

}


export const AddDoctorComponent = withRouter(AddDoctor)