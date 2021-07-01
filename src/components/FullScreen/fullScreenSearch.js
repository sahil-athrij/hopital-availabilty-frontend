import ResponsiveComponent from "../ResponsiveComponent";
import {Container} from "react-bootstrap";
import {ReactComponent as Back} from "../../images/back.svg";
import {LocationSearchBox} from "./FullScreenLocation";
import {Marker} from "../../api/model";
import {AiOutlineClose, BiCurrentLocation, FaHospital} from "react-icons/all";
import {ReactComponent as Search} from "../../images/search.svg";
import {ReactComponent as MarkerSvg} from "../../images/markersvg.svg";
import {getParam, setParam} from "../../api/QueryCreator";
import {withRouter} from "react-router";


export class LocationQuerySearchBoxLoc extends LocationSearchBox {
    state = {
        suggestions: [],
        suggestionsSearch: [],
        selected: 0,
        selectedSearch: -1,
        value: getParam('loc', 'Select Location'),
        query: getParam('query', 'Search Hospital'),
        lat: getParam('lat', null),
        lng: getParam('lng', null),
        display: 0
    }

    setPersistence() {

        setParam("loc", this.state.value, 'Select Location')
        setParam('query', this.state.query, 'Search Hospital')
        setParam('lat', this.state.lat)
        setParam('lng', this.state.lng)
        console.log(localStorage.getItem('lat'))
    }


    async SuggestLocationsSearch(event) {
        this.setState({query: event.target.value}, this.setPersistence)
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
            this.props.closeWindow()
            this.props.history.push({
                    pathname: '/search',
                    search: `query=${this.state.query.replace(/ /g, "+")}&loc=${this.state.value}&lat=${this.state.lat}&lng=${this.state.lng}`
                }
            )
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

    displaySuggestionsSearch(list) {
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
                               this.SuggestLocationsSearch(event,)
                           }}
                           onFocusCapture={event => {
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
                            this.props.closeWindow()
                            this.props.history.push({
                                    pathname: '/search',
                                    search: `query=${this.state.query.replace(/ /g, "+")}&loc=${this.state.value}&lat=${this.state.lat}&lng=${this.state.lng}`
                                }
                            )
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
                           onFocusCapture={event => {
                               this.setState({display: 2})
                           }}
                           onChange={(event) => {
                               this.SuggestLocations(event)
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

export const LocationQuerySearchBox = withRouter(LocationQuerySearchBoxLoc)

export class FullScreenSearch extends ResponsiveComponent {
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
                <LocationQuerySearchBox name="loc" close={() => {
                }} closeWindow={this.props.close}/>
            </Container>
        </div>)
    }
}