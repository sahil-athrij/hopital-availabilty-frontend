import React, {Component} from "react";
import {Link} from 'react-router-dom';

import {DoctorObject} from "../../api/model";
import doctor_fallback from "./icons/doctor-fallback.png";
import add_doctor_icon from "./icons/add-doctor.png";
import {Container} from "react-bootstrap";

import search_icon from "./icons/search-icon.svg";


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
            <Link to={`/doctor/${this.props.model.id}`} className="flex-column col-6">
                <div>
                    <div>
                        <div>
                            <img
                                src={this.props.model.image?.uri || doctor_fallback}
                                alt={""}
                                width={"80px"}
                                height={"80px"}
                            />
                        </div>
                        <div>
                            ⭐️ {this.props.model.rating || 0} ({(this.props.model.reviews || []).length} reviews)
                        </div>
                        <div className="nunito-black-lynch-12px">
                            {this.props.model.specialization || "General"}
                        </div>
                        <div className="nunito-black-ebony-clay-16px">
                            {this.props.model.name}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}


export class DoctorCards extends Component<{ models: DoctorObject[] }, {}> {

    render() {
        return (
            this.props.models.length ?
                <>
                    <Link to="#searchDoctor" className="searchbar d-flex flex-row mb-3">
                        <img
                            alt="Search Icon"
                            className="col-2 pr-0"
                            src={search_icon}
                            width="22px"
                            height="22px"
                        />
                        <div className="search-for-doctors col-10 text-left pl-0">Search For Doctors</div>
                    </Link>
                    <Container className="d-flex flex-row">
                        <Link to={`/addDoctor`} className="flex-column col-6">
                            <img
                                src={add_doctor_icon}
                                alt={""}
                                width={"130px"}
                                height={"75px"}
                            />
                            <div className="nunito-black-ebony-clay-16px">
                                Add doctor
                            </div>
                        </Link>
                        {this.props.models.map((model, i) => <Card model={model} key={i}/>)}
                    </Container>
                </> : <p>No Doctors</p>
        )
    }
}

