import {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {SearchResults} from "../components/cards/SearchResultCard";


export class Search extends Component {
    state = {
        loc: localStorage.getItem("loc") === 'Select Location' ? '' : localStorage.getItem("loc") || '',
        query: localStorage.getItem("query") === 'Search' ? '' : localStorage.getItem("query") || '',
    }

    render() {
        return (
            <Container fluid={true} className="my-5 py-5 ">
                {this.state.query ?
                    <div className="text-left pt-5 pt-sm-3">Showing Results for <b>"{this.state.query}"</b></div>
                    :
                    <div className="text-left pt-5 pt-sm-3">Showing Results in <b>"{this.state.loc}"</b></div>

                }
                <Row className="my-2  align-self-center" id="listview" role="tabpanel"
                     aria-labelledby="listview-tab">
                    <Col xs={12} id="searchresults">
                        <SearchResults/>
                    </Col>
                    <button className="btn btn-outline-primary">More results</button>

                </Row>
                <div className="row my-2  align-self-center " id="mapview" role="tabpanel"
                     aria-labelledby="mapview-tab">
                    <Col xs={12} md={{span: 2, offset: 2}}>
                        {/*{% include 'v2/components/search_result_card.html' with  col='col-6 col-md-12' id='value' %}*/}

                    </Col>
                    <Col xs={12} md={{span: 8, offset: 2}} id="toplevel1">
                        <div id="map"/>
                    </Col>

                </div>
            </Container>
        )
    }
}