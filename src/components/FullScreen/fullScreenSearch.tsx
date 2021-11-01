import {ResponsiveComponent, ResponsiveState} from "../ResponsiveComponent";
import {Container} from "react-bootstrap";
import {
    FullScreenLocationProps,
    LocationSearchBoxLoc,
    LocationSearchProps,
    LocationSearchState
} from "./FullScreenLocation";
import {Marker} from "../../api/model";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import {getParam, setParam} from "../../api/QueryCreator";
import {useHistory, useLocation, withRouter} from "react-router";
import React from "react";
import "./fullScreenSearch.css";
import {toast} from "react-toastify";
import {Avatar, Button, Chip, IconButton} from "@mui/material";
import {withStyles} from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';
import {match} from "assert";
// import {Link} from "react-router-dom";
// import Ekmmed from "../../images/ekmmed.svg";
// import SmallStar from "../../images/smallstar.svg";
// import Videocall from "../../images/videocall.svg";
// import Phonecall from "../../images/phonecall.svg";
// import Routemap from "../../images/routemap.svg";
// import {AuthPropsLoc} from "../../api/auth";

interface LocationQuerySearchProps extends LocationSearchProps
{
    close: () => void,
    closeWindow?: () => void
}

type SuggestionSearch = {
    name: string;
    lat: number;
    lon: number;
    address: {
        country?: string;
        state?: string;
        city?: string;
        name: string
    }
}

interface LocationQuerySearchState extends LocationSearchState
{
    suggestionsSearch: SuggestionSearch[],
    selectedSearch: number,
    value: string,
    lat: string,
    lng: string,
    query: string,
    display: number | boolean,
    filters: string[],
    filter_active: boolean,
    location_active: boolean,

}

const StyledChip = withStyles({
    root: {},

    label: {
        padding: "0",
    },

})(Chip);

const bluechip = {
    background: "#3E64FF", "&:hover": {
        background: "#3E64FF",
        color: "white",
    }, borderRadius: "5px", color: "white", fontSize: "8px", width: "76px", height: "21px"
};

const greychip = {
    background: "#F0F0F0",
    borderRadius: "5px",
    color: "#696969",
    fontSize: "8px",
    width: "76px",
    height: "21px"
};

const departments = ["Cardiology", "Anaesthesiology", "Dermatology", "Endocrinology", "Gastroenterology", "Oncology",
    "Nephrology", "Neurology", "Paediatrics", "Psychiatry", "Pulmonology", "Radiology", "Rheumatology", "Geriatrics", "Gynaecology", "Community Health", "ENT",
    "Dental", "Venerology", "Ayurveda", "Dietician", "Pathology", "General Physician", "Orthopaedics"];

const types = ["Economy", "Speciality", "Super speciality", "Normal"];

const ownership = ["Private", "Public", "Co-operative"];

const medicine = ["Ayurveda", "Allopathy", "Homeopathy"];


export class LocationQuerySearchBoxLoc extends LocationSearchBoxLoc<LocationQuerySearchProps, LocationQuerySearchState>
{


    constructor(props: LocationQuerySearchProps)
    {
        super(props);
        this.state = {
            ...this.state,
            suggestionsSearch: [],
            selectedSearch: -1,
            query: getParam("query", "Search Hospital"),
            filters: [],
            filter_active: false,
            location_active: false,
        };

    }

    setPersistence()
    {
        setParam("loc", this.state.value, "Select Location");
        setParam("query", this.state.query, "Search Hospital");
        setParam("lat", this.state.lat);
        setParam("lng", this.state.lng);
        console.log(localStorage.getItem("lat"));
    }


    async SuggestLocationsSearch(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.setState({query: event.target.value}, this.setPersistence);
        try
        {
            const values = await Marker.filter({search: this.state.query, limit: 5});
            this.setState({suggestionsSearch: values.results});
        }
        catch (e)
        {
            toast.error("Internet Not Available", {
                position: "bottom-center",
            });
        }

    }

    handleChipChange(value: string)
    {
        console.log(value);
        const index = this.state.filters.indexOf(value);
        const {filters} = this.state;
        if (index > -1)
        
            filters.splice(index, 1);
        
        else
        
            filters.push(value);
        

        this.setState({filters});
    }


    handleEnterSearch()
    {
        const newSelected = this.state.suggestionsSearch[this.state.selectedSearch];
        const newValue = newSelected ? newSelected.name : this.state.query;
        this.setState({
            query: newValue,
            display: 0
        }, () =>
        {
            this.searchCallBack();
        });

    }


    handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) =>
    {

        const {selectedSearch, suggestionsSearch} = this.state;
        console.log(e.key);
        if (e.key === "ArrowUp" && suggestionsSearch.length > 0)
        {
            e.preventDefault();
            this.setState(prevState => ({
                selectedSearch: prevState.selectedSearch === -1 ? -1 : prevState.selectedSearch - 1
            }));
        }
        else if (e.key === "ArrowDown" && selectedSearch < suggestionsSearch.length - 1)
        {
            e.preventDefault();
            this.setState(prevState => ({
                selectedSearch: prevState.selectedSearch + 1
            }));
        }
        else if (e.key === "Enter")
        {
            e.preventDefault();
            this.handleEnterSearch();
        }
    };

   displaySuggestionsSearch(list: SuggestionSearch[])
    {
        return list.map((item: SuggestionSearch, i: number) =>
        {
            return (
                <Container
                    className={"w-100  py-3  select-locations " + ((i === this.state.selectedSearch) ? "active" : "")}
                    key={i}
                    onClick={() =>
                    {
                        const newValue = item.name;
                        this.setState({
                            query: newValue,
                            display: 0
                        }, () =>
                        {
                            this.searchCallBack();
                        });
                    }}>

                    <LocalHospitalIcon sx={{width: "30px"}} className="input-marker mr-3"/>
                    <div className="fill-rest">{item.name}
                    </div>
                </Container>
            );
        }
        );
    }


    render()
    {
        return (
            <div>
                <Container
                    className={"input-holder overflow-x-hidden mb-3 mx-2 "}>
                    <div className=" w-100 d-flex justify-content-between align-self-center">
                        <IconButton>
                            <MenuIcon/>
                        </IconButton>

                        <input placeholder="Search Hospital" className="main-input w-75 mx-2 align-content-start pt-1"
                            value={this.state.query}
                            type="search"

                            onKeyDown={(event) =>
                            {
                                this.handleKeyDownSearch(event);
                            }}
                            onChange={(event) =>
                            {
                                this.SuggestLocationsSearch(event,).then();
                            }}
                            onFocusCapture={() =>
                            {
                                this.setState({display: 1});
                            }}
                        />
                        <Avatar className="align-self-center" sx={{width: "28px", height: "28px"}}/>
                    </div>

                    {this.state.query &&
                    <CloseIcon sx={{width: 30}} className="input-marker mr-2" onClick={() =>
                    {
                        this.setState({query: ""},
                            () =>
                            {
                                this.setPersistence();
                            });
                    }}/>}
                </Container>
                <div className="d-flex align-items-center p-2" style={{boxShadow: "0px 6px 6.25px rgba(0, 0, 0, 0.25)"}}>
                    <LocationOnIcon sx={{marginRight: "auto"}} onClick={()=>(this.setState({location_active:!this.state.location_active})
                    )}/>
                    <div className="bottombox w-100 py-1" style={{overflowX: "auto", whiteSpace: "nowrap"}}>

                        {this.state.filters.map((value, index)=>(
                            <StyledChip className="col-xs-4 mx-1" key={index} sx={{background:" #3E64FF", borderRadius:"5px", color:"white",
                                fontSize:"8px", width:"76px", height:"21px"}}  label={value}/>
                        ))}

                    </div>
                    <Button sx={{textTransform: "none", marginLeft: "auto"}} endIcon={<KeyboardArrowDownIcon />} onClick={()=>(this.setState({filter_active:!this.state.filter_active})
                    )}>
                        Filter
                    </Button>
                </div>

                <div>
                    {this.displaySuggestionsSearch}
                </div>

                {this.state.location_active &&
                <Container className="fixed-bottom pb-3">

                    <div className="filtertop d-flex justify-content-between pt-3 pb-2 px-3 align-self-center">
                        Choose Your Location
                        <IconButton onClick={()=>
                        {
                            this.setState({location_active:!this.state.location_active}
                            );
                        }}>
                            <CloseIcon sx={{color: "#0338B9"}} />
                        </IconButton>
                    </div>
                    <div className="filterbottom d-flex flex-column ">

                        <Container className={"w-100 input-holder " + ((2 === this.state.display) ? "active-blue" : "")}>
                            {/*<MarkerSvg className=" input-marker"/>*/}

                            <input placeholder="Select Location"
                                   className={"main-input "}
                                   type="search"
                                   value={this.state.value}
                                   onKeyDown={(event) =>
                                   {
                                       this.handleKeyDown(event);
                                   }}
                                   onFocusCapture={() =>
                                   {
                                       this.setState({display: 2});
                                   }}
                                   onChange={(event) =>
                                   {
                                       this.SuggestLocations(event).then();
                                   }}/>
                            {this.state.value &&
                            <CloseOutlinedIcon onClick={() =>
                            {
                                this.setState({value: ""},
                                    () =>
                                    {
                                        this.setPersistence();
                                    }
                                );
                            }}/>}
                        </Container>
                        {(this.state.display === 2 || this.state.display === 0) &&
                        <Container className="w-100 text-primary mt-1 select-locations py-3 pointers"
                                   onClick={() =>
                                   {
                                       this.getLocation().then();
                                   }}>
                            <MyLocationOutlinedIcon className="input-marker mr-3"/>
                            <div className="fill-rest">Use Current Location / Please enable Location services</div>
                        </Container>}
                        {this.state.display === 1 ? this.displaySuggestionsSearch(this.state.suggestionsSearch)
                            : this.state.display === 2 ? this.displaySuggestions(this.state.suggestions) : ""}

                        {/*<LocationSearchBoxLoc close={() => {}} history={useHistory()} location={useLocation()}*/}
                        {/*                       match={}/>*/}
                        {/*location box*/}

                    </div>

                </Container>}

                {this.state.filter_active &&
                        (<Container className="fixed-bottom pb-3">
                            <div className="filtertop d-flex justify-content-between pt-3 pb-2 px-3 align-self-center">
                        Select all that apply
                                <IconButton onClick={()=>
                                {
                                    this.setState({filters:[]}
                                    );
                                }}>
                                    <CloseIcon sx={{color: "#0338B9"}} />
                                </IconButton>
                            </div>
                            <div className="filterbottom d-flex flex-column ">
                                <div className="filterhead w-100 mb-2 mt-4 ">Types</div>
                                <div className="d-flex flex-wrap ">
                                    {types.map((value, key) => (
                                        <div key={key} className="col-3 mb-2">
                                            <StyledChip onClick={() => this.handleChipChange(value)}
                                                sx={this.state.filters.includes(value) ? bluechip : greychip}
                                                label={value}/>
                                        </div>
                                    ))}
                                </div>
                                <div className="filterhead w-100 mb-2 mt-2 ">Departments</div>
                                <div className="d-flex flex-wrap ">
                                    {departments.map((value, key) => (
                                        <div key={key} className="col-3 mb-2">
                                            <StyledChip onClick={() => this.handleChipChange(value)}
                                                sx={this.state.filters.includes(value) ? bluechip : greychip}
                                                label={value}/>
                                        </div>
                                    ))}
                                </div>
                                <div className="filterhead w-100 mb-2 mt-2 ">Ownership</div>
                                <div className="d-flex flex-wrap ">
                                    {ownership.map((value, key) => (
                                        <div key={key} className="col-3 mb-2">
                                            <StyledChip onClick={() => this.handleChipChange(value)}
                                                sx={this.state.filters.includes(value) ? bluechip : greychip}
                                                label={value}/>
                                        </div>
                                    ))}
                                </div>
                                <div className="filterhead w-100 mb-2 mt-2 ">Medicine</div>
                                <div className="d-flex flex-wrap ">
                                    {medicine.map((value, key) => (
                                        <div key={key} className="col-3 mb-2">
                                            <StyledChip onClick={() => this.handleChipChange(value)}
                                                sx={this.state.filters.includes(value) ? bluechip : greychip}
                                                label={value}/>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </Container>)}


                {/*<Container className={"w-100 input-holder " + ((2 === this.state.display) ? "active-blue" : "")}>*/}
                {/*    /!*<MarkerSvg className=" input-marker"/>*!/*/}

                {/*    <input placeholder="Select Location"*/}
                {/*        className={"main-input "}*/}
                {/*        type="search"*/}
                {/*        value={this.state.value}*/}
                {/*        onKeyDown={(event) => */}
                {/*        {*/}
                {/*            this.handleKeyDown(event);*/}
                {/*        }}*/}
                {/*        onFocusCapture={() => */}
                {/*        {*/}
                {/*            this.setState({display: 2});*/}
                {/*        }}*/}
                {/*        onChange={(event) => */}
                {/*        {*/}
                {/*            this.SuggestLocations(event).then();*/}
                {/*        }}/>*/}
                {/*    {this.state.value &&*/}
                {/*    <AiOutlineClose scale={4} size={30} className="input-marker" onClick={() => */}
                {/*    {*/}
                {/*        this.setState({value: ""},*/}
                {/*            () => */}
                {/*            {*/}
                {/*                this.setPersistence();*/}
                {/*            }*/}
                {/*        );*/}
                {/*    }}/>}*/}
                {/*</Container>*/}
                {/*{(this.state.display === 2 || this.state.display === 0) &&*/}
                {/*<Container className="w-100 text-primary mt-1 select-locations py-3 pointers"*/}
                {/*    onClick={() =>*/}
                {/*    {*/}
                {/*        this.getLocation().then();*/}
                {/*    }}>*/}
                {/*    <BiCurrentLocation scale={4} size={30} className="input-marker mr-3"/>*/}
                {/*    <div className="fill-rest">Use Current Location / Please enable Location services</div>*/}
                {/*</Container>}*/}
                {/*{this.state.display === 1 ? this.displaySuggestionsSearch(this.state.suggestionsSearch)*/}
                {/*    : this.state.display === 2 ? this.displaySuggestions(this.state.suggestions) : ""}*/}

            </div>

        );
    }

}

export const LocationQuerySearchBox = withRouter(LocationQuerySearchBoxLoc);

export class FullScreenSearch extends ResponsiveComponent<FullScreenLocationProps, ResponsiveState>
{
    render()
    {
        return (<div className="fixed-top w-100 h-100 bg-white header">

            <Container fluid={true} className="mt-3 p-0">
                <LocationQuerySearchBox close={() => null} closeWindow={this.props.close}/>
            </Container>
        </div>);
    }
}
