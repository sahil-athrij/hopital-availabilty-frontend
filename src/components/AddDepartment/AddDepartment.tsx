import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";
import {TextField} from "@material-ui/core";
import {Button} from "@material-ui/core";
import close from "../../images/close.svg";

class AddDepartmentLoc extends AuthComponent<AuthPropsLoc, AuthState>
{
    render(): JSX.Element {
        // @ts-ignore
        const {hspId} = this.props.match.params;

        return (
            
            <div>  
            <div className="d-flex justify-content-between p-3 ">
               <img src={close}/>
               <p className="align-self-center"><b>Add Department details</b></p>
               <Button variant="contained">Submit</Button>
            </div>
 
           <div className="m-4">
 
             <TextField className="mt-4" fullWidth variant="outlined"  label="Department Name" InputLabelProps={{shrink: true,}} size="small"/>
             <p className="m-0"><b>Facilities available</b></p>    
             <TextField className="mt-4" fullWidth variant="outlined" select label="Is there a lab" InputLabelProps={{shrink: true,}} size="small" />
             <TextField className="mt-4" fullWidth variant="outlined" select label="Pharmacy" InputLabelProps={{shrink: true,}} size="small" />
             <TextField className="mt-4" fullWidth variant="outlined" select label="Facility number 1" InputLabelProps={{shrink: true,}} size="small" />
             <TextField className="mt-4" fullWidth variant="outlined"  label="Facility number 2" InputLabelProps={{shrink: true,}} size="small"/>
             <TextField className="mt-4" fullWidth variant="outlined"  label="Number of Doctors" InputLabelProps={{shrink: true,}} size="small"/>
             <p className="mt-1"><b>Doctor Details</b></p>  

           </div>
 
      </div> 
            
        );
    }
}

export const AddDepartmentComponent = withRouter(AddDepartmentLoc);