import {ResponsiveComponent, ResponsiveProps, ResponsiveState} from "../ResponsiveComponent";
import {FaStar, FaStarHalf} from "react-icons/all";
import React from "react";
import '../inputs/stars.css'

interface StarRatingProp extends ResponsiveProps {
    rating: number
}

export class StarRating extends ResponsiveComponent<StarRatingProp, ResponsiveState> {
//Rating stars
    makeStars() {
        let rows = [];
        for (let i = 1; i <= 5; i++) {
            if (this.props.rating > i && this.props.rating) {
                rows.push(<FaStar className="star-full" size={16} spacing={2} key={i}/>)

            } else if (i === this.props.rating) {
                rows.push(<FaStar className="star-full" size={16} spacing={2} key={i}/>);
            } else if (this.props.rating < i) {
                if (this.props.rating + .5 > i) {
                    rows.push(
                        <div key={i} className={"d-flex align-items-center"}>
                            <FaStarHalf className="star-full position-absolute" size={16} spacing={2}/>
                            <FaStar className="star-empty  " size={16} spacing={2}/>
                        </div>
                    );
                } else {
                    rows.push(<FaStar className="star-empty" size={16} spacing={2} key={i}/>);
                }
            }

        }
        return (
            <> {rows}</>
        )
    }

    render() {
        return (
            <div className="d-flex star-rating-container flex-row align-items-center">
                <div className="mr-1">{parseFloat(String(this.props.rating)).toFixed(1)}</div>
                {this.makeStars()}
            </div>
        )
    }
}
