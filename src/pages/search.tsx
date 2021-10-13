import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {SearchResults} from "../components/cards/SearchResultCard";
import {getParam} from "../api/QueryCreator";
import {ResponsiveComponent, ResponsiveProps, ResponsiveState} from "../components/ResponsiveComponent";

type SearchProps = ResponsiveProps

interface SearchState extends ResponsiveState {
    loc: string
    query: string
}

export class Search extends ResponsiveComponent<SearchProps, SearchState> 
{

    constructor(props: SearchProps) 
    {
        super(props);
        this.state = {
            ...this.state,
            loc: getParam("loc", "Select Location",),
            query: getParam("query", "Search Hospital",),


        };
    }


    updateQuery() 
    {
        const loc = getParam("loc", "Search Location",);
        const query = getParam("query", "Search Hospital",);

        if (this.state.loc !== loc || this.state.query !== query) 
        
            this.setState({
                loc: loc,
                query: query,
            });

        
    }

    render() 
    {
        console.log(this.state.width);
        return (
            <Container fluid={true} className="my-5 py-5 ">
                {this.state.query !== "Search Hospital" && this.state.query ?
                    <div className="text-left pt-5 pt-sm-3">Showing Results for <b>"{this.state.query}"</b></div>
                    :
                    <div className="text-left pt-5 pt-sm-3">Showing Results in <b>"{this.state.loc}"</b></div>

                }
                <Row className="my-2  align-self-center" id="listview" role="tabpanel"
                    aria-labelledby="listview-tab">
                    <Col xs={12} id="searchresults">
                        <SearchResults updateParent={() => 
                        {
                            this.updateQuery();
                        }}/>
                    </Col>

                </Row>
                <div className="row my-2  align-self-center " id="mapview" role="tabpanel"
                    aria-labelledby="mapview-tab">
                    <Col xs={12} md={{span: 8, offset: 2}} id="toplevel1">
                        <div id="map"/>
                    </Col>

                </div>
            </Container>
        );
    }
}
