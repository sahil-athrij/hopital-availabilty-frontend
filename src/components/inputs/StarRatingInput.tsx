import React, {Component} from "react";
import {Container, } from "react-bootstrap";
import {CgCloseO} from "react-icons/all";
import {getParam, setParam} from "../../api/QueryCreator";
import {getStarType} from "./StarRatingReview";
import "./stars.css";

interface StarRatingInputProps {
    name: string
    type?: string
    label: string

}



export class StarRatingInput extends Component<StarRatingInputProps>
{
    state = {
        value: getParam(this.props.name),
    };


    setPersistence(value: string) 
    {
        setParam(this.props.name, value, "");
    }


    render() 
    {
        const value = parseInt(getParam(this.props.name, 0));
        const {className, SvgInput} = getStarType(this.props.type);
        return (
            <>
                <label htmlFor={this.props.name} className="">
                    {this.props.label}
                </label>
                <Container className="flex-row align-items-center justify-content-between">


                    {[1, 2, 3, 4, 5].map((number, i) =>
                        (<SvgInput name={this.props.name} size={20} spacing={5} key={number}
                            className={(value <= i ? "star-empty" : className) + " pointers "}
                            onClick={() => 
                            {
                                this.setPersistence(number.toString());
                                this.setState({value: number});
                            }}/>
                        )
                    )}

                    <CgCloseO size={20} spacing={4} className="pointers" onClick={() => 
                    {
                        this.setPersistence("0");
                        this.setState({value: 0});
                    }}
                    />
                </Container>
            </>
        );
    }
}
