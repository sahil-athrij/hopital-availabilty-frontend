import {Component} from "react";
import {Col} from "react-bootstrap";
import {ReactComponent as Search} from "../../images/search.svg"
import {ReactComponent as Close} from "../../images/close.svg"
import {ReactComponent as Marker} from "../../images/marker.svg"
import {ReactComponent as Loading} from "../../images/loading.svg"
import {get} from "../../api/api"

class SearchBox extends Component {

    state = {
        suggestions: [],
        displaySuggestions: "none",
        selected: 0,
        loc: '',
        value: '',
    }
    async SuggestLocations(event) {
        this.setState({loc: event.target.value})
        const values = await get('https://api.locationiq.com/v1/autocomplete.php',
            {key: 'pk.760f1338e289bacc788f9e0ae4a4951e', q: event.target.value, limit: 5, countrycodes: 'in'})
        console.log(values)
        let {error} = values
        if (!error) {
            this.setState({displaySuggestions: "Block", suggestions: values})
        }
    }

    handleKeyDown(e) {
        const {selected, suggestions} = this.state
        console.log(e.key)
        if (e.key === 'ArrowUp' && suggestions.length > 0) {
            e.preventDefault()
            this.setState(prevState => ({
                selected: prevState.selected - 1
            }))
        } else if (e.key === "ArrowDown" && selected < suggestions.length - 1) {
            e.preventDefault()
            this.setState(prevState => ({
                selected: prevState.selected + 1
            }))
        } else if (e.key === "Enter") {
            e.preventDefault()
            this.setState({
                loc: this.state.suggestions[this.state.selected].address.name,
                displaySuggestions: "None"
            })
        }
    }

    displaySuggestions(list) {
        return list.map((item, i) => {
                return (
                    <li className={(i === this.state.selected) ? "active" : ''} key={i}
                        onClick={(event) => {
                            this.setState({loc: item.address.name})
                        }}
                    >
                        <a>
                            <div className="mapboxgl-ctrl-geocoder--suggestion">
                                <div className="mapboxgl-ctrl-geocoder--suggestion-title">{item.address.name}</div>
                                <div
                                    className="mapboxgl-ctrl-geocoder--suggestion-address">{item.display_address}
                                </div>
                            </div>
                        </a>
                    </li>)
            }
        )
    }

    render() {
        return (
            <>
                <input type="text" className="mapboxgl-ctrl-geocoder--input"
                       placeholder="Location (Auto)"
                       onChange={(event) => {
                           this.SuggestLocations(event)
                       }}
                       onBlur={(event) => {
                           this.setState({displaySuggestions: "None"})
                       }}
                       onKeyDown={(event) => {
                           this.handleKeyDown(event)
                       }}
                       value={this.state.loc}
                       aria-label="Location (Auto)" name="loc" id="loc" autoComplete="off"/>
                <div className="suggestions-wrapper">
                    <ul className="suggestions" style={{display: this.state.displaySuggestions}}>
                        {this.displaySuggestions(this.state.suggestions)}
                    </ul>
                </div>
                <div className="mapboxgl-ctrl-geocoder--pin-right">
                    <button aria-label="Clear" className="mapboxgl-ctrl-geocoder--button"
                            style={{display: this.state.loc ? 'Block' : "None"}}
                            onClick={(event) => {
                                event.preventDefault()
                                this.setState({loc: ""})
                            }}>
                        <Close/>
                    </button>
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
                        <Marker/>
                        <SearchBox/>
                    </div>
                </Col>
                <Col xs={12} md={6} className="input-right p-0 my-2">
                    <div className="mapboxgl-ctrl-geocoder  input-small-rounder input-right mapboxgl-ctrl w-100">
                        <Search/>
                        <input type="text" className="mapboxgl-ctrl-geocoder--input" placeholder="Hospital Name"
                               aria-label="Hospital Name" name="query" id="hspsearch"/>
                        <div className="suggestions-wrapper">
                            <ul className="suggestions" style={{display: null}}/>
                        </div>
                        <div className="mapboxgl-ctrl-geocoder--pin-right">
                            <button aria-label="Clear" className="mapboxgl-ctrl-geocoder--button">
                                <Close/>
                            </button>
                        </div>
                    </div>
                </Col>
            </>
        )
    }
}

