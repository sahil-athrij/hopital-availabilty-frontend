import React, {Component} from "react";
import {Link} from 'react-router-dom';

import {DoctorObject} from "../../api/model";
import doctor_fallback from "./icons/doctor-fallback.png";

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
            <Link to={`/doctor/${this.props.model.id}`}>
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
            <>
                {this.props.models.map((model, i) => <Card model={model} key={i}/>)}
            </>
        )
    }
}

