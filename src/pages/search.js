import {Component} from "react";
import {TabButton} from "../components/tabs/tab";
import {Col, Container, Row} from "react-bootstrap";
import {Sidebar} from "../components/RatingForm/sidebar";
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
                <div className="text-center tab">
                    <TabButton control_id='filter' name='Hide Filter' active='filterpanel' tab='filter'/>
                    <TabButton control_id='listview' name='List View' active='u-active'/>
                    <TabButton control_id='mapview' name='Map View' active=''/>
                </div>
                <Row className="my-1  align-self-center" id="filter" role="filterpanel"
                     aria-labelledby="filter-tab">
                    <Col xs={12} md={{span: 8, offset: 2}} id="toplevel">
                        <Sidebar/>
                    </Col>
                    {/*{% include 'v2/components/sidebar.html' %}*/}
                </Row>

                <Row className="my-2  align-self-center" id="listview" role="tabpanel"
                     aria-labelledby="listview-tab">
                    <Col xs={12} md={{span: 8, offset: 2}} id="searchresults">
                        {/*{% for marker in search_results %}*/}
                        {/*{% include 'v2/components/search_result_card.html' with id=marker.id col='col-6' %}*/}
                        {/*{% endfor %}*/}
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