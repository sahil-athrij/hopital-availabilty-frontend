import {Component} from "react";
import {TabButton} from "../components/tabs/tab";
import {Col, Container, Row} from "react-bootstrap";
import {Sidebar} from "../components/RatingForm/sidebar";

function SearchResultList() {
    return null;
}

export class Search extends Component {
    render() {
        return (
            <Container className="my-5 py-5 ">
                <div className="text-center h3 p-3 pt-5 pt-sm-3">Search Results</div>
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
                        <SearchResultList/>
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