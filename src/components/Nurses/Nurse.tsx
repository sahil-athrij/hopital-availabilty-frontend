import {Nurse, NurseObject} from "../../api/model";


import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "../../images/doctorhead.jpg";
import icon from "../Doctor/icons/icon@2x.svg";
import icon2 from "../Doctor/icons/icon-2@2x.svg";
import icon3 from "../Doctor/icons/icon-3@2x.svg";
import icon4 from "../Doctor/icons/icon-4@2x.svg";
import icon5 from "../Doctor/icons/icon-5@2x.svg";
import icon6 from "../Doctor/icons/icon-6@2x.svg";
import icon7 from "../Doctor/icons/icon-7@2x.svg";

import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";

import {Container} from "@mui/material";
import Loader from "react-loader-spinner";
import {withRouter} from "react-router";
import React from "react";
import {BigBlueButton} from "../Utils";
import {toast} from "react-toastify";

interface DetailsState extends AuthState {
    id: number,
    model: NurseObject,
    ready: boolean,
    open_availability: HTMLElement | null,
    popovertext: string,
    show_review: boolean,


}

interface StatsProps {
    value: number | string,
    title: string,
    icon: string,
    class: string
}

interface CommunicationProps {
    phone_number: number,
    title: string,
    icon: string,
    text: string,
    class: string
}

// const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

class NurseStats extends React.Component<StatsProps, Record<string, unknown>>
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

class Communication extends React.Component<CommunicationProps, Record<string, unknown> >
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

class NurseLoc extends AuthComponent<AuthPropsLoc, DetailsState> 
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
            show_review: false
        };
    }

    async refreshData() 
    {
        this.setState({ready: false});

        const nurseId = Number(this.props.match.params.nurseId);
        const nurse = await Nurse.get(nurseId).catch(() =>
        {
            toast.error("Oops something went wrong", {
                position: "bottom-center"
            });
            setTimeout(this.props.history.push, 1000, "/");
        }) as NurseObject;

        this.setState({model: nurse, ready: true, id: nurseId});

    }

    async componentDidMount() 
    {
        super.componentDidMount();
        await this.refreshData();
    }

    showNurse({model, history}: { model: NurseObject, history: { goBack: ()=> void } })
    {
        return (
            <>
                <div className="overlap-group4">
                    <div className="d-flex justify-content-between w-100 px-3 align-items-centre">
                        <ArrowBackIcon className="left-align" onClick={() => history.goBack()} />
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
                        {model.availability?"Available":"Unavailable"}
                    </div>
                    <div className="flex-row-1">
                        <NurseStats value={model.services >= 1000? "1000+": model.services} title={"Services"} icon={icon2} class={"blue"}/>
                        <NurseStats value={model.experience} title={"Experience"} icon={icon3} class={"red"}/>
                        <NurseStats value={model.rating} title={"Rating"} icon={icon4} class={"yellow"}/>
                    </div>
                </div>
                <div className={"about"}>
                    <div className="about-doctor nunito-semi-bold-ebony-clay-18px">
                        {model.about}
                    </div>
                    <p className="dr-bellamy-nicholas nunito-bold-lynch-14px">
                        {model.name}
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
                <Container className="pb-5">
                    <BigBlueButton text="Book Appointment" />
                </Container>
            </>
        );
    }

    render() 
    {
        return (
            this.state.ready ?
                <this.showNurse model={this.state.model} history={this.props.history}/> :
                <Container  className="my-5 py-5 ">
                    <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
                </Container>


        );
    }

}


export const NurseComponent = withRouter(NurseLoc);
