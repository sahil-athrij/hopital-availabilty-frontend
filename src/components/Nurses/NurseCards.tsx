import React, {Component} from "react";
import {Link} from "react-router-dom";

import {NurseObject} from "../../api/model";
import doctor_fallback from "../Details/icons/doctor-fallback.png";
import {Container} from "@mui/material";
import starsvg from "../../images/star.svg";

import search_icon from "../Details/icons/search-icon.svg";
import {BigBlueButton} from "../Utils";


interface CardProps {
    model: NurseObject
}


export default class NurseProfile extends React.Component<CardProps, { open: boolean }> 
{
    constructor(props: CardProps) 
    {
        super(props);
        this.setState({open: false});
    }

    render() 
    {
        return (
            <div className="my-1 doctor-card ">
                <Link style={{textDecoration:"none"}} to={`/nurse/${this.props.model.id}`}>
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
                                    {this.props.model.availability?"Available":"Unavailable"}
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


export class NurseCards extends Component<{ models: NurseObject[], hospital: number }, Record<string, unknown>>
{

    render() 
    {
        return (
            <div>{this.props.models.length ?
                <Link to="/searchnurse" className="searchbar d-flex flex-row mb-3">
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

                    {this.props.models.map((model, i) => <NurseProfile model={model} key={i}/>)}

                </div>
                <Link to={"/addnurse"}>
                    <BigBlueButton text="Add Nurse"/>
                </Link>
            </Container>
            </div>
        );
    }
}
