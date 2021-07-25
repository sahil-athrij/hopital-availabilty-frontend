import React, {Component} from "react";
import {StarRating} from "./StarRating";
import {Marker, MarkerObject} from "../../api/model";
import {Card, Container, Row} from "react-bootstrap";
import hospitalsvg from "../../images/hospitalsvg.svg";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {BiPhoneOutgoing, RiDirectionLine} from "react-icons/all";
import {getParam} from "../../api/QueryCreator";
import Loader from "react-loader-spinner";
import {AuthPropsLoc} from "../../api/auth";
import {ResponsiveState} from "../ResponsiveComponent";

import './searchCards.css'

interface SearchCardsProps extends AuthPropsLoc {
    model: MarkerObject
}

class SearchCardsLoc extends Component<SearchCardsProps> {

    render() {
        console.log(this.props.model.images)

        return (
            <Link style={{textDecoration: "none"}} className='text-dark' to={"/details/" + this.props.model.id}>
                <Card className="flex-row  mb-3">
                    {this.props.model.images && this.props.model.images[0] ?

                            <div style={{backgroundImage: `url(${this.props.model.images[0].image})`}}
                                 className="w-30 flex-shrink-0 background-contain mr-2"/>
                        :
                        <img src={hospitalsvg} className="w-30 flex-shrink-0 mr-2 p-2 px-3 p-md-4" alt="imageview"/>
                    }
                    <Card.Body className="w-70 flex-1 bg-white text-left p-0 py-1">
                        <div
                            className="mt-1 hospital-title">{this.props.model.name != null ? this.props.model.name.split(',')[0] : ''}</div>
                        <StarRating rating={this.props.model.care_rating}/>
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
                        <Row className="w-100 justify-content-end m-0">
                            {this.props.model.Phone !== '0000000000' &&
                            <div
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
                            </div>}
                            <div
                                className="d-flex justify-content-end button-container phone-button align-items-center flex-column"
                                onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    const win = window.open(`https://www.google.com/maps/search/${this.props.model.name}/@${this.props.model.lat},${this.props.model.lng},19.88z`, "_blank");
                                    if (win) {
                                        win.focus();
                                    }
                                }}>

                                <button className="button-holder text-center">
                                    <RiDirectionLine size={20} className="text-primary"/>
                                </button>
                                Route Map
                            </div>

                        </Row>
                    </Card.Body>
                </Card>
            </Link>

        )
    }

}

let SearchCards = withRouter(SearchCardsLoc);


interface SearchResultsProp extends AuthPropsLoc {
    updateParent: () => void
}

interface SearchResultsState extends ResponsiveState {
    models: MarkerObject[]
    next: string,
    reset: boolean,
    loc: string,
    query: string,
    offset: number
}

export class SearchResultsLoc extends Component<SearchResultsProp, SearchResultsState> {

    constructor(props: SearchResultsProp) {
        super(props);
        this.state = {...this.state, models: [], next: '', reset: false, loc: '', query: '', offset: 0}

    }


    componentDidMount() {
        let loc = getParam('loc', 'Search Location',)
        let lat = getParam('lat', '',)
        let lng = getParam('lng', '',)
        let query = getParam('query', 'Search Hospital',)
        Marker.filter({search: query, lat: lat, lng: lng, limit: 10}).then((markers) => {
            let next = markers.next
            let results = markers.results
            this.setState({models: results, next: next, reset: true, loc: loc, query: query,offset: 10})
            console.log(this.state.models)
        })

        this.setState({reset: false})
    }

    componentDidUpdate(prevProps: SearchResultsProp, prevState: SearchResultsState, snapshot: any) {
        let loc = getParam('loc', 'Search Location',)
        let lat = getParam('lat',)
        let lng = getParam('lng',)
        let query = getParam('query', 'Search Hospital',)

        if (this.state.loc !== loc || this.state.query !== query) {

            if (this.state.reset) {
                this.setState({reset: false})
            }
            this.props.updateParent()
            Marker.filter({search: query, lat: lat, lng: lng, limit: 10}).then((markers) => {
                let {results, next} = markers
                this.setState({models: results, next: next, reset: true, loc: loc, query: query,offset: 10})
                console.log(this.state.models)
            })
            // this.setState({reset: false})
        }

    }

    handleNext = () => {
        let loc = getParam('loc', 'Search Location',)
        let lat = getParam('lat',)
        let lng = getParam('lng',)
        let query = getParam('query', 'Search Hospital',)
        let {offset, models} = this.state
        console.log(models)
        Marker.filter({search: query, lat: lat, lng: lng, limit: 10, offset: offset}).then((markers) => {
            let {results, next} = markers
            models.push(...results)
            this.setState({models: models, next: next, reset: true, loc: loc, query: query, offset: offset + 10})
            console.log(this.state.models)
        })

    }


    render() {
        console.log(this.state)
        if (this.state.reset) {
            return <Container fluid={true} className='m-0 p-0'>
                {this.state.models.map((model, i) => {
                        return <SearchCards key={i} model={model}/>
                    }
                )}
                {this.state.next ?
                    <button className="btn btn-outline-primary" onClick={this.handleNext}>More results</button> :
                    ''

                }
            </Container>
        } else {
            return <Container fluid={true} className='mt-5 pt-5 text-center'>
                <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
            </Container>
        }

    }

}

export const SearchResults = withRouter(SearchResultsLoc)