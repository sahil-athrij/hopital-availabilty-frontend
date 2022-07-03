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
    patient_data:Partial<{
        request_type: string;
        age: number;
        gender: string;
        address: string;
        mobile_number: number;
        reason: string;
        attachment: File;
        attachment_name: string;
        account_holder: string;
        account_no: number;
        ifsc: string;
        bank_name: string;
        Name: string;
    }>
    
}

class QuickRequest extends AuthComponent<AuthPropsLoc, QuickRequestState>
{

    constructor(props: AuthPropsLoc)
    {
        super(props);
        this.state = {
            ...this.state,
            patient_data: {}
        };
    }

    updatePatientData = (obj: typeof this.state.patient_data)=>{
        this.setState({patient_data:{...this.state.patient_data,...obj}});
    }

    saveRequest = async () =>
    {
        const toSend = this.state.patient_data;
        console.log(toSend)
        //toSend.user = undefined;

        if (this.state.patient_data.request_type && this.state.patient_data.age && this.state.patient_data.gender && this.state.patient_data.address && this.state.patient_data.mobile_number && this.state.patient_data.Name){
            const formData = new FormData();
            for ( let key in toSend ) {
                const d = toSend[key as keyof typeof toSend];
                if (d !== undefined){
                    console.log(d);
                    formData.append(key, typeof d === 'number'? d.toString():d);
                }
            }
            
            Patient.create(formData)
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
            }else
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
                    <TextField value={this.state.patient_data.request_type} className="mt-4" fullWidth variant="outlined" select
                        label="Request type *"
                        InputLabelProps={{shrink: true, }}
                        onChange={({target}) => this.updatePatientData({request_type: target.value})}
                    >
                        <MenuItem value={"M"}>Medical Request</MenuItem>
                        <MenuItem value={"FI"}>Financial Request</MenuItem>
                        <MenuItem value={"B"}>Blood RequestFormData</MenuItem>
                        <MenuItem value={"F"}>Food Request</MenuItem>
                        <MenuItem value={"O"}>other</MenuItem>
                    </TextField>
                    <TextField value={this.state.patient_data.Name} className="mt-4" fullWidth variant="outlined"
                        label="Name *" InputLabelProps={{shrink: true, }}
                        onChange={({target}) => this.updatePatientData({Name: target.value})}/>
                    <div className="d-flex justify-content-between">
                        
                        <TextField sx={{width: 90}} value={this.state.patient_data.age} className="mt-4" variant="outlined"
                            label="Age *"
                            InputLabelProps={{shrink: true, }}
                            onChange={({target}) => this.updatePatientData({age: Number(target.value)})}/>
                        <TextField sx={{width: 212}} value={this.state.patient_data.gender} className="mt-4" select
                            variant="outlined" label="Gender *"
                            InputLabelProps={{shrink: true, }}
                            onChange={({target}) => this.updatePatientData({gender: target.value})}
                        >
                            <MenuItem value={"M"}>Male</MenuItem>
                            <MenuItem value={"F"}>Female</MenuItem>
                            <MenuItem value={"NB"}>Non Binary</MenuItem>
                            <MenuItem value={"NP"}>Prefer Not to Say</MenuItem>
                        </TextField>
                    </div>
                    <TextField value={this.state.patient_data.address} className="mt-4" fullWidth variant="outlined"
                        label="Location *" InputLabelProps={{shrink: true, }}
                        onChange={({target}) => this.updatePatientData({address: target.value})}/>
                    <TextField value={this.state.patient_data.mobile_number} className="mt-4" fullWidth variant="outlined"
                        label="Mobile Number *" InputLabelProps={{shrink: true, }}
                        onChange={({target}) => this.updatePatientData({mobile_number: Number(target.value)})}/>
                    <TextField value={this.state.patient_data.reason} rows={4} multiline className="mt-4" fullWidth
                        variant="outlined" label="Reason " InputLabelProps={{shrink: true, }}
                        onChange={({target}) => this.updatePatientData({reason: target.value})}/>
                    <label className="d-flex mt-4 align-items-center" htmlFor="icon-button-file">
                        <IconButton component="span" style={{color: "#222B45", fontSize: "15px", padding: "0"}}>
                            <AttachFileIcon sx={{transform: "rotate(40deg)"}}/>
                            Upload Attachment
                        </IconButton>
                    </label>
                    {this.state.patient_data.attachment_name}
                    <input id="icon-button-file" type="file" name="file"
                        style={{ visibility: "hidden"}} onChange={({target}) =>
                        {
                            const files = target.files;
                            const reader = new FileReader();
                            if (files)
                            {

                                this.updatePatientData({attachment: files[0]});

                                this.updatePatientData({attachment_name: files[0].name});
                                // reader.readAsDataURL(files[0]);
                                // reader.onload=(e)=>
                                // {
                                //     if(e.target)
                                    
                                //         this.updatePatientData({attachment: e.target.result});
                                    
                                // };
                            }
                        }} />
                    {this.state.patient_data.request_type === "FI" ?
                        <>
                            <div className="d-flex">
                                <b>Please enter Account details</b>
                            </div>
                            <TextField value={this.state.patient_data.account_holder} className="mt-4" fullWidth variant="outlined"
                                label="Name *" InputLabelProps={{shrink: true, }}
                                onChange={({target}) => this.updatePatientData({account_holder: target.value})}/>
                            <TextField value={this.state.patient_data.account_no} className="mt-4" fullWidth variant="outlined"
                                label="Account Number *" InputLabelProps={{shrink: true, }}
                                onChange={({target}) => this.updatePatientData({account_no: Number(target.value)})}/>
                            <TextField value={this.state.patient_data.ifsc} className="mt-4" fullWidth variant="outlined"
                                label="IFSC Code *" InputLabelProps={{shrink: true, }}
                                onChange={({target}) => this.updatePatientData({ifsc: target.value})}/>
                            <TextField value={this.state.patient_data.bank_name} className="mt-4" fullWidth variant="outlined"
                                label="Bank Name *" InputLabelProps={{shrink: true, }}
                                onChange={({target}) => this.updatePatientData({bank_name: target.value})}/>
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
