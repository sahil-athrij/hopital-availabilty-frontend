import {Department, DepartmentObject, Doctor, WorkingTime} from "../../api/model";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";

import {withRouter} from "react-router";
import {MenuItem, TextField} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {Avatar} from '@material-ui/core';
import React from "react";
import close from "../../images/close.svg";
import {Skeleton} from "antd";

interface AddDoctorState extends AuthState {
    name: string,
    working_time: Array<WorkingTime>,
    departments: Array<number>,
    experience: number,
    specialization: string,
    phone_number: number,
    about: string,
    allDepartments: Array<DepartmentObject>,
    hospital: Array<number>,
    ready?: boolean
}

class AddDoctor extends AuthComponent<AuthPropsLoc, AddDoctorState> {

    async componentDidMount() {
        super.componentDidMount();
        // @ts-ignore
        const {hospital} = this.props.match.params;
        const departments = await Department.filter({hospital});

        this.setState({
            allDepartments: departments.results as Array<DepartmentObject>,
            hospital: [hospital],
            ready: true
        });
    }

    saveDoctor = async () => {
        console.log(this.state)
        await Doctor.create(this.state)
    }

    render() {
        return (
            this.state.ready ?
                <div>
                    <div className="d-flex justify-content-between p-3 ">
                        <img src={close} alt={"exit"}/>
                        <p className="align-self-center"><b>add doctor details</b></p>
                        <Button variant="contained" onClick={this.saveDoctor}>Submit</Button>
                    </div>

                    <div className="d-flex justify-content-center align-items-center">
                        <Avatar src="/broken-image.jpg"/>
                    </div>

                    <div className="m-4">

                        <TextField className="mt-2" fullWidth variant="outlined" label="Name"
                                   InputLabelProps={{shrink: true,}} size="small"
                                   onChange={({target}) => this.setState({name: target.value})}/>
                        <TextField className="mt-4" fullWidth variant="outlined" select label="Department"
                                   InputLabelProps={{shrink: true,}} size="small"
                                   value={this.state.departments[0]}
                                   onChange={({target}) => this.setState({departments: [Number(target.value)]})}>
                            {this.state.allDepartments.map(({name, id}, i) =>
                                <MenuItem value={id} key={i}>{name.name}</MenuItem>
                            )}
                            <MenuItem value={"add"} key={"add"}
                                      onClick={() => this.props.history.push(`/department/add/${this.state.hospital}`)}>
                                Add New Department
                            </MenuItem>
                        </TextField>
                        <TextField className="mt-4" fullWidth variant="outlined" label="Years Of Experience"
                                   InputLabelProps={{shrink: true,}} size="small"
                                   onChange={({target}) => this.setState({experience: Number(target.value)})}/>
                        <TextField className="mt-4" fullWidth variant="outlined" label="Contact Number"
                                   InputLabelProps={{shrink: true,}} size="small"
                                   onChange={({target}) => this.setState({phone_number: Number(target.value)})}/>
                        <TextField className="mt-4" fullWidth variant="outlined" label="Tell us more"
                                   InputLabelProps={{shrink: true,}} size="small"
                                   onChange={({target}) => this.setState({about: target.value})}/>
                    </div>

                </div>
                :
                <div>
                    <div className="d-flex justify-content-between p-3 ">
                        <img src={close} alt={"exit"}/>
                        <p className="align-self-center"><b>add doctor details</b></p>
                        <Button variant="contained" disabled={true}>Submit</Button>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Avatar src="/broken-image.jpg"/>
                    </div>

                    <div className="m-4">
                        <Skeleton.Input className="mt-2 w-100" active={true} size={"large"}/>
                        <Skeleton.Input className="mt-2 w-100" active={true} size={"large"}/>
                        <Skeleton.Input className="mt-2 w-100" active={true} size={"large"}/>
                        <Skeleton.Input className="mt-2 w-100" active={true} size={"large"}/>
                        <Skeleton.Input className="mt-2 w-100" active={true} size={"large"}/>
                        <Skeleton.Input className="mt-2 w-100" active={true} size={"large"}/>
                    </div>
                </div>
        );
    }

}


export const AddDoctorComponent = withRouter(AddDoctor)