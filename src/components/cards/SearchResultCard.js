import {Component} from "react";
import {StarRating} from "./StarRating";
import {Marker} from "../../api/model";
import {Card, Col, Container, Row} from "react-bootstrap";
import hospitalsvg from "../../images/hospitalsvg.svg";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import './searchCards.css'
import {BiPhoneOutgoing, RiDirectionLine} from "react-icons/all";

class SearchCardsLoc extends Component {

    render() {
        return (
            <Link style={{textDecoration: "none"}} className='text-dark' to={"/details/" + this.props.model.id}>
                <Card className="flex-row  mb-3">
                    <img src={hospitalsvg} className="w-30  p-2 px-3 p-md-4"/>
                    <Card.Body className="w-70 bg-white text-left p-0 py-1">
                        <div className="hospital-title">{this.props.model.name.split(',')[0]}</div>
                        <StarRating rating={this.props.model.covid_rating}/>
                        <div className="d-flex address-container justify-content-between">
                        <span className={"hospital-address"}>
                            {this.props.model.address.suburb && this.props.model.address.suburb + ' ,'}
                            {this.props.model.address.village && this.props.model.address.village + ' ,'}
                            {this.props.model.address.state_district && this.props.model.address.state_district + ' ,'}
                            {this.props.model.address.state && this.props.model.address.state}


                        </span>

                        </div>
                        <span
                            className="hospital-phone">{this.props.model.Phone !== '0000000000' && this.props.model.Phone}
                    </span>
                        <Row flex={true} className="w-100 justify-content-end m-0">
                            {this.props.model.Phone !== '0000000000' &&
                            <button
                                className="d-flex justify-content-end phone-button button-container align-items-center flex-column"
                                onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    document.location.href = 'tel:' + this.props.model.Phone;

                                }}>
                                <button className="button-holder text-center">
                                    <BiPhoneOutgoing size={20} className="text-primary"/>
                                </button>
                                Phone
                            </button>}
                            <button
                                className="d-flex justify-content-end button-container phone-button align-items-center flex-column"
                                onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    const win = window.open(`https://www.google.com/maps/search/${this.props.model.name}/@${this.props.model.lat},${this.props.model.lng},19.88z`, "_blank");
                                    win.focus();
                                }}>

                                <button className="button-holder text-center">
                                    <RiDirectionLine size={20} className="text-primary"/>
                                </button>
                                Route Map
                            </button>

                        </Row>
                    </Card.Body>
                </Card>
            </Link>

        )
    }

}

let SearchCards;
export default SearchCards = withRouter(SearchCardsLoc);

export class SearchResults extends Component {

    state = {models: [], next: ''}

    async componentDidMount() {

        let markers;
        markers = await Marker.filter()
        let {results, next} = markers
        this.setState({models: results, next: next})
    }

    render() {
        console.log(this.state)
        return (
            <Container fluid={true} className='m-0 p-0'>
                {this.state.models.map((model, i) => {
                        return <SearchCards key={i} model={model}/>
                    }
                )}
            </Container>
        )

    }
}