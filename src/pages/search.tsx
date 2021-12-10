import React from "react";
import {Container} from "@mui/material";
import {SearchResults} from "../components/cards/SearchResultCard";
import {getParam} from "../api/QueryCreator";
import {ResponsiveComponent, ResponsiveState} from "../components/ResponsiveComponent";

type SearchProps = Record<string, string>

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
            <Container className="my-5 py-4">
                {this.state.query !== "Search Hospital" && this.state.query ?
                    <div className="text-left pt-sm-3">Showing Results for <b>&quot;{this.state.query}&quot;</b></div>
                    :
                    this.state.loc !== "Select Location" && <div className="text-left pt-sm-3">Showing Results in <b>&quot;{this.state.loc}&quot;</b></div>

                }
                <div className="my-2 align-self-center" id="listview" role="tabpanel"
                    aria-labelledby="listview-tab">
                    <div className="col col-xs-12" id="searchresults">
                        <SearchResults updateParent={() => 
                        {
                            this.updateQuery();
                        }}/>
                    </div>

                </div>
                <div className="row my-2  align-self-center " id="mapview" role="tabpanel"
                    aria-labelledby="mapview-tab">
                    <div className="col col-xs-12 col-md-8 offset-md-2"  id="toplevel1">
                        <div id="map"/>
                    </div>

                </div>
            </Container>
        );
    }
}
