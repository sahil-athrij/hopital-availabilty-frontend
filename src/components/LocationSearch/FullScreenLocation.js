import ResponsiveComponent from "../ResponsiveComponent";
import {Button, Container} from "react-bootstrap";
import {ReactComponent as Back} from "../../images/back.svg";
import {ReactComponent as MarkerSvg} from "../../images/markersvg.svg";
import {ReactComponent as Search} from "../../images/search.svg";
import {get} from "../../api/api";
import {Marker} from "../../api/model";
import './location.css'
import {AiFillCloseCircle, BiCurrentLocation, FaHospital, ImLocation2} from "react-icons/all";
import {Link} from "react-router-dom";

export class LocationSearchBox extends ResponsiveComponent {
    state = {
        suggestions: [],
        selected: 0,
        value: localStorage.getItem("loc") === 'Select Location' ? '' : localStorage.getItem("loc") || '',
        lat: localStorage.getItem('lat'),
        lng: localStorage.getItem('lng'),
        display: 0
    }


    setPersistence() {
        localStorage.setItem("loc", this.state.value || 'Select Location')
        localStorage.setItem('lat', this.state.lat)
        localStorage.setItem('lng', this.state.lng)
    }

    async SuggestLocations(event) {
        this.setState({value: event.target.value})
        let url;

        url = 'https://api.locationiq.com/v1/autocomplete.php';
        const values = await get(url, {
            key: 'pk.760f1338e289bacc788f9e0ae4a4951e',
            q: event.target.value,
            limit: 5,
            countrycodes: 'in'
        })
        console.log(values)
        let {error} = values
        if (!error) {
            this.setState({suggestions: values})
        }
    }

    handleEnter(e) {
        let newSelected = this.state.suggestions[this.state.selected]
        if (newSelected) {
            let newValue = newSelected.address.name
            this.setState({
                value: newValue,
                display: 0
            }, () => {
                this.setPersistence()
                this.props.close()
            })
        }

    }


    handleKeyDown(e) {
        const {selected, suggestions} = this.state
        console.log(e.key)
        if (e.key === 'ArrowUp' && suggestions.length > 0) {
            e.preventDefault()
            this.setState(prevState => ({
                selected: prevState.selected === -1 ? -1 : prevState.selected - 1
            }))
        } else if (e.key === "ArrowDown" && selected < suggestions.length - 1) {
            e.preventDefault()
            this.setState(prevState => ({
                selected: prevState.selected + 1
            }))
        } else if (e.key === "Enter") {
            e.preventDefault()
            this.handleEnter(e)
        }
    }

    displaySuggestions(list, type) {
        return list.map((item, i) => {
                return (
                    <Container className={'w-100  py-3  select-locations ' + ((i === this.state.selected) ? "active" : '')}
                               key={i}
                               onClick={(event) => {
                                   let newValue = item.address.name
                                   this.setState({
                                       value: newValue,
                                       display: 0
                                   }, () => {
                                       this.setPersistence()
                                       this.props.close()
                                   })
                               }}>

                        <ImLocation2 scale={4} size={30} className="input-marker mr-3"/>
                        <div className="fill-rest">{item.address.name}
                            <div>{[item.address.city, item.address.state, item.address.country].filter(Boolean).join(', ')}</div>
                        </div>
                    </Container>
                )
            }
        )
    }

    async getLocation() {
        await navigator.geolocation.getCurrentPosition(
            async position => {
                console.log(position)
                let loc = await get('https://us1.locationiq.com/v1/reverse.php', {
                    key: 'pk.760f1338e289bacc788f9e0ae4a4951e',
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    format: "json"

                })
                console.log(loc)
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    value: loc.address.city_district || loc.address.county,
                    display: 0
                }, () => {
                    this.setPersistence()
                    this.props.close()
                })
            },
            err => console.log(err)
        )

    }

    render() {
        return (
            <>
                <Container className="w-100 input-holder">
                    <MarkerSvg className=" input-marker"/>
                    <input placeholder="Select Location" className="main-input" value={this.state.value}
                           onKeyDown={(event) => {
                               this.handleKeyDown(event)
                           }}
                           onChange={(event) => {
                               this.SuggestLocations(event,)
                           }}
                    />
                    {this.state.value &&
                    <AiFillCloseCircle scale={4} size={30} className="input-marker" onClick={() => {
                        this.setState({value: ''},
                            () => {
                                this.setPersistence()
                            }
                        )
                    }}
                    />
                    }
                </Container>
                <Container className="w-100 text-primary mt-1 select-locations py-3 pointers"
                           onClick={() => {
                               this.getLocation()
                           }}>
                    <BiCurrentLocation scale={4} size={30} className="input-marker mr-3"/>
                    <div className="fill-rest">Use Current Location / Please enable Location services</div>
                </Container>

                {this.displaySuggestions(this.state.suggestions, this.props.type)}
            </>

        )
    }
}

export class LocationQuerySearchBox extends LocationSearchBox {
    state = {
        suggestions: [],
        suggestionsSearch: [],
        selected: 0,
        selectedSearch: -1,
        value: localStorage.getItem("loc") === 'Select Location' ? '' : localStorage.getItem("loc") || '',
        query: localStorage.getItem("query") === 'Search' ? '' : localStorage.getItem("query") || '',
        lat: localStorage.getItem('lat'),
        lng: localStorage.getItem('lng'),
        display: 0
    }

    setPersistence() {

        localStorage.setItem("loc", this.state.value || 'Select Location')
        localStorage.setItem("query", this.state.query || 'Search')
        localStorage.setItem('lat', this.state.lat)
        localStorage.setItem('lng', this.state.lng)
    }


    async SuggestLocationsSearch(event) {
        this.setState({query: event.target.value})
        const values = await Marker.filter({search: this.state.query, limit: 5})
        let {details} = values
        console.log(details)
        if (!details) {
            this.setState({suggestionsSearch: values.results})
        }
    }

    handleEnterSearch(e) {
        let newSelected = this.state.suggestionsSearch[this.state.selectedSearch]
        let newValue;
        newValue = newSelected ? newSelected.name : this.state.query;
        this.setState({
            query: newValue,
            display: 0
        }, () => {
            this.setPersistence()
            this.props.close()
        })

    }


    handleKeyDownSearch(e) {
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
            this.handleEnterSearch(e)
        }
    }

    displaySuggestionsSearch(list, type) {
        return list.map((item, i) => {
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
                                this.setPersistence()
                                this.props.close()
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
            <>
                <Container className={"w-100 input-holder mb-3 " + ((1 === this.state.display) ? "active-blue" : '')}>
                    <Search className=" input-marker"/>

                    <input placeholder="Search" className={"main-input "}
                           value={this.state.query}
                           onKeyDown={(event) => {
                               this.handleKeyDownSearch(event)
                           }}
                           onChange={(event) => {
                               this.SuggestLocationsSearch(event,)
                           }}
                           onFocusCapture={event => {
                               this.setState({display: 1})
                           }}
                    />
                    {this.state.query &&
                    <AiFillCloseCircle scale={4} size={30} className="input-marker" onClick={() => {
                        this.setState({query: ''},
                            () => {
                                this.setPersistence()
                            })
                    }}/>}
                </Container>

                <Container className={"w-100 input-holder " + ((2 === this.state.display) ? "active-blue" : '')}>
                    <MarkerSvg className=" input-marker"/>

                    <input placeholder="Select Location"
                           className={"main-input "}
                           value={this.state.value}
                           onKeyDown={(event) => {
                               this.handleKeyDown(event)
                           }}
                           onFocusCapture={event => {
                               this.setState({display: 2})
                           }}
                           onChange={(event) => {
                               this.SuggestLocations(event)
                           }}/>
                    {this.state.value &&
                    <AiFillCloseCircle scale={4} size={30} className="input-marker" onClick={() => {
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
                               this.getLocation()
                           }}>
                    <BiCurrentLocation scale={4} size={30} className="input-marker mr-3"/>
                    <div className="fill-rest">Use Current Location / Please enable Location services</div>
                </Container>}
                {this.state.display === 1 ? this.displaySuggestionsSearch(this.state.suggestionsSearch, this.props.type)
                    : this.state.display === 2 ? this.displaySuggestions(this.state.suggestions, this.props.type) : ''}

            </>

        )
    }

}

export class FullScreenLocation extends ResponsiveComponent {

    render() {
        return (<div className="fixed-top w-100 h-100 bg-white header">

            <Container fluid={true} className="py-3 bg-grey justify-content-start">
                <div className="BlueBackground p-2" onClick={() => {
                    this.props.close()
                }}>
                    <Back/>
                </div>
                <div className="h3 m-0 mx-2">
                    Select Location
                </div>
            </Container>
            <Container fluid={true} className="mt-3">
                <LocationSearchBox name="loc" close={() => {
                    this.props.close()
                }}/>
            </Container>
        </div>)
    }
}

export class FullScreenSearch extends ResponsiveComponent {
    render() {
        return (<div className="fixed-top w-100 h-100 bg-white header">
            <Container fluid={true} className="py-3">
                <div className="BlueBackground p-2" onClick={() => {
                    this.props.close()
                }}>
                    <Back/>
                </div>
                <Link to={"/search"} className="h5 text-dark u-link  m-0 mx-2" onClick={this.props.close}>
                    Search
                </Link>

            </Container>
            <Container fluid={true} className="mt-3">
                <LocationQuerySearchBox name="loc" close={() => {
                }}/>
            </Container>
        </div>)
    }
}