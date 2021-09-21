import React, {Component} from "react";
import {Link} from 'react-router-dom';
import './details.css'

import {DoctorObject} from "../../api/model";
import doctor_fallback from "./icons/doctor-fallback.png";
import {Container} from "react-bootstrap";
import starsvg from '../../images/star.svg';

import search_icon from "./icons/search-icon.svg";
import {Button} from "@mui/material";


interface CardProps {
    model: DoctorObject
}


class Card extends React.Component<CardProps, { open: boolean }> {
    constructor(props: CardProps) {
        super(props);
        this.setState({open: false})
    }

    render() {
        return (
            <div className="m-2 doctor-card ">
                <Link to={`/doctor/${this.props.model.id}`}>
                    <div>
                        <div>
                            <div>
                                <img className="Doc-icon"
                                     src={this.props.model.image || doctor_fallback}
                                     alt={""}
                                     width={"80px"}
                                     height={"80px"}
                                />
                                <div className="nunito-black-ebony-clay-16px">
                                    {this.props.model.name}
                                </div>
                                <div className="nunito-black-lynch-12px">
                                    {this.props.model.specialization || "General"}
                                </div>
                            </div>
                            <div>
                                <img
                                    src={starsvg} alt={"star"}/> {this.props.model.rating || 0} ({(this.props.model.reviews || []).length} reviews)
                            </div>

                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}


export class DoctorCards extends Component<{ models: DoctorObject[], hospital: number }, {}> {

    render() {
        return (
            <div>{this.props.models.length ?
                <Link to="#searchDoctor" className="searchbar d-flex flex-row mb-3">
                    <img
                        alt="Search Icon"
                        className="col-2 pr-0"
                        src={search_icon}
                        width="22px"
                        height="22px"
                    />
                    <div className="search-for-doctors col-10 text-left pl-0">Search For Doctors</div>
                </Link>:null}
                <Container className="doc-container">

                    <div className="doc-subc">

                        {this.props.models.map((model, i) => <Card model={model} key={i}/>)}

                    </div>
                    <Link to={`/doctor/add/${this.props.hospital}`}>
                        <Button fullWidth variant="contained" color="primary">Add Doctor</Button>
                    </Link>
                </Container>
            </div>
        )
    }
}

