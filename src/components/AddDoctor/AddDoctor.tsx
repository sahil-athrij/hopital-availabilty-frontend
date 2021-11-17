import {Department, DepartmentObject, Doctor, Language, LanguageObject, WorkingTime} from "../../api/model";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";

import {withRouter} from "react-router";
import React, {ChangeEvent, Component} from "react";
import CloseIcon from "@mui/icons-material/Close";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TableContainer from "@mui/material/TableContainer";
import {Autocomplete, Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {toast} from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import {StickyHead} from "../Utils";
import MuiPhoneNumber from "material-ui-phone-number";


interface AddDoctorState extends AuthState
{
    name: string,
    working_time: Array<WorkingTime>,
    department: number,
    experience: number,
    specialization: string,
    phone_number: number,
    whatsapp_number: number,
    email: string,
    address: string,
    language: Array<string>,
    languages: Array<LanguageObject>,
    searchTerm: string,
    about: string,
    allDepartments: Array<DepartmentObject>,
    hospital: Array<number>,
    ready?: boolean,
    ima_number: string,
    error: { name: boolean, phone_number: boolean, whatsapp_number: boolean, email: boolean, address: boolean, language:boolean, about: boolean, department: boolean}
}

export class TimePickers extends Component<{ hospital: number, onChange: (times: Array<WorkingTime>) => void }, { times: Array<WorkingTime> }>
{

    days: Array<string>;
    time_template: WorkingTime;

    constructor(props: { hospital: number, onChange: (times: Array<WorkingTime>) => void })
    {
        super(props);

        this.time_template = {
            hospital: this.props.hospital,
            working_time: {starting_time: null, ending_time: null, day: null},
        };
        this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        this.state = {times: [JSON.parse(JSON.stringify(this.time_template))]};
    }

    handleChange(value: string | number, type: "starting_time" | "ending_time" | "day", key: number)
    {
        const {times} = this.state;

        times[key].working_time[type] = value as unknown as null;
        const {starting_time, ending_time, day} = times[key].working_time;

        if (times.length === key + 1 && starting_time && ending_time && day !== null)
        
            times.push(JSON.parse(JSON.stringify(this.time_template)));
        

        this.setState({times});
        this.props.onChange(times);
    }

    render()
    {
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
                                <TableRow key={key}>
                                    <TableCell className="px-0 col-5 pr-1" component="th" scope="row">
                                        <TextField select fullWidth label="-" size="small"
                                            value={item.working_time.day}
                                            onChange={({target}) => this.handleChange(Number(target.value), "day", key)}>
                                            {this.days.map((day, key) => (
                                                <MenuItem key={key}>{day}</MenuItem>)
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

interface AddDoctorProps extends AuthPropsLoc
{
    withoutHospital?: boolean,
}


class AddDoctor extends AuthComponent<AddDoctorProps, AddDoctorState>
{

    constructor(props: AddDoctorProps)
    {
        super(props);

        this.state = {
            ...this.state,

            languages: [],
            searchTerm:"",
            error: {
                name: false,
                phone_number: false,
                whatsapp_number: false,
                email: false,
                address: false,
                language: false,
                about: false,
                department: false
            }
        };
        this.getlanguages();
    }

    async componentDidMount()
    {
        super.componentDidMount();
        if (!this.props.withoutHospital)
        {
            const {hospital} = this.props.match.params as unknown as { hospital: number };
            const departments = await Department.filter({hospital});

            this.setState({
                allDepartments: departments.results as Array<DepartmentObject>,
                hospital: [hospital],
                ready: true,
            });
        }

        else
        
            this.setState({ready: true});
        


    }

    async getlanguages () 
    {
        Language.filter({search: this.state.searchTerm}).then((languages) => 
        {
            const results = languages.results;
            this.setState({languages: results});
        });

    } 

    editSearchTerm = (e: string) => 
    {
        this.setState({searchTerm: e}, ()=> 
        {
            this.getlanguages();
        });
    };

    saveDoctor = async () => 
    {
        const toSend = {...this.state,
            language: this.state.language.map((name1)=> this.state.languages.find(({name})=> name===name1)?.id)};

        toSend.user = undefined;

        if (!this.props.withoutHospital)
        
            toSend.working_time = toSend.working_time
                .filter(({working_time}) => working_time.day !== null)
                .map(({
                    working_time,
                    hospital
                }) =>
                {
                    return {
                        hospital,
                        working_time: {
                            starting_time: new Date(working_time.starting_time as string).toTimeString().split(" ")[0],
                            ending_time: new Date(working_time.ending_time as string).toTimeString().split(" ")[0],
                            day: working_time.day
                        }
                    };
                });
        


        if (this.state.name && this.state.phone_number)
        
            !this.props.withoutHospital ?
                Doctor.create({...toSend, department: [toSend.department]})
                    .then(() =>
                    {
                        this.props.history.push(`/details/${this.state.hospital}`);
                        toast.success("thank you for the contribution", {
                            position: "bottom-center"
                        });
                    }).catch((error) =>
                    {
                        toast.error(error.details, {
                            position: "bottom-center"
                        });
                    })
                : Doctor.create({...toSend})
                    .then(() =>
                    {
                        this.props.history.push("/searchdoctor/");
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

    handlePhoneChange = (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    {
        if (typeof value !== "string") return;
        value = value.replaceAll(/[()-]/g, "").replaceAll(" ", "");
        this.setState({
            phone_number: Number(value)
            , error: {...this.state.error, phone_number: (!value.match(/^(\+\d{1,3})?\s*\d{9,15}$/g))}
        });
    };

    handleWhatsappChange = (value: string) =>
    {
        this.setState({whatsapp_number: Number(value)});
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
                    {/*TODO plz dont delete me*/}

                    <StickyHead title="Add Doctor" onClick={this.saveDoctor} goBack={this.props.history.goBack}/>

                    <div className="d-flex justify-content-center align-items-center">
                        <Avatar sx={{width: "107px", height: "107px"}} src="../../images/cam-pic.svg"/>
                    </div>

                    <div className="m-4 pb-5">
                        <TextField className="mt-2" fullWidth label="Name" required
                            InputLabelProps={{shrink: true, }} error={this.state.error.name}
                            helperText={this.state.error.name && "This field is required"}
                            onChange={({target}) => this.setState({
                                name: target.value,
                                error: {...this.state.error, name: (!target.value)}
                            })}/>

                        <TextField className="mt-4" fullWidth label="IMA Number"
                            InputLabelProps={{shrink: true, }}                            
                            onChange={({target}) => this.setState({ima_number: target.value})}/>


                        {!this.props.withoutHospital && 

                        <TextField
                            className="mt-4" fullWidth variant="outlined" select label="Department"
                            error={this.state.error.department} required
                            helperText={this.state.error.department && "This field is required"}
                            InputLabelProps={{shrink: true, }} size="small"
                            onChange={({target}) => this.setState({department: Number(target.value)})}>
                            {this.state.allDepartments.map(({name, id}, i) =>
                                <MenuItem value={id} key={i}>{name.name}</MenuItem>
                            )}
                            <MenuItem value={"add"} key={"add"}
                                onClick={() => this.props.history.push(`/department/add/${this.state.hospital}`)}>
                                Add New Department
                            </MenuItem>
                        </TextField>}

                        <TextField className="mt-4" fullWidth variant="outlined" label="Years Of Experience"
                            InputLabelProps={{shrink: true, }} type="number"
                            onChange={({target}) => this.setState({experience: Number(target.value)})}/>

                        <MuiPhoneNumber
                            className="mt-4"
                            fullWidth
                            variant="outlined"
                            label="Contact Number"
                            InputLabelProps={{shrink: true, }}
                            defaultCountry={"in"}
                            required
                            onChange={(e) => this.handlePhoneChange(e)}
                            error={this.state.error.phone_number}
                            helperText={this.state.error.phone_number && "Incorrect format"}
                            type="tel"
                        />

                        {/* <TextField className="mt-4" fullWidth variant="outlined" label="Contact Number"
                            error={this.state.error.phone_number} required
                            helperText={this.state.error.phone_number && "Incorrect format"}
                            InputLabelProps={{shrink: true, }} type="tel"
                            onChange={({target}) => this.setState({phone_number: Number(target.value),  error: {...this.state.error, phone_number: (!target.value.match(/^(\+\d{1,3})?\s*\d{10}$/g))}})}/> */}

                        <MuiPhoneNumber
                            className="mt-4"
                            fullWidth variant="outlined"
                            label="Whatsapp Number"
                            defaultCountry={"in"}                        
                            InputLabelProps={{shrink: true, }}
                            type="tel"
                            onChange={(e) => this.handlePhoneChange(e)}
                        />

                        {/* <TextField className="mt-4" fullWidth variant="outlined" label="Whatsapp Number"
                            error={this.state.error.whatsapp_number}
                            helperText={this.state.error.whatsapp_number && "Incorrect format"}
                            InputLabelProps={{shrink: true, }} type="tel"
                            onChange={({target}) => this.setState({whatsapp_number: Number(target.value),  error: {...this.state.error, whatsapp_number: (!target.value.match(/^(\+\d{1,3})?\s*\d{10}$/g))}})}/> */}

                        <TextField className="mt-4" fullWidth variant="outlined" label="Email"
                            error={this.state.error.email}
                            helperText={this.state.error.email && "Incorrect format"}
                            InputLabelProps={{shrink: true, }} type="email"
                            onChange={({target}) => this.setState({
                                email: target.value,
                                error: {
                                    ...this.state.error,
                                    email: (!target.value.match(/\S+@\S+\.\S+/g))
                                }
                            })}/>

                        <TextField className="mt-4" fullWidth label="Address or Location"
                            InputLabelProps={{shrink: true, }} error={this.state.error.address}
                            helperText={this.state.error.address && "This field is required"}
                            onChange={({target}) => this.setState({address: target.value, error: {...this.state.error, address: (!target.value)} })}/>
                        
                        {/* <TextField className="mt-4" fullWidth label="Language"
                            InputLabelProps={{shrink: true, }} error={this.state.error.language}
                            helperText={this.state.error.language && "This field is required"}
                            onChange={({target}) => this.setState({language: target.value, error: {...this.state.error, language: (!target.value)} })}>
                        </TextField>           */}   
                        
                        <Autocomplete className="mt-4"
                            multiple
                            options={this.state.languages.map(({name})=> name)}
                            onChange={(_, language)=> this.setState({language})}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Languages"
                                    InputLabelProps={{shrink: true, }}
                                    onChange = {(event) => this.editSearchTerm(event.target.value)}
                                />)}
                        />

                        {!this.props.withoutHospital && <TimePickers hospital={this.state.hospital[0]}
                            onChange={(times) => this.setState({working_time: times})}/>}

                        <TextField className="mt-4 mb-5" fullWidth variant="outlined" label="Tell us more"
                            InputLabelProps={{shrink: true, }}
                            onChange={({target}) => this.setState({about: target.value})}/>

                    </div>

                </div>
                :
                <div className="main h-100">
                    <div className="head-sec d-flex justify-content-between p-3 shadow-none h-25">
                        <CloseIcon onClick={() => this.props.history.goBack()}/>
                        <p className="align-self-center m-0 p-0 justify-content-center"><b>Add Doctor</b></p>
                        <Button className="sub" variant="contained">Submit</Button>
                    </div>
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


export const AddDoctorComponent = withRouter(AddDoctor);
