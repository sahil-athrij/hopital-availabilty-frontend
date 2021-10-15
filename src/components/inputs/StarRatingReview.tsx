import React, {Component, Fragment} from "react";
import {Container, } from "react-bootstrap";
import {CgPill, FaMoneyBillAlt, FaStar, SiAtom} from "react-icons/all";

import "./stars.css";

export function getStarType(type?: string) 
{
    let SvgInput;
    let className;
    if (type === "financial") 
    {
        SvgInput = FaMoneyBillAlt;
        className = "financial-full";    
    }
    else if (type === "covid") 
    {
        SvgInput = CgPill;
        className = "covid-full";
    }
    else if (type === "oxygen") 
    {
        SvgInput = SiAtom;
        className = "oxygen-full";
    }
    else 
    {
        SvgInput = FaStar;
        className = "star-full";
    }
    return {SvgInput, className};
}

interface StarRatingProps {
    value: number,
    type?: string,
    label: string,
    name: string,
    setValue: (name: string, value: number) => void

}

export class StarRatingReview extends Component<StarRatingProps> 
{
    state = {
        value: this.props.value,
    };

    render() 
    {
        const value = this.props.value;
        const {className, SvgInput} = getStarType(this.props.type);
        return (
            <React.Fragment>
                <label htmlFor={this.props.name} className="">
                    {this.props.label}
                </label>
                <Container className="d-flex flex-row align-items-center justify-content-between">
                    {[1, 2, 3, 4, 5].map((number, i) =>
                        (<Fragment key={number}>
                            <SvgInput name={this.props.name} size={value - 1 === i ? 25 : 20} spacing={5}
                                key={number}
                                className={(value <= i ? "star-empty" : className) + " pointers "}
                                onClick={() => 
                                {
                                    this.setState({value: number});
                                    this.props.setValue(this.props.name, number);
                                }}/>
                            <input type="radio" name={this.props.name} value={number} className="position-absolute"
                                style={{opacity: 0, left: "-300px"}}
                                checked={this.props.value === number}
                                onChange={() =>
                                {
                                    this.setState({value: number});
                                    this.props.setValue(this.props.name, number);
                                }}
                            />
                        </Fragment>
                        )
                    )}
                </Container>
            </React.Fragment>
        );
    }
}
