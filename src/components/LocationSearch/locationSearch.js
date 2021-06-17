import {Component} from "react";
import {Col} from "react-bootstrap";
import {ReactComponent as Search} from "../../images/search.svg"
import {ReactComponent as Close} from "../../images/close.svg"
import {ReactComponent as Marker} from "../../images/markersvg.svg"
import {ReactComponent as Loading} from "../../images/loading.svg"
import {get} from "../../api/api"

export class SearchBox extends Component {

    state = {
        suggestions: [],
        displaySuggestions: "none",
        selected: 0,
        value: '',
        mousedOver: false
    }

    componentDidMount() {
        let newValue = localStorage.getItem(this.props.name)
        this.setState({value: newValue})
    }

    setPersistence(value) {
        localStorage.setItem(this.props.name, value)
    }

    async SuggestLocations(event) {
        this.setPersistence(event.target.value)
        this.setState({value: event.target.value})
        let url;

        url = this.props.type === 'location' ? 'https://api.locationiq.com/v1/autocomplete.php' : 'http://127.0.0.1:8000/api/marker/';
        const values = await get(url, {
            key: 'pk.760f1338e289bacc788f9e0ae4a4951e',
            q: event.target.value,
            search: event.target.value,
            limit: 5,
            countrycodes: 'in'
        })
        console.log(values)
        let {error} = values
        if (!error) {
            let {results} = values
            if (results) {
                this.setState({displaySuggestions: "Block", suggestions: results})
            } else {
                this.setState({displaySuggestions: "Block", suggestions: values})
            }
        }
    }

    handleEnter(e) {
        let newSelected = this.state.suggestions[this.state.selected]
        this.setPersistence(this.state.value)

        if (newSelected) {
            let newValue = this.props.type === 'location' ? newSelected.address.name : newSelected.name
            this.setPersistence(newValue)
            this.setState({
                value: newValue,
                displaySuggestions: "None"
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
                    <li className={(i === this.state.selected) ? "active" : ''} key={i}
                        onClick={(event) => {
                            let newValue = type === 'location' ? item.address.name : item.name
                            this.setPersistence(newValue)
                            this.setState({
                                value: newValue,
                                displaySuggestions: "None"
                            })
                        }}
                        onMouseOver={(event) => {
                            this.setState({mousedOver: true})
                        }}
                        onMouseLeave={() => {
                            this.setState({mousedOver: false})
                        }}>
                        <a>
                            <div className="mapboxgl-ctrl-geocoder--suggestion">
                                <div className="mapboxgl-ctrl-geocoder--suggestion-title">
                                    {type === 'location' ? item.address.name : item.name}
                                </div>
                                <div
                                    className="mapboxgl-ctrl-geocoder--suggestion-address">
                                    {type === 'location' ? item.display_address : item.display_address}
                                </div>
                            </div>
                        </a>
                    </li>
                )
            }
        )
    }

    render() {
        return (
            <>
                <input type="text" className="mapboxgl-ctrl-geocoder--input"
                       placeholder={this.props.placeholder}
                       onChange={(event) => {
                           this.SuggestLocations(event,)
                       }}
                       onKeyDown={(event) => {
                           this.handleKeyDown(event)
                       }}
                       onBlur={(event) => {
                           if (!this.state.mousedOver)
                               this.setState({displaySuggestions: "None"})
                       }}
                       value={this.state.value}
                       aria-label={this.props.placeholder}
                       name={this.props.name}
                       id={this.props.id}
                       autoComplete="off"/>

                <div className="suggestions-wrapper">
                    <ul className="suggestions" style={{display: this.state.displaySuggestions}}>
                        {this.displaySuggestions(this.state.suggestions, this.props.type)}
                    </ul>
                </div>
                <div className="mapboxgl-ctrl-geocoder--pin-right">
                    <i aria-label="Clear" className="mapboxgl-ctrl-geocoder--button"
                       style={{display: this.state.value ? 'Block' : "None"}}
                       onClick={(event) => {
                           event.preventDefault()
                           this.setPersistence('')
                           this.setState({value: ""})
                       }}>
                        <Close/>
                    </i>
                    <Loading/>
                </div>
            </>

        )
    }

}


export class LocationSearch extends Component {

    render() {
        return (
            <>
                <input name="lat" id="lat" hidden/>
                <input name="lng" id="lng" hidden/>
                <Col xs={12} md={6} className="input-left p-0 my-2">
                    <div className="mapboxgl-ctrl-geocoder mapboxgl-ctrl input-small-rounder w-100 input-left">
                        <Marker className="mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-search"/>
                        <SearchBox placeholder="Location (Auto)" name="loc" id="loc" type="location"/>
                    </div>
                </Col>
                <Col xs={12} md={6} className="input-right p-0 my-2">
                    <div className="mapboxgl-ctrl-geocoder  input-small-rounder input-right mapboxgl-ctrl w-100">
                        <Search/>
                        <SearchBox placeholder="Hospital Name" name="query" id="hspsearch" type="search"/>
                    </div>
                </Col>
            </>
        )
    }
}


