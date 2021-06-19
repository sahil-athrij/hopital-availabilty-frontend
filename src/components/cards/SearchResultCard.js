import {Component} from "react";
import {StarRating} from "../RatingForm/Ratings";
import {Marker} from "../../api/model";
import {Card, Col, Container, Row} from "react-bootstrap";
import hospitalsvg from "../../images/hospitalsvg.svg";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import './searchCards.css'
import {RiDirectionLine} from "react-icons/all";

class SearchCardsLoc extends Component {

    render() {
        return (
            <Card className="flex-row  mb-2"
                  onClick={(e) => {
                      e.preventDefault()
                      // e.stopPropagation()
                      this.props.history.push("/details/" + this.props.model.id)
                  }}
            >
                <img src={hospitalsvg} className="w-30  p-2 p-md-4"/>
                <Card.Body className="w-70 bg-white text-left p-0 py-1">
                    <div className="hospital-title">{this.props.model.name.split(',')[0]}</div>

                    <div className="d-flex address-container justify-content-between">
                        <span className={"hospital-address"}>
                            {this.props.model.address.suburb && this.props.model.address.suburb + ' ,'}
                            {this.props.model.address.village && this.props.model.address.village + ' ,'}
                            {this.props.model.address.state_district && this.props.model.address.state_district}
                            {this.props.model.address.state && this.props.model.address.state}


                        </span>

                    </div>
                    <span
                        className="hospital-phone">{this.props.model.Phone !== '0000000000' && this.props.model.Phone}
                    </span>
                    <Row flex={true} className="w-100 justify-content-end m-0">
                        <div flex={true} target="_blank" className="d-flex justify-content-end phone-button align-items-center flex-column"
                             href={`https://www.google.com/maps/search/${this.props.model.name}/@${this.props.model.lat},${this.props.model.lng},19.88z`}>
                            <button className="button-holder text-center">
                                <RiDirectionLine size={20} className="text-primary"/>
                            </button>
                            Route Map
                        </div>

                    </Row>
                </Card.Body>
            </Card>

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