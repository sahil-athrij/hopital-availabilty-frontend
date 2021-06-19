import ResponsiveComponent from "../ResponsiveComponent";
import './stars.css'
import {
    AiFillStar,
    AiTwotoneStar,
    BsStarFill,
    BsStarHalf, FaStar,
    FaStarHalf,
    ImStarEmpty,
    ImStarFull,
    ImStarHalf
} from "react-icons/all";
import {Container, Row} from "react-bootstrap";
import * as PropTypes from "prop-types";

function Component(props) {
    return null;
}

Component.propTypes = {children: PropTypes.node};

export class StarRating extends ResponsiveComponent {


    makeStars() {
        var rows = [];
        for (var i = 1; i <= 5; i++) {
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
            <div flex={true} className="d-flex star-rating-container flex-row align-items-center">
                <div className="mr-1">{this.props.rating}</div>
                {this.makeStars()}
            </div>
        )
    }
}
