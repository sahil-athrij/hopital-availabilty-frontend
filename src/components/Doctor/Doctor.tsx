import {Appointment, Doctor, DoctorObject, Patient, PatientObject} from "../../api/model";

import "./doctor.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "../../images/doctorhead.jpg";
import icon from "./icons/icon@2x.svg";
import icon2 from "./icons/icon-2@2x.svg";
import icon3 from "./icons/icon-3@2x.svg";
import icon4 from "./icons/icon-4@2x.svg";
import icon5 from "./icons/icon-5@2x.svg";
import icon6 from "./icons/icon-6@2x.svg";
import icon7 from "./icons/icon-7@2x.svg";

import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";

import {Container} from "react-bootstrap";
import Loader from "react-loader-spinner";
import {withRouter} from "react-router";
import React from "react";
import {BigBlueButton} from "../Utils";
import CustomDatePicker from "./CustomDatePicker";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import {toast} from "react-toastify";
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";

interface DetailsState extends AuthState
{
    id: number,
    model: DoctorObject,
    ready: boolean,
    open_availability: HTMLElement | null,
    popovertext: string,
    show_review: boolean,
    booking: boolean;
    slot: {date: string, start?: string, end?: string};
    patient: number;
    helped: Array<PatientObject>
}

interface StatsProps
{
    value: number | string,
    title: string,
    icon: string,
    class: string
}

interface CommunicationProps
{
    phone_number: number,
    title: string,
    icon: string,
    text: string,
    class: string
}

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

class DoctorStats extends React.Component<StatsProps, Record<string, unknown>>
{
    render()
    {
        return (
            <div className="overlap-group mx-2">
                <div className={`group ${this.props.class}`}>
                    <img
                        alt={this.props.title}
                        className="icon-3"
                        src={this.props.icon}
                    />
                </div>
                <div className="stats-value nunito-semi-bold-ebony-clay-17px">
                    {this.props.value}
                </div>
                <div className="patients nunito-bold-lynch-12px">
                    {this.props.title}
                </div>
            </div>
        );
    }
}

class Communication extends React.Component<CommunicationProps, Record<string, unknown>>
{
    render()
    {
        return (
            <a style={{textDecoration: "none"}} href={`tel:${this.props.phone_number}`}>
                <div className="message">
                    <div className={`overlap-group-1 ${this.props.class}`}>
                        <img alt={""}
                            className="icon"
                            src={this.props.icon}
                        />
                    </div>
                    <div className="flex-col">

                        <div className="messaging nunito-bold-ebony-clay-16px">{this.props.title}</div>
                        <p className="chat-me-up-share-ph nunito-bold-lynch-12px">{this.props.text}</p>
                    </div>

                </div>
            </a>
        );
    }
}

class DoctorLoc extends AuthComponent<AuthPropsLoc, DetailsState>
{


    constructor(props: AuthPropsLoc)
    {
        super(props);
        this.state = {
            ...this.state,
            id: 0,
            ready: false,
            open_availability: null,
            popovertext: "Percentage Probability of Availing the services",
            show_review: false,
            booking: false,
            patient: -1,
            slot: {date: ""}
        };
    }

    async refreshData()
    {
        this.setState({ready: false});

        const docId = Number(this.props.match.params.docId);
        const doctor = await Doctor.get(docId) as DoctorObject;
        const {results} = await Patient.action_general("help", {}, true);

        this.setState({model: doctor, ready: true, id: docId, helped: results, patient: this.state.user?.id || -1});

    }

    async componentDidMount()
    {
        super.componentDidMount();
        await this.refreshData();
    }

    async handleBooking()
    {
        try
        {
            const slot = this.state.slot;

            if(!slot?.date || !slot?.start || !slot?.end)
                throw new Error("Somebody teach this guy to fill forms");

            await Appointment.create({
                doctor: this.state.model.id,
                date: slot.date,
                start: slot.start,
                end: slot.end,
                patient: this.state.patient
            });

            this.setState({booking: false});

            toast.success("Booking Success", {
                position: "bottom-center"
            });
        }
        catch (error)
        {
            const errorObj = error as {details: string, message: string};

            toast.error(errorObj.details || errorObj.message, {
                position: "bottom-center"
            });
        }
    }

    pad = (no: number | string) => no > 9 ? no : `0${no}`;
    toDjangoDate = (date: Date) => `${date.getFullYear()}-${this.pad(date.getMonth()+1)}-${this.pad(date.getDate())}`;

    render()
    {
        const model = this.state.model;

        return (
            this.state.ready ?
                <>
                    <div className="overlap-group4">
                        <div className="d-flex justify-content-between w-100 px-3 align-items-centre">
                            <ArrowBackIcon className="left-align" onClick={() => this.props.history.goBack()}/>
                            <img alt={""}
                                className="icon-2 mx-3"
                                src={icon}
                            />

                        </div>

                        <img alt={""}
                            className="image"
                            src={model.image ? model.image : image}
                        />

                        <div className="text-1 nunito-semi-bold-ebony-clay-20px">
                            {model.name}
                        </div>
                        <div className="viralogist nunito-semi-bold-lynch-14px">
                            {model.specialization}
                        </div>
                        <div className="flex-row-1">
                            <DoctorStats value={model.patients >= 1000 ? "1000+" : model.patients} title={"Patients"}
                                icon={icon2} class={"blue"}/>
                            <DoctorStats value={model.experience} title={"Experience"} icon={icon3} class={"red"}/>
                            <DoctorStats value={model.rating} title={"Rating"} icon={icon4} class={"yellow"}/>
                        </div>
                    </div>
                    {!this.state.booking ? <>
                        <div className={"about"}>
                            <div className="about-doctor nunito-semi-bold-ebony-clay-18px">
                                {model.about}
                            </div>
                            <p className="dr-bellamy-nicholas nunito-bold-lynch-14px">
                                {model.name}
                            </p>
                        </div>
                        <div className={"about "}>
                            <div className="about-doctor nunito-semi-bold-ebony-clay-18px">Working Time</div>
                            <p className="dr-bellamy-nicholas nunito-bold-lynch-14px">
                                {model.working_time.map(({working_time, hospital}, i) => (
                                    <p key={i}>
                                        {DAYS[working_time.day as number]} -
                                        {working_time.starting_time} to {working_time.ending_time} at
                                        {hospital}
                                    </p>
                                )
                                )}
                            </p>
                        </div>
                        <div className="communication">
                            <div className="communication-1 nunito-semi-bold-ebony-clay-18px">Communication</div>
                            <Communication
                                class={"blue"}
                                phone_number={model.phone_number}
                                icon={icon5}
                                title={"Messaging"}
                                text={"Chat with your doctor."}/>
                            <Communication
                                class={"red"}
                                phone_number={model.phone_number}
                                icon={icon6}
                                title={"Audio Call"}
                                text={"Call your doctor directly."}/>
                            <Communication
                                class={"green"}
                                phone_number={model.phone_number}
                                icon={icon7}
                                title={"Video Call"}
                                text={"See your doctor live."}/>
                        </div>
                    </>
                        :
                        <>
                            <CustomDatePicker
                                ranges={model.ranges && model.ranges.map(({start, end}) => ({start: new Date(start), end: new Date(end)}))}
                                onChange={(date) => date && this.setState({slot: {date: this.toDjangoDate(date)}})}/>
                            <Typography variant={"h6"}>Available Slots</Typography>
                            <Container>
                                {model.slots && model.slots.filter(({date}) => this.state.slot.date === date).map((slot, i) =>
                                    <Chip key={i}
                                        label={`${slot.start} - ${slot.end}`}
                                        variant={this.state.slot === slot ? "filled" : "outlined"}
                                        onClick={() => this.setState({slot: slot})} />
                                )}
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Patient"
                                    value={this.state.patient}
                                    onChange={(e) => this.setState({patient: Number(e.target.value)})}
                                    fullWidth
                                >
                                    <MenuItem value={this.state.user?.id}> Self </MenuItem>
                                    {this.state.helped.map(({uid, Name}, i) => (
                                        <MenuItem key={i} value={uid}>
                                            {Name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Container>
                        </>
                    }
                    <Container className="pb-5">
                        <BigBlueButton text={!this.state.booking ? "Book Appointment" : "Confirm Booking"}
                            onClick={() => !this.state.booking ? this.setState({booking: true}) : this.handleBooking()}/>
                    </Container>
                </>:
                <Container fluid={true} className="my-5 py-5 ">
                    <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
                </Container>


        );
    }

}


export const DoctorComponent = withRouter(DoctorLoc);
