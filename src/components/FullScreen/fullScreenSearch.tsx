import {ResponsiveComponent, ResponsiveState} from "../ResponsiveComponent";
import {Container} from "react-bootstrap";
import {ReactComponent as Back} from "../../images/back.svg";
import {
    FullScreenLocationProps,
    LocationSearchBoxLoc,
    LocationSearchProps,
    LocationSearchState
} from "./FullScreenLocation";
import {Marker} from "../../api/model";
import {AiOutlineClose, BiCurrentLocation, FaHospital} from "react-icons/all";
import {ReactComponent as Search} from "../../images/search.svg";
import {ReactComponent as MarkerSvg} from "../../images/markersvg.svg";
import {getParam, setParam} from "../../api/QueryCreator";
import {withRouter} from "react-router";
import React from "react";
import {toast} from "react-toastify";

interface LocationQuerySearchProps extends LocationSearchProps {
    close: () => void,
    closeWindow?: () => void
}

type SuggestionSearch = {
    name: any;
    lat: number;
    lon: number;
    address: {
        country?: string;
        state?: string;
        city?: string;
        name: string
    }
}

interface LocationQuerySearchState extends LocationSearchState {
    suggestionsSearch: SuggestionSearch[],
    selectedSearch: number,
    value: string,
    lat: string,
    lng: string,
    query: string,
    display: number | boolean,

}


export class LocationQuerySearchBoxLoc extends LocationSearchBoxLoc<LocationQuerySearchProps, LocationQuerySearchState> {


    constructor(props: LocationQuerySearchProps) {
        super(props);
        this.state = {
            ...this.state,
            suggestionsSearch: [],
            selectedSearch: -1,
            query: getParam('query', 'Search Hospital'),
        }

    }

    setPersistence() {
        setParam("loc", this.state.value, 'Select Location')
        setParam('query', this.state.query, 'Search Hospital')
        setParam('lat', this.state.lat)
        setParam('lng', this.state.lng)
        console.log(localStorage.getItem('lat'))
    }


    async SuggestLocationsSearch(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({query: event.target.value}, this.setPersistence)
        try {
            const values = await Marker.filter({search: this.state.query, limit: 5})
            this.setState({suggestionsSearch: values.results})
        } catch (e) {
            toast.error('Internet Not Available', {
                position: "bottom-center",
            });
        }

    }

    handleEnterSearch() {
        let newSelected = this.state.suggestionsSearch[this.state.selectedSearch]
        let newValue;
        newValue = newSelected ? newSelected.name : this.state.query;
        this.setState({
            query: newValue,
            display: 0
        }, () => {
            this.searchCallBack()
        })

    }


    handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {

        const {selectedSearch, suggestionsSearch} = this.state
        console.log(e.key)
        if (e.key === 'ArrowUp' && suggestionsSearch.length > 0) {
            e.preventDefault()
            this.setState(prevState => ({
                selectedSearch: prevState.selectedSearch === -1 ? -1 : prevState.selectedSearch - 1
            }))
        } else if (e.key === "ArrowDown" && selectedSearch < suggestionsSearch.length - 1) {
            e.preventDefault()
            this.setState(prevState => ({
                selectedSearch: prevState.selectedSearch + 1
            }))
        } else if (e.key === "Enter") {
            e.preventDefault()
            this.handleEnterSearch()
        }
    };

    displaySuggestionsSearch(list: SuggestionSearch[]) {
        return list.map((item: SuggestionSearch, i: number) => {
                return (
                    <Container
                        className={'w-100  py-3  select-locations ' + ((i === this.state.selectedSearch) ? "active" : '')}
                        key={i}
                        onClick={() => {
                            let newValue = item.name
                            this.setState({
                                query: newValue,
                                display: 0
                            }, () => {
                                this.searchCallBack()
                            })
                        }}>

                        <FaHospital scale={4} size={30} className="input-marker mr-3"/>
                        <div className="fill-rest">{item.name}
                        </div>
                    </Container>
                )
            }
        )
    }


    render() {
        return (
            <React.Fragment>
                <Container
                    className={"w-100 input-holder mb-3 pr-1 justify-content-begin position-relative overflow-x-hidden  " + ((1 === this.state.display) ? "active-blue" : '')}>
                    <Search className=" input-marker "/>

                    <input placeholder="Search Hospital" className={"main-input w-75 "}
                           value={this.state.query}
                           type="search"
                           autoFocus

                           onKeyDown={(event) => {
                               this.handleKeyDownSearch(event)
                           }}
                           onChange={(event) => {
                               this.SuggestLocationsSearch(event,).then()
                           }}
                           onFocusCapture={() => {
                               this.setState({display: 1})
                           }}
                    />
                    {this.state.query &&
                    <AiOutlineClose scale={4} size={30} className="input-marker mr-2" onClick={() => {
                        this.setState({query: ''},
                            () => {
                                this.setPersistence()
                            })
                    }}/>}
                    <button
                        className="h5  u-link  m-0 p-1 px-2"
                        onClick={() => {
                            this.searchCallBack()
                        }}>
                        Go

                    </button>
                </Container>

                <Container className={"w-100 input-holder " + ((2 === this.state.display) ? "active-blue" : '')}>
                    <MarkerSvg className=" input-marker"/>

                    <input placeholder="Select Location"
                           className={"main-input "}
                           type="search"
                           value={this.state.value}
                           onKeyDown={(event) => {
                               this.handleKeyDown(event)
                           }}
                           onFocusCapture={() => {
                               this.setState({display: 2})
                           }}
                           onChange={(event) => {
                               this.SuggestLocations(event).then()
                           }}/>
                    {this.state.value &&
                    <AiOutlineClose scale={4} size={30} className="input-marker" onClick={() => {
                        this.setState({value: ''},
                            () => {
                                this.setPersistence()
                            }
                        )
                    }}/>}
                </Container>
                {(this.state.display === 2 || this.state.display === 0) &&
                <Container className="w-100 text-primary mt-1 select-locations py-3 pointers"
                           onClick={() => {
                               this.getLocation().then()
                           }}>
                    <BiCurrentLocation scale={4} size={30} className="input-marker mr-3"/>
                    <div className="fill-rest">Use Current Location / Please enable Location services</div>
                </Container>}
                {this.state.display === 1 ? this.displaySuggestionsSearch(this.state.suggestionsSearch)
                    : this.state.display === 2 ? this.displaySuggestions(this.state.suggestions) : ''}

            </React.Fragment>

        )
    }

}

export const LocationQuerySearchBox = withRouter(LocationQuerySearchBoxLoc)

export class FullScreenSearch extends ResponsiveComponent<FullScreenLocationProps, ResponsiveState> {
    render() {
        return (<div className="fixed-top w-100 h-100 bg-white header">
            <Container fluid={true} className="py-3">
                <button className="BlueBackground p-2" onClick={() => {
                    this.props.close()
                }}>
                    <Back/>
                </button>


            </Container>
            <Container fluid={true} className="mt-3">
                <LocationQuerySearchBox close={() => {
                }} closeWindow={this.props.close}/>
            </Container>
        </div>)
    }
}