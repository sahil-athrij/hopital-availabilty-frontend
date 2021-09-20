import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import close from "../../images/close.svg";
import "./AddDepartment.css";


class AddDepartmentLoc extends AuthComponent<AuthPropsLoc, AuthState>
{
    render(): JSX.Element {
        // @ts-ignore
        const {hspId} = this.props.match.params;

        return (
              
            <div className="main h-100">  
            <div className="head-sec d-flex justify-content-between p-3 shadow-none h-25">
               <img src={close}/>
               <p className="align-self-center m-0 p-0 justify-content-center"><b>Add Department details</b></p>
               <Button className="sub" variant="contained">Submit</Button>
            </div>
 
           <div className="m-4">
 
             <TextField className="mt-4" fullWidth variant="outlined"  label="Department Name" InputLabelProps={{shrink: true,}} size="small"/>
             <p className="text-left mt-3 p-0"><small><b>Facilities available</b></small></p>    
             <TextField fullWidth variant="outlined" select label="Is there a lab" InputLabelProps={{shrink: true,}} size="small" />
             <TextField className="mt-4" fullWidth variant="outlined" select label="Pharmacy" InputLabelProps={{shrink: true,}} size="small" />
             <TextField className="mt-4" fullWidth variant="outlined" select label="Facility number 1" InputLabelProps={{shrink: true,}} size="small" />
             <TextField className="mt-4" fullWidth variant="outlined"  label="Facility number 2" InputLabelProps={{shrink: true,}} size="small"/>
             <TextField className="mt-4" fullWidth variant="outlined"  label="Number of Doctors" InputLabelProps={{shrink: true,}} size="small"/>
             <p className="text-left mt-3"><small><b>Doctor Details</b></small></p>  

           </div>
 
      </div> 
            
        );
    }
}

export const AddDepartmentComponent = withRouter(AddDepartmentLoc);
