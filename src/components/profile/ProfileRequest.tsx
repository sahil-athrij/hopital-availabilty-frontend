import {AuthComponent, AuthProps, AuthState} from "../../api/auth";
import {Container} from "react-bootstrap";
import React from "react";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Step,
    StepLabel,
    Stepper,
    TextField
} from "@material-ui/core";
import Switch from "react-bootstrap/Switch";
import {toast} from "react-toastify";
import {Patient} from "../../api/model";


interface ProfileRequestState extends AuthState {
    position: number,
    Name: string,
    age: string,
    gender: string,
    address: string,

    symptoms: string,
    symdays: string
    spo2: string,
    oxy_bed: string,
    bedtype: string,

    blood: string,
    ct: string,
    covidresult: string,
    ctscore: string,


    attender: boolean,
    attendername: string,
    attenderphone: string,
    relation: string,

    previoushospital: boolean,
    hospitalpref: string,
    srfid: string,
    bunum: string,
}

export class ProfileRequest extends AuthComponent<AuthProps, ProfileRequestState> {

    constructor(props: AuthProps) {
        super(props);
        this.state = {
            ...this.state,
            position: 0,

            Name: '',
            age: '',
            gender: '',
            address: '',

            symptoms: "",
            symdays: new Date().toISOString().substring(0, 10),
            spo2: '',
            oxy_bed: '',
            bedtype: "",

            blood: '',
            ct: '',
            covidresult: '',
            ctscore: '',


            attender: true,
            attendername: '',
            attenderphone: '',
            relation: '',

            previoushospital: true,
            hospitalpref: '',
            srfid: '',
            bunum: "",


        }
    }

    testPos = (num: number) => {
        console.log(this.state)
        let filled: boolean = Boolean(this.state.Name && this.state.age && this.state.gender)
        console.log(filled)
        if (num > 1) {
            filled = Boolean(filled && this.state.symptoms && this.state.symdays && this.state.oxy_bed)
        }
        if (num > 2) {
            filled = Boolean(filled && this.state.ct && this.state.covidresult)
        }
        if (num > 3) {
            filled = Boolean(filled && (!this.state.attender || (this.state.attendername && this.state.attenderphone && this.state.relation)))
        }
        if (num > 4) {
            filled = Boolean(filled && (!this.state.previoushospital || (this.state.hospitalpref && this.state.srfid && this.state.bunum)))
        }
        return filled
    }


    setPosition = (position: number) => {
        let filled = this.testPos(position)
        console.log(filled)
        if (filled)
            this.setState({position})
        else {
            toast.error('Please fill all the required details before proceeding', {
                position: "bottom-center",
            });
        }
    }

    setValue = (name: string, event: string | boolean | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let value
        if (typeof event !== "boolean" && typeof event !== 'string') {
            value = event.target.value
        } else {
            value = event
        }
        //TODO: fix ts ignore
        // @ts-ignore
        this.setState({[name]: value})

    }

    postData = () => {
        Patient.create(this.state).then(() => {
            toast.success('Successfully Submitted Review', {
                position: "bottom-center",
            });
        }).catch((error) => {
            let {detail} = error
            console.log(detail)
            if (detail === 'Invalid token header. No credentials provided.') {
                this.refreshAuth()
                this.postData()
            } else {
                toast.error(detail, {
                    position: "bottom-center",
                });
            }
        })
    }

    render() {
        if (!this.state.auth) {
            this.performAuth()
            return (<></>)
        } else {
            return (
                <div className="bg-grey d-flex flex-column justify-content-between min-vh-100">
                    <Container className="mt-5 pt-5 ">
                        <h4><b>Request For Help</b></h4>

                    </Container>
                    <Container className=" py-3 bg-white neumorphic-input">
                        {this.state.position === 0 &&

                        <div className="d-flex flex-column">
                            <h6 className="text-left"><b>personal Information</b></h6>
                            <TextField label="Patient Name" required={true} variant="outlined"
                                       autoFocus
                                       className="my-1" type="text"
                                       value={this.state.Name}
                                       onChange={(event) =>
                                           this.setValue("Name", event)}
                                       helperText="Please enter Patient Name"
                            />
                            <TextField label="Age" required={true} variant="outlined"
                                       className="my-1" type="number"
                                       value={this.state.age}
                                       onChange={(event) =>
                                           this.setValue("age", event)}
                                       helperText="Please enter Patient Age"
                                       inputProps={{min: 0, max: 130}}

                            />
                            <TextField select label="Gender" variant="outlined" className="my-2"
                                       helperText="Please select Patient Gender"
                                       value={this.state.gender}
                                       onChange={(event) =>
                                           this.setValue("gender", event)}
                                       SelectProps={{
                                           native: true,
                                       }}>
                                <option value="" hidden/>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="NB">Non Binary</option>
                                <option value="NP">Prefer Not To Say</option>
                            </TextField>
                            <TextField
                                label="Address"
                                placeholder="Address"
                                multiline
                                variant="outlined"
                                helperText="Please Enter Patient address"
                                value={this.state.address}
                                onChange={(event) =>
                                    this.setValue("address", event)}
                            />
                        </div>

                        }
                        {this.state.position === 1 &&
                        <div className="d-flex flex-column">
                            <h6 className="text-left"><b>Medical Information</b></h6>
                            <TextField label="Symptoms" required={true} variant="outlined"
                                       autoFocus
                                       value={this.state.symptoms}
                                       onChange={(event) =>
                                           this.setValue("symptoms", event)}
                                       className="my-1" type="text"
                                       helperText="Please enter Patient Symptoms , 1 on each line"
                                       multiline/>
                            <TextField label="Symptoms Start Date" required={true} variant="outlined"
                                       value={this.state.symdays}
                                       onChange={(event) =>
                                           this.setValue("symdays", event)}
                                       className="my-2" type="date"
                                       helperText="Please enter Days since Symptoms started"/>
                            <TextField label="Oxygen Level" variant="outlined"
                                       className="my-1" type="number"
                                       value={this.state.spo2}
                                       inputProps={{min: 0, max: 100}}
                                       onChange={(event) =>
                                           this.setValue("spo2", event)}
                                       helperText="Please enter blood Oxygen level if available"/>
                            <FormControl component="fieldset"
                                         className="d-flex flex-row justify-content-between align-items-center">
                                <FormLabel component="label" required={true}>Is Patient on Oxygen :</FormLabel>
                                <RadioGroup className="d-flex flex-row" defaultValue="yes" aria-label="oxygen"
                                            name="oxygen" value={this.state.oxy_bed}
                                            onChange={(event) =>
                                                this.setValue("oxy_bed", event)}>
                                    <FormControlLabel value="yes" control={<Radio/>} label="Yes"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="no"/>
                                </RadioGroup>
                            </FormControl>
                            <TextField select label="Bed Type Required" variant="outlined" className="my-2"
                                       helperText="Please select The Bed Type if required"
                                       value={this.state.bedtype}
                                       onChange={(event) =>
                                           this.setValue("bedtype", event)}
                                       SelectProps={{
                                           native: true,
                                       }}>
                                <option value="" hidden/>
                                <option value="1">Normal</option>
                                <option value="2">Ventilator</option>
                                <option value="3">ICU</option>
                            </TextField>
                        </div>
                        }
                        {this.state.position === 2 &&
                        <div className="d-flex flex-column">
                            <h6 className="text-left"><b>Tests Information</b></h6>
                            <TextField label="Blood Group" required={true} variant="outlined"
                                       select autoFocus
                                       className="my-1" type="select"
                                       helperText="Please enter Patient Blood Group"
                                       SelectProps={{
                                           native: true,
                                       }}
                                       value={this.state.blood}
                                       onChange={(event) =>
                                           this.setValue("blood", event)}
                            >
                                <option value="" hidden/>
                                <option value="O-">O-</option>
                                <option value="O+">O+</option>
                                <option value="A-">A-</option>
                                <option value="A+">A+</option>
                                <option value="B-">B-</option>
                                <option value="B+">B+</option>
                                <option value="AB-">AB-</option>
                                <option value="AB+">AB+</option>

                            </TextField>
                            <FormControl component="fieldset"
                                         className="d-flex flex-row justify-content-between align-items-center my-2">
                                <FormLabel component="label">CT Scan Done : </FormLabel>
                                <RadioGroup className="d-flex flex-row" defaultValue="yes" aria-label="ct scan"
                                            name="ct"
                                            value={this.state.ct}
                                            onChange={(event) =>
                                                this.setValue("ct", event)}>
                                    <FormControlLabel value="yes" control={<Radio/>} label="Yes"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>


                            <FormControl component="fieldset"
                                         className="d-flex flex-row justify-content-between align-items-center my-2">
                                <FormLabel component="label">Covid Result : </FormLabel>
                                <RadioGroup className="d-flex flex-row" defaultValue="yes" aria-label="covid"
                                            name="covid"
                                            value={this.state.covidresult}
                                            onChange={(event) =>
                                                this.setValue("covidresult", event)}
                                >
                                    <FormControlLabel value="yes" control={<Radio/>} label="Positive"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="Negative"/>
                                </RadioGroup>
                            </FormControl>
                            <TextField label="CT Score" variant="outlined"
                                       className="my-1" type="text"
                                       value={this.state.ctscore}
                                       onChange={(event) =>
                                           this.setValue("ctscore", event)}
                                       helperText="Please enter CT Score"/>
                        </div>

                        }
                        {this.state.position === 3 &&
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-between">

                                <h6 className="text-left"><b>Attender Information</b></h6>
                                <div className="d-flex flex-row align-items-center" onClick={() => {
                                    this.setValue('attender', !this.state.attender)
                                }}>

                                    <small className="mr-3">Attender </small>
                                    <Switch color="default"
                                            defaultChecked={true}
                                            checked={this.state.attender}
                                            autoFocus={true}
                                            onChange={() => {
                                                this.setValue('attender', !this.state.attender)
                                            }}
                                    />
                                </div>
                            </div>
                            {this.state.attender ?
                                <>
                                    <TextField label="Attender Name" required={true} variant="outlined"
                                               className="my-1" type="text"
                                               value={this.state.attendername}
                                               onChange={(event) =>
                                                   this.setValue("attendername", event)}
                                               helperText="Please enter Attender Name"/>
                                    <TextField label="Attender Mobile No" required={true} variant="outlined"
                                               value={this.state.attenderphone}
                                               onChange={(event) =>
                                                   this.setValue("attenderphone", event)}
                                               className="my-2" type="tel"
                                               helperText="Please enter Attender Mobile"
                                    />
                                    <TextField label="Relation to the Patient " required={true} variant="outlined"
                                               value={this.state.relation}
                                               onChange={(event) =>
                                                   this.setValue("relation", event)}
                                               className="my-1" type="text"
                                               helperText="Please enter relation of the attender to the patient"/>
                                </>
                                :
                                <>
                                </>
                            }
                        </div>
                        }
                        {this.state.position === 4 &&
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-between">

                                <h6 className="text-left"><b>Previous Hospital Information</b></h6>
                                <div className="d-flex flex-row align-items-center"
                                     onClick={() => {
                                         this.setValue('previoushospital', !this.state.previoushospital)
                                     }}>

                                    <small className="mr-3">Hospital </small>
                                    <Switch color="default"
                                            checked={this.state.previoushospital}
                                            onChange={() => {
                                                this.setValue('previoushospital', !this.state.previoushospital)
                                            }}
                                            autoFocus={true}

                                    />
                                </div>
                            </div>
                            {this.state.previoushospital ?
                                <>
                                    <TextField label="Previous Hospital Name" required={true} variant="outlined"
                                               className="my-1" type="text"
                                               value={this.state.hospitalpref}
                                               onChange={(event) => {
                                                   this.setValue('hospitalpref', event)
                                               }}
                                               helperText="Please enter Previous Hospital Name"/>
                                    <TextField label="SRF ID" required={true} variant="outlined"
                                               className="my-1" type="text"
                                               helperText="Please enter SRF ID"
                                               value={this.state.srfid}
                                               onChange={(event) => {
                                                   this.setValue('srfid', event)
                                               }}
                                    />
                                    <TextField label="BU Number " required={true} variant="outlined"
                                               className="my-1" type="text"
                                               value={this.state.bunum}
                                               onChange={(event) => {
                                                   this.setValue('bunum', event)
                                               }}
                                               helperText="Please enter the BU number for the previous visit"/>
                                </> :
                                <></>
                            }
                        </div>
                        }
                    </Container>

                    <Container className=" py-2 bg-white neumorphic-input p-0 ">
                        <div className="d-flex flex-row px-3 w-100 justify-content-center">
                            {this.state.position !== 0 &&
                            <button className="btn w-50 btn-light" onClick={() => {
                                this.setPosition(this.state.position - 1)
                            }}>Previous</button>
                            }
                            {this.state.position !== 4 ?
                                <button className="btn w-50 btn-primary blue-gradient"
                                        onClick={() => {
                                            this.setPosition(this.state.position + 1)
                                        }}> Next</button> :
                                <button className="btn w-50 btn-success" onClick={this.postData}> Submit</button>}
                        </div>
                        <Stepper activeStep={this.state.position} alternativeLabel>
                            <Step onClick={() => {
                                this.setPosition(0)
                            }}><StepLabel/></Step>
                            <Step onClick={() => {
                                this.setPosition(1)
                            }}><StepLabel/></Step>
                            <Step onClick={() => {
                                this.setPosition(2)
                            }}><StepLabel/></Step>
                            <Step onClick={() => {
                                this.setPosition(3)
                            }}><StepLabel/></Step>
                            <Step onClick={() => {
                                this.setPosition(4)
                            }}><StepLabel/></Step>
                        </Stepper>
                        <div className="space-50"/>
                    </Container>
                </div>
            )
        }
    }

}
