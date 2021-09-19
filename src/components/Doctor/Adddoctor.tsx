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
import {TextField} from "@material-ui/core";
import {Button} from "@material-ui/core";
import React from "react";
import close from "../../images/close.svg";

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
           <div className="d-flex justify-content-between p-3 ">
              <img src={close}/>
              <p className="align-self-center"><b>add doctor details</b></p>
              <Button variant="contained">Submit</Button>
           </div>

          <div className="m-4">

            <TextField className="mt-4" fullWidth variant="outlined"  label="Name" InputLabelProps={{shrink: true,}} size="small"/>
            <TextField className="mt-4" fullWidth variant="outlined" select label="Department" InputLabelProps={{shrink: true,}} size="small" />
            <TextField className="mt-4" fullWidth variant="outlined" select label="Years Of Experience" InputLabelProps={{shrink: true,}} size="small" />
            <TextField className="mt-4" fullWidth variant="outlined" select label="Working Time" InputLabelProps={{shrink: true,}} size="small" />
            <TextField className="mt-4" fullWidth variant="outlined"  label="Contact Number" InputLabelProps={{shrink: true,}} size="small"/>
            <TextField className="mt-4" fullWidth variant="outlined"  label="Tell us more" InputLabelProps={{shrink: true,}} size="small"/>

          </div>

     </div>  


        );
    }

}


export const AddDoctorComponent = withRouter(AddDoctor)