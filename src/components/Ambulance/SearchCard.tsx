import React, {Component} from "react";
import {AuthPropsLoc} from "../../api/auth";
import {AmbulanceObject, Marker} from "../../api/model";
import {Link} from "react-router-dom";
import {Avatar} from "@mui/material";
import Ekmmed from "../../images/ekmmed.png";
import SmallStar from "../../images/smallstar.svg";
import Phonecall from "../../images/phonecall.svg";
import Routemap from "../../images/routemap.svg";
import {withRouter} from "react-router";
import {ResponsiveState} from "../ResponsiveComponent";
import {getParam} from "../../api/QueryCreator";
import {Container} from "react-bootstrap";
import Loader from "react-loader-spinner";
import {toast} from "react-toastify";


interface AmbulanceCardsProps extends AuthPropsLoc
{
    model: AmbulanceObject;
}

class AmbulanceCardsLoc extends Component<AmbulanceCardsProps>
{

    render()
    {


        return (
            <Link style={{textDecoration: "none"}} className="text-dark" to={"/details/" + this.props.model.id}>
                {/* Show hospital image */}
                <div className="cardstyle mb-2 justify-content-between d-flex">
                    <div className="align-self-center">
                        <Avatar className="align-self-center" sx={{width: "37px", height: "37px", marginLeft: "10px"}}
                            src={this.props.model.image ? this.props.model.image : Ekmmed}/>
                    </div>


                    <div className="box2 flex-grow-1 ml-3 flex-1 bg-white text-left align-self-center  ">
                        <div
                            // Get hospital details and split it at first comma to get hospital name
                            className="mt-3  justify-content-between hospital-title ">
                            <div className="w-60 text-left ">
                                {this.props.model.name !== null ? this.props.model.name?.split(",")[0] : ""}
                            </div>
                            <div className="ratingvalue d-flex justify-content-center"
                                style={{height: "fit-content", width: "fit-content"}}>
                                <div className="px-1">
                                    {this.props.model.rating}
                                </div>
                                <img alt={""} className="staricon " src={SmallStar}/>
                            </div>
                        </div>

                        {/* star rating scale */}
                        {/*<StarRating rating={this.props.model.care_rating}/>*/}
                        <div className="d-flex address-container justify-content-between">

                            {/* fetching hospital address */}
                            <div className="hospital-address d-flex flex-column">
                                <div>
                                    Hospital:{this.props.model.hospital}
                                </div>
                                <div>
                                    Driver:{this.props.model.driver_name}
                                </div>
                                {/*{this.props.model. && this.props.model.address.suburb + ", "}*/}
                                {/*{this.props.model.address.village && this.props.model.address.village + ", "}*/}
                                {/*{this.props.model.address.state_district && this.props.model.address.state_district}*/}
                                {/*{this.props.model.address.state && this.props.model.address.state}*/}
                            </div>


                            <div className="container d-flex justify-content-around">
                                {/*<button className="pvrtab" onClick={(event) =>*/}
                                {/*{*/}
                                {/*    event.preventDefault();*/}
                                {/*    event.stopPropagation();*/}
                                {/*    alert("Will be available on next update");*/}
                                {/*}}>*/}
                                {/*    <img src={Videocall} alt=""/>*/}
                                {/*</button>*/}
                                {this.props.model.phone_number !== "0000000000" ?
                                    (<button className="pvrtab" onClick={(event) =>
                                    {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        document.location.href = "tel:" + this.props.model.phone_number;

                                    }}><img src={Phonecall} alt=""/>
                                    </button>) : (<button className="pvrtab" onClick={(event) =>
                                    {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        alert("Mobile no is not available for selected hospital");
                                    }}>
                                        <img src={Phonecall} alt=""/>
                                    </button>)}
                                <button className="pvrtab"
                                //         onClick={(event) =>
                                // {
                                //     event.preventDefault();
                                //     event.stopPropagation();
                                //     const win = window.open(`https://www.google.com/maps/search/${this.props.model.name}/@${this.props.model.lat},${this.props.model.lng},19.88z`, "_blank");
                                //     if (win)
                                //     {
                                //         win.focus();
                                //     }
                                //
                                // }}
                                >
                                    <img src={Routemap} alt=""/>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </Link>

        );
    }

}

const AmbulanceSearchCard = withRouter(AmbulanceCardsLoc);

interface SearchResultsProp extends AuthPropsLoc
{
    updateParent: () => void;
}

interface SearchResultsState extends ResponsiveState
{
    models: AmbulanceObject[],
    next: string,
    reset: boolean,
    loc: string,
    query: string,
    offset: number
}

export class SearchResultsLoc extends Component<SearchResultsProp, SearchResultsState>
{

    constructor(props: SearchResultsProp)
    {
        super(props);
        this.state = {...this.state, models: [], next: "", reset: false, loc: "", query: "", offset: 0};

    }


    componentDidMount()
    {
        const loc = getParam("loc", "Search Location",);
        const lat = getParam("lat", "",);
        const lng = getParam("lng", "",);
        const query = getParam("query", "Search Hospital",);
        Marker.filter({search: query, lat: lat, lng: lng, limit: 10}).then((markers) =>
        {
            const next = markers.next;
            const results = markers.results;
            this.setState({models: results, next: next, reset: true, loc: loc, query: query, offset: 10});
        }).catch(() =>
        {
            toast.error("Oops something went wrong", {
                position: "bottom-center"
            });
            setTimeout(this.props.history.push, 1000, "/");
        });

        this.setState({reset: false});
    }

    componentDidUpdate()
    {
        const loc = getParam("loc", "Search Location",);
        const lat = getParam("lat",);
        const lng = getParam("lng",);
        const query = getParam("query", "Search Hospital",);

        if (this.state.loc !== loc || this.state.query !== query)
        {

            if (this.state.reset)
            
                this.setState({reset: false});
            

            this.props.updateParent();
            Marker.filter({search: query, lat: lat, lng: lng, limit: 10}).then((markers) =>
            {
                const {results, next} = markers;
                this.setState({models: results, next: next, reset: true, loc: loc, query: query, offset: 10});
            });
            // this.setState({reset: false})
        }

    }

    handleNext = () =>
    {
        const loc = getParam("loc", "Search Location",);
        const lat = getParam("lat",);
        const lng = getParam("lng",);
        const query = getParam("query", "Search Hospital",);
        const {offset, models} = this.state;
        Marker.filter({search: query, lat: lat, lng: lng, limit: 10, offset: offset}).then((markers) =>
        {
            const {results, next} = markers;
            models.push(...results);
            this.setState({models: models, next: next, reset: true, loc: loc, query: query, offset: offset + 10});
        });

    };

    render()
    {
        if (this.state.reset)
        
            return <Container fluid={true} className="m-0 p-0">
                {this.state.models.map((model, i) =>
                {
                    return <AmbulanceSearchCard key={i} model={model}/>;
                }
                )}
                {this.state.next ?
                    <button className="btn btn-outline-primary" onClick={this.handleNext}>More results</button> :
                    ""

                }
            </Container>;
        
        else
        
            return <Container fluid={true} className='mt-5 pt-5 text-center'>
                <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
            </Container>;
        


    }

}

export const AmbulanceCards = withRouter(AmbulanceCardsLoc);

