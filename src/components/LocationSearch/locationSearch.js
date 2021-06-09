import {Component} from "react";
import {Col} from "react-bootstrap";
import {ReactComponent as Search} from "../../images/search.svg"
import {ReactComponent as Close} from "../../images/close.svg"
import {ReactComponent as Marker} from "../../images/marker.svg"
import {ReactComponent as Loading} from "../../images/loading.svg"
import {get} from "../../api/api"

export class LocationSearch extends Component {

    SuggestLocations() {
        get('https://api.locationiq.com/v1/autocomplete.php',
            {key: 'pk.760f1338e289bacc788f9e0ae4a4951e', q: 1, limit: 5, countrycodes: 'in'}).then()
    }

    render() {
        return (
            <>
                <input name="lat" id="lat" hidden/>
                <input name="lng" id="lng" hidden/>
                <Col xs={12} md={6} className="input-left p-0 my-2">
                    <div className="mapboxgl-ctrl-geocoder mapboxgl-ctrl input-small-rounder w-100 input-left">
                        <Marker/>
                        <input type="text" className="mapboxgl-ctrl-geocoder--input"
                               placeholder="Location (Auto)"
                               onChange={this.SuggestLocations}
                               aria-label="Location (Auto)" name="loc" id="loc" autoComplete="off"/>
                        <div className="suggestions-wrapper">
                            <ul className="suggestions" style={{display: null}}/>
                        </div>
                        <div className="mapboxgl-ctrl-geocoder--pin-right">
                            <button aria-label="Clear" className="mapboxgl-ctrl-geocoder--button"
                                    style={{display: null}}>
                                <Close/>
                            </button>
                            <Loading/>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={6} className="input-right p-0 my-2">
                    <div className="mapboxgl-ctrl-geocoder input-right mapboxgl-ctrl w-100">
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

