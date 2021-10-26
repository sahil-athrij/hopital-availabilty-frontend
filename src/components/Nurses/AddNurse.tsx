import {Nurse} from "../../api/model";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";

import {withRouter} from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import {Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import {toast} from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
// import Skeleton from "@mui/material/Skeleton";


interface AddNurseState extends AuthState {
    name: string,
    // working_time: Array<WorkingTime>,
    experience: number,
    phone_number: number,
    whatsapp_number: number,
    email: string,
    address: string,
    language: string,
    about: string,
    hospital: Array<number>,
    ready?: boolean,
    gender: string,
    error: { name: boolean, phone_number: boolean, whatsapp_number: boolean, 
        email: boolean, address: boolean, language:boolean, about: boolean, gender: boolean}
}

// interface AddNurseProps extends AuthPropsLoc {
//     withoutHospital?: boolean,
// }

class AddNurse extends AuthComponent<AuthPropsLoc, AddNurseState> 
{
   
    constructor(props: AuthPropsLoc) 
    {
        super(props);

        this.state = {
            ...this.state,
            error: { name: false, phone_number: false, whatsapp_number:false,
                email: false, address: false, language: false, about: false, gender: false}
        };
    }

    async componentDidMount() 
    {        
        this.setState({ready:true});        
    }

    saveNurse = async () => 
    {
        const toSend = this.state;

        toSend.user = null;

        if (this.state.name && this.state.phone_number && this.state.gender)
        
            Nurse.create({...toSend})
                .then(() => 
                {
                    this.props.history.push("/searchnurse/");
                    toast.success("thank you for the contribution", {
                        position: "bottom-center"
                    });
                }).catch((error) => 
                {
                    toast.error(error.details, {
                        position: "bottom-center"
                    });
                });
            
        else
            toast.error("please enter the required details", {
                position: "bottom-center"
            });
    };

    render() 
    {
        return (
           
            <div>
                <div className="head-sec d-flex justify-content-between p-3 shadow-none h-25">
                    <CloseIcon onClick={() => this.props.history.goBack()}/>
                    <p className="align-self-center m-0 p-0 justify-content-center"><b>Add Doctor</b></p>
                    <Button className="sub" variant="contained" onClick={this.saveNurse}>Submit</Button>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <Avatar sx={{width:"107px", height:"107px"}} src="../../images/cam-pic.svg"/>
                </div>

                <div className="m-4 pb-5">               
                    <TextField className="mt-2" fullWidth label="Name" required
                        InputLabelProps={{shrink: true, }} size="small" error={this.state.error.name}
                        helperText={this.state.error.name && "This field is required"}
                        onChange={({target}) => this.setState({name: target.value, error: {...this.state.error, name: (!target.value)} })}/>

                    <TextField className="mt-4" fullWidth variant="outlined" select label="Gender"
                        error={this.state.error.gender} required
                        helperText={this.state.error.gender && "This field is required"}
                        InputLabelProps={{shrink: true, }} size="small"
                        onChange={({target}) => this.setState({gender: String(target.value)})}>
                            
                        <MenuItem value="M">Male</MenuItem>
                        <MenuItem value="F">Female</MenuItem>
                        <MenuItem value="NB">Non Binary</MenuItem>
                        <MenuItem value="NP">Rather Not To Say</MenuItem>
                    
                    </TextField>

                    <TextField className="mt-4" fullWidth variant="outlined" label="Contact Number"
                        error={this.state.error.phone_number} required
                        helperText={this.state.error.phone_number && "Incorrect format"}
                        InputLabelProps={{shrink: true, }} size="small" type="tel"
                        onChange={({target}) => this.setState({phone_number: Number(target.value),  error: {...this.state.error, phone_number: (!target.value.match(/^(\+\d{1,3})?\s*\d{10}$/g))}})}/>
                        
                    <TextField className="mt-4" fullWidth variant="outlined" label="Whatsapp Number"
                        error={this.state.error.whatsapp_number}
                        helperText={this.state.error.whatsapp_number && "Incorrect format"}
                        InputLabelProps={{shrink: true, }} size="small" type="tel"
                        onChange={({target}) => this.setState({whatsapp_number: Number(target.value),  error: {...this.state.error, whatsapp_number: (!target.value.match(/^(\+\d{1,3})?\s*\d{10}$/g))}})}/>
                        
                    <TextField className="mt-4" fullWidth variant="outlined" label="Email"
                        error={this.state.error.email}
                        helperText={this.state.error.email && "Incorrect format"}
                        InputLabelProps={{shrink: true, }} size="small" type="email"
                        onChange={({target}) => this.setState({email: target.value,  error: {...this.state.error, email: (!target.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))}})}/>
                    <TextField className="mt-4" fullWidth variant="outlined" label="Years Of Experience"
                        InputLabelProps={{shrink: true, }} size="small" type="number"
                        onChange={({target}) => this.setState({experience: Number(target.value)})}/>
                        
                    <TextField className="mt-4" fullWidth label="Address or Location"
                        InputLabelProps={{shrink: true, }} size="small" error={this.state.error.address}
                        helperText={this.state.error.address && "This field is required"}
                        onChange={({target}) => this.setState({address: target.value, error: {...this.state.error, address: (!target.value)} })}/>
                        
                    <TextField className="mt-4" fullWidth label="Language"
                        InputLabelProps={{shrink: true, }} size="small" error={this.state.error.language}
                        helperText={this.state.error.language && "This field is required"}
                        onChange={({target}) => this.setState({language: target.value, error: {...this.state.error, language: (!target.value)} })}/> 
                        
                    <TextField className="mt-4 mb-5" fullWidth variant="outlined" label="Tell us more"
                        InputLabelProps={{shrink: true, }} size="small"
                        onChange={({target}) => this.setState({about: target.value})}/>
                    
                </div>

            </div>
        // :
        // <div className="main h-100">
        //     <div className="head-sec d-flex justify-content-between p-3 shadow-none h-25">
        //         <CloseIcon onClick={() => this.props.history.goBack()}/>
        //         <p className="align-self-center m-0 p-0 justify-content-center"><b>Add Doctor</b></p>
        //         <Button className="sub" variant="contained">Submit</Button>
        //     </div>
        //     <div className="d-flex justify-content-center align-items-center">
        //         <Avatar src="/broken-image.jpg"/>
        //     </div>

        //     <div className="m-4">
        //         <Skeleton variant="rectangular" className="mt-2 w-100"  height={118} />
        //         <Skeleton variant="rectangular" className="mt-2 w-100"  height={118} />
        //         <Skeleton variant="rectangular" className="mt-2 w-100"  height={118} />
        //         <Skeleton variant="rectangular" className="mt-2 w-100"  height={118} />
        //         <Skeleton variant="rectangular" className="mt-2 w-100"  height={118} />
        //         <Skeleton variant="rectangular" className="mt-2 w-100"  height={118} />
        //     </div>
        // </div>
        );
    }

}


export const AddNurseComponent = withRouter(AddNurse);
