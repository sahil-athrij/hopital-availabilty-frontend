import {Ambulance} from "../../api/model";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import {toast} from "react-toastify";
import {StickyHead} from "../Utils";
import Skeleton from "@mui/material/Skeleton";
import * as React from "react";
import { Container } from "@mui/material";


interface AddAmbulanceState extends AuthState
{
    id: number,
    name: string,
    driver_name: string,
    hospital: string,
    phone_number: number,
    rating: number,
    images: string,
    ready?: boolean,
    error: {
        name: boolean, phone_number: boolean, driver_name: boolean, hospital:boolean,
    }
}


class AddAmbulance extends AuthComponent<AuthPropsLoc, AddAmbulanceState>
{

    constructor(props: AuthPropsLoc)
    {
        super(props);

        this.state = {
            ...this.state,
            error: {
                name: false, phone_number: false, driver_name: false, hospital:false,
            }
        };
    }

    async componentDidMount()
    {
        this.setState({ready: true});
    }

    saveAmbulance = async () =>
    {
        const toSend = this.state;

        toSend.user = null;

        if (this.state.name && this.state.phone_number && this.state.driver_name)
        
            Ambulance.create({...toSend})
                .then(() =>
                {
                    this.props.history.push("/searchambulance/");
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
        if (!this.state.auth)
        {
            this.performAuth();
            return (<></>);
        }

        return (
            this.state.ready ?
                <div>
                    <StickyHead action={"Save"} title="Add Ambulance" onClick={this.saveAmbulance} goBack={this.props.history.goBack}/>

                    <div className="d-flex justify-content-center align-items-center">
                        <Avatar sx={{width:"107px", height:"107px"}} src="../../images/cam-pic.svg"/>
                    </div>

                    <div className="m-4 pb-3 mt-4 ">
                        <TextField className="mt-3 my-3" fullWidth label="Name"
                            InputLabelProps={{shrink: true, }} error={this.state.error.name}
                            helperText={this.state.error.name && "This field is required"}
                            onChange={({target}) => this.setState({
                                name: target.value,
                                error: {...this.state.error, name: (!target.value)}
                            })}/>

                        <TextField className="mt-3 my-3" fullWidth label="Driver's Name"
                            InputLabelProps={{shrink: true, }} error={this.state.error.driver_name}
                            helperText={this.state.error.driver_name && "This field is required"}
                            onChange={({target}) => this.setState({
                                driver_name: target.value,
                                error: {...this.state.error, driver_name: (!target.value)}
                            })}/>

                        <TextField className="mt-3 my-3" fullWidth label="Hospital Name"
                            InputLabelProps={{shrink: true, }} error={this.state.error.hospital}
                            helperText={this.state.error.hospital && "This field is required"}
                            onChange={({target}) => this.setState({
                                hospital: target.value,
                                error: {...this.state.error, hospital: (!target.value)}
                            })}/>

                        <TextField className="mt-3 my-3" fullWidth variant="outlined" label="Phone Number"
                            error={this.state.error.phone_number}
                            helperText={this.state.error.phone_number && "Incorrect format"}
                            InputLabelProps={{shrink: true, }} type="tel"
                            onChange={({target}) => this.setState({
                                phone_number: Number(target.value),
                                error: {
                                    ...this.state.error,
                                    phone_number: (!target.value.match(/^(\+\d{1,3})?\s*\d{10}$/g))
                                }
                            })}/>


                    </div>
                    <Container>
                        <div style={{paddingTop:"5.5rem"}} className="bottom-sec">
                            <hr className="linestyle"/>
                            <div className="endtxt pb-4">We appreciate your kindness</div>
                        </div>
                    </Container>
                </div>
                :
                <div className="main h-100">
                    <StickyHead title="Add Ambulance" onClick={this.saveAmbulance} goBack={this.props.history.goBack}/>
                    <div className="d-flex justify-content-center align-items-center">
                        <Avatar src="/broken-image.jpg"/>
                    </div>

                    <div className="m-4">
                        <Skeleton variant="rectangular" className="mt-2 w-100" height={118}/>
                        <Skeleton variant="rectangular" className="mt-2 w-100" height={118}/>
                        <Skeleton variant="rectangular" className="mt-2 w-100" height={118}/>
                        <Skeleton variant="rectangular" className="mt-2 w-100" height={118}/>
                        <Skeleton variant="rectangular" className="mt-2 w-100" height={118}/>
                        <Skeleton variant="rectangular" className="mt-2 w-100" height={118}/>
                    </div>
                </div>
        );
    }

}


export const AddAmbulanceComponent = withRouter(AddAmbulance);
