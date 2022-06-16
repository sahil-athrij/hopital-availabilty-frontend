import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {StickyHead} from "../Utils";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {Link} from "react-router-dom";
import * as React from "react";
import {Patient, PatientObject} from "../../api/model";
import {withRouter} from "react-router";
import IconButton from "@mui/material/IconButton";
import {toast} from "react-toastify";


interface QuickRequestState extends AuthState {
    model: PatientObject;
    request_type: string;
    age: number;
    gender: string;
    location: string;
    mobile_number: number;
    reason: string;
    attachment: string | ArrayBuffer | null;
    attachment_name: string;
    account_holder: string;
    account_no: number;
    ifsc: string;
    bank_name: string;
}

class QuickRequest extends AuthComponent<AuthPropsLoc, QuickRequestState>
{

    constructor(props: AuthPropsLoc)
    {
        super(props);
        this.state = {
            ...this.state,
            request_type: "",
            gender: "",
            location: "",
            reason: "",
            attachment: "",
            attachment_name: "",
            account_holder: "",
            ifsc: "",
            bank_name: ""
        };
    }

    saveRequest = async () =>
    {
        const toSend = this.state;

        toSend.user = undefined;

        if (this.state.request_type && this.state.age && this.state.gender && this.state.location && this.state.mobile_number)
            Patient.create({...toSend, })
                .then(() =>
                {
                    this.props.history.push("/");
                    toast.success("Successfully added your details", {
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
            <>
                <StickyHead title="Quick Request" onClick={() => this.saveRequest()} goBack={this.props.history.goBack}/>
                
                <div className="m-4">
                    <TextField value={this.state.request_type} className="mt-4" fullWidth variant="outlined" select
                        label="Request type *"
                        InputLabelProps={{shrink: true, }}
                        onChange={({target}) => this.setState({request_type: target.value})}
                    >
                        <MenuItem value={"medical request"}>Medical Request</MenuItem>
                        <MenuItem value={"financial request"}>Financial Request</MenuItem>
                        <MenuItem value={"blood request"}>Blood Request</MenuItem>
                        <MenuItem value={"food request"}>Food Request</MenuItem>
                        <MenuItem value={"other"}>other</MenuItem>
                    </TextField>
                    <div className="d-flex justify-content-between">
                        <TextField sx={{width: 90}} value={this.state.age} className="mt-4" variant="outlined"
                            label="Age *"
                            InputLabelProps={{shrink: true, }}
                            onChange={({target}) => this.setState({age: Number(target.value)})}/>
                        <TextField sx={{width: 212}} value={this.state.gender} className="mt-4" select
                            variant="outlined" label="Gender *"
                            InputLabelProps={{shrink: true, }}
                            onChange={({target}) => this.setState({gender: target.value})}
                        >
                            <MenuItem value={"M"}>Male</MenuItem>
                            <MenuItem value={"F"}>Female</MenuItem>
                            <MenuItem value={"NB"}>Non Binary</MenuItem>
                            <MenuItem value={"NP"}>Prefer Not to Say</MenuItem>
                        </TextField>
                    </div>
                    <TextField value={this.state.location} className="mt-4" fullWidth variant="outlined"
                        label="Location *" InputLabelProps={{shrink: true, }}
                        onChange={({target}) => this.setState({location: target.value})}/>
                    <TextField value={this.state.mobile_number} className="mt-4" fullWidth variant="outlined"
                        label="Mobile Number *" InputLabelProps={{shrink: true, }}
                        onChange={({target}) => this.setState({mobile_number: Number(target.value)})}/>
                    <TextField value={this.state.reason} rows={4} multiline className="mt-4" fullWidth
                        variant="outlined" label="Reason " InputLabelProps={{shrink: true, }}
                        onChange={({target}) => this.setState({reason: target.value})}/>
                    <label className="d-flex mt-4 align-items-center" htmlFor="icon-button-file">
                        <IconButton component="span" style={{color: "#222B45", fontSize: "15px", padding: "0"}}>
                            <AttachFileIcon sx={{transform: "rotate(40deg)"}}/>
                            Upload Attachment
                        </IconButton>
                    </label>
                    {this.state.attachment_name}
                    <input id="icon-button-file" type="file" name="file"
                        style={{ visibility: "hidden"}} onChange={({target}) =>
                        {
                            const files = target.files;
                            const reader = new FileReader();
                            if (files)
                            {
                                this.setState({attachment_name: files[0].name});
                                reader.readAsDataURL(files[0]);
                                reader.onload=(e)=>
                                {
                                    if(e.target)
                                    
                                        this.setState({attachment: e.target.result});
                                    
                                };
                            }
                        }} />
                    {this.state.request_type === "financial request" ?
                        <>
                            <div className="d-flex">
                                <b>Please enter Account details</b>
                            </div>
                            <TextField value={this.state.account_holder} className="mt-4" fullWidth variant="outlined"
                                label="Name *" InputLabelProps={{shrink: true, }}
                                onChange={({target}) => this.setState({account_holder: target.value})}/>
                            <TextField value={this.state.account_no} className="mt-4" fullWidth variant="outlined"
                                label="Account Number *" InputLabelProps={{shrink: true, }}
                                onChange={({target}) => this.setState({account_no: Number(target.value)})}/>
                            <TextField value={this.state.ifsc} className="mt-4" fullWidth variant="outlined"
                                label="IFSC Code *" InputLabelProps={{shrink: true, }}
                                onChange={({target}) => this.setState({ifsc: target.value})}/>
                            <TextField value={this.state.bank_name} className="mt-4" fullWidth variant="outlined"
                                label="Bank Name *" InputLabelProps={{shrink: true, }}
                                onChange={({target}) => this.setState({bank_name: target.value})}/>
                        </> : <></>}
                    <div className="d-flex mt-4">
                        <b>For detailed Medical Request</b>
                    </div>
                    <Link className="d-flex mb-3" to={"/addRequest"}>Click Here</Link>
                </div>
            </>
        );
    }
}

export const Quickrequest = withRouter(QuickRequest);
