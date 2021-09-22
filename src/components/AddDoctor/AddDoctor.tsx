import {Department, DepartmentObject, Doctor, WorkingTime} from "../../api/model";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";

import {withRouter} from "react-router";
import React, {Component} from "react";
import close from "../../images/close.svg";

import {Skeleton} from "antd";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TableContainer from "@mui/material/TableContainer";
import {Table, TableHead, TableRow, TableCell, TableBody, Button} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {toast} from "react-toastify";


interface AddDoctorState extends AuthState {
    name: string,
    working_time: Array<WorkingTime>,
    department: number,
    experience: number,
    specialization: string,
    phone_number: number,
    about: string,
    allDepartments: Array<DepartmentObject>,
    hospital: Array<number>,
    ready?: boolean
}

export class TimePickers extends Component<{ hospital: number, onChange: (times: Array<WorkingTime>) => void }, { times: Array<WorkingTime> }> {

    days: Array<string>;
    time_template: WorkingTime;

    constructor(props: { hospital: number, onChange: (times: Array<WorkingTime>) => void }) {
        super(props);

        this.time_template = {
            hospital: this.props.hospital,
            working_time: {starting_time: null, ending_time: null, day: null},
        };
        this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        this.state = {times: [JSON.parse(JSON.stringify(this.time_template))]}
    }

    handleChange(value: string | number, type: "starting_time" | "ending_time" | "day", key: number) {
        const {times} = this.state;

        // TODO: fix if ts is still broken
        // @ts-ignore
        times[key].working_time[type] = value;
        const {starting_time, ending_time, day} = times[key].working_time;

        if (times.length === key + 1 && starting_time && ending_time && day !== null)
            times.push(JSON.parse(JSON.stringify(this.time_template)));

        this.setState({times});
        this.props.onChange(times);
    }

    render() {
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TableContainer>
                    <Table sx={{minWidth: 200}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Day</TableCell>
                                <TableCell>Starting</TableCell>
                                <TableCell>Ending</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.times.map((item, key) => (
                                <TableRow>
                                    <TableCell className="px-0 col-5 pr-1" component="th" scope="row">
                                        <TextField select fullWidth label="-" size="small"
                                                   value={item.working_time.day}
                                                   onChange={({target}) => this.handleChange(Number(target.value), "day", key)}>
                                            {this.days.map((day, key) => (
                                                <MenuItem value={key}>{day}</MenuItem>)
                                            )
                                            }
                                        </TextField>
                                    </TableCell>
                                    <TableCell className="px-0 pr-1" align="right">
                                        <MobileTimePicker
                                            value={item.working_time.starting_time}
                                            onChange={(value) => value && this.handleChange(value, "starting_time", key)}
                                            renderInput={(params) => <TextField {...params} label="-"
                                                                                size="small"/>}
                                        /></TableCell>
                                    <TableCell className="px-0" align="right">
                                        <MobileTimePicker
                                            value={item.working_time.ending_time}
                                            onChange={(value) => value && this.handleChange(value, "ending_time", key)}
                                            renderInput={(params) => <TextField {...params} label="-"
                                                                                size="small"/>}
                                        /></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LocalizationProvider>
        );
    }
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
            ready: true,
        });
    }

    saveDoctor = async () => {
        console.log(this.state)
        const toSend = this.state;

        toSend.user = null;

        toSend.working_time = toSend.working_time
            .filter(({working_time}) => working_time.day != null)
            .map(({
                      working_time,
                      hospital
                  }) => {
                return {
                    hospital,
                    working_time: {
                        starting_time: new Date(working_time.starting_time as string).toTimeString().split(' ')[0],
                        ending_time: new Date(working_time.ending_time as string).toTimeString().split(' ')[0],
                        day: working_time.day
                    }
                }
            });

        if (this.state.name && this.state.phone_number)
            Doctor.create({...toSend, department: [toSend.department]})
                .then(() => {
                    this.props.history.push(`/details/${this.state.hospital}`)
                    toast.success('thank you for the contribution', {
                        position: 'bottom-center'
                    })
                }).catch((error) => {
                toast.error(error.details, {
                    position: 'bottom-center'
                })
            })
        else
            toast.error("please enter the required details", {
                position: 'bottom-center'
            })
    }

    render() {
        return (
            this.state.ready ?
                <div>
                    <div className="head-sec d-flex justify-content-between p-3 shadow-none h-25">
                        <img src={close} onClick={() => this.props.history.goBack()} alt={"close"}/>
                        <p className="align-self-center m-0 p-0 justify-content-center"><b>Add Doctor</b></p>
                        <Button className="sub" variant="contained" onClick={this.saveDoctor}>Submit</Button>
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
                                   onChange={({target}) => this.setState({department: Number(target.value)})}>
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
                        <TimePickers hospital={this.state.hospital[0]}
                                     onChange={(times) => this.setState({working_time: times})}/>
                        <TextField className="mt-4" fullWidth variant="outlined" label="Tell us more"
                                   InputLabelProps={{shrink: true,}} size="small"
                                   onChange={({target}) => this.setState({about: target.value})}/>
                    </div>

                </div>
                :
                <div className="main h-100">
                    <div className="head-sec d-flex justify-content-between p-3 shadow-none h-25">
                        <img src={close} onClick={() => this.props.history.goBack()} alt={"close"}/>
                        <p className="align-self-center m-0 p-0 justify-content-center"><b>Add Doctor</b></p>
                        <Button className="sub" variant="contained">Submit</Button>
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