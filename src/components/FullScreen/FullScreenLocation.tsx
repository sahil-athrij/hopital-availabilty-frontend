import {ResponsiveComponent, ResponsiveProps, ResponsiveState} from "../ResponsiveComponent";
import {Container} from "react-bootstrap";
import {ReactComponent as Back} from "../../images/back.svg";
import {ReactComponent as MarkerSvg} from "../../images/markersvg.svg";
import {get} from "../../api/api";
import {AiOutlineClose, BiCurrentLocation, ImLocation2} from "react-icons/all";
import {getParam, setParam} from "../../api/QueryCreator";
import {RouteComponentProps, withRouter} from "react-router";
import React from "react";


import './location.css'


export interface LocationSearchProps extends RouteComponentProps<ResponsiveProps> {
    close: () => void,
    closeWindow?: () => void
}

type Suggestion = {
    lat: number;
    lon: number;
    address: {
        country?: string;
        state?: string;
        city?: string;
        name: string
    }
}

export interface LocationSearchState extends ResponsiveState {
    suggestions: Suggestion[],
    selected: number,
    value: string,
    lat: string,
    lng: string,
    query?: string,
    display: number | boolean,

}

export class LocationSearchBoxLoc<P extends LocationSearchProps, S extends LocationSearchState> extends ResponsiveComponent<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            ...this.state,
            suggestions: [],
            selected: 0,
            value: getParam('loc', 'Select Location'),
            lat: getParam('lat'),
            lng: getParam('lng'),
            display: 0
        }

    }


    setPersistence() {
        setParam("loc", this.state.value, 'Select Location')
        setParam('lat', this.state.lat)
        setParam('lng', this.state.lng)
    }

    async SuggestLocations(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({value: event.target.value})
        let url;
        try {
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
        } catch (e) {

        }
    }

    searchData = () => {
        console.log('hello these')
        this.setPersistence()
        let query = ''
        if (this.state.query) {
            query = this.state.query.replace(/ /g, "+")
        }
        this.props.history.replace({
                pathname: '/search',
                search: `query=${query}&loc=${this.state.value}&lat=${this.state.lat}&lng=${this.state.lng}`
            }
        )
        this.props.history.push({
                pathname: '/search',
                search: `query=${query}&loc=${this.state.value}&lat=${this.state.lat}&lng=${this.state.lng}`
            }
        )
    }

    searchCallBack = () => {
        this.searchData()
        this.props.close()
        if (this.props.closeWindow) {
            this.props.closeWindow()
        }
    }

    handleEnter() {
        let newSelected = this.state.suggestions[this.state.selected]
        if (newSelected) {
            let newValue = newSelected.address.name
            this.setState({
                value: newValue,
                display: 0
            }, () => {
                this.searchCallBack()

            })
        }
    }


    handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
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
            this.handleEnter()
        }
    }

    displaySuggestions(list: Suggestion[]) {
        return list.map((item, i) => {
                return (
                    <Container className={'w-100  py-3  select-locations ' + ((i === this.state.selected) ? "active" : '')}
                               key={i}
                               onClick={() => {
                                   let newValue = item.address.name
                                   this.setState({
                                       value: newValue,
                                       display: 0,
                                       lat: item.lat.toString(),
                                       lng: item.lon.toString(),
                                   }, () => {
                                       this.setPersistence()
                                       this.props.close()
                                   })
                               }}>

                        <ImLocation2 scale={4} size={30} className="input-marker mr-3"/>
                        <div className="fill-rest"><b>{item.address.name}</b>
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
                try {

                    let loc = await get('https://us1.locationiq.com/v1/reverse.php', {
                        key: 'pk.760f1338e289bacc788f9e0ae4a4951e',
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        format: "json"

                    })
                    console.log(loc)
                    this.setState({
                        lat: position.coords.latitude.toString(),
                        lng: position.coords.longitude.toString(),
                        value: loc.address.city_district || loc.address.county,
                        display: 0
                    }, () => {
                        this.searchCallBack()

                    })
                } catch (e) {
                    console.log(e)
                }
            },
            err => console.log(err)
        )

    }

    render() {
        return <React.Fragment>
            <Container className="w-100 input-holder">
                <MarkerSvg className=" input-marker"/>
                <input autoFocus={true} placeholder="Select Location" className="main-input"
                       value={this.state.value}
                       type="search"
                       onKeyDown={(event) => {
                           this.handleKeyDown(event)
                       }}
                       onChange={(event) => {
                           this.SuggestLocations(event).then()
                       }}
                />
                {this.state.value &&
                <AiOutlineClose scale={4} size={30} className="input-marker" onClick={() => {
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
                           this.getLocation().then()
                       }}>
                <BiCurrentLocation scale={4} size={30} className="input-marker mr-3"/>
                <div className="fill-rest">Use Current Location / Please enable Location services</div>
            </Container>

            {this.displaySuggestions(this.state.suggestions)}
        </React.Fragment>
    }
}

export const LocationSearchBox = withRouter(LocationSearchBoxLoc)


export interface FullScreenLocationProps extends ResponsiveProps {
    close: () => void,
    closeWindow?: () => void
}

export class FullScreenLocation extends ResponsiveComponent<FullScreenLocationProps, ResponsiveState> {
    render() {
        return (<div className="fixed-top w-100 h-100 bg-white header">

            <Container fluid={true} className="py-3 bg-grey justify-content-start">
                <button className="BlueBackground p-2" onClick={() => {
                    this.props.close()
                }}>
                    <Back/>
                </button>
                <div className="h3 m-0 mx-2">
                    Select Location
                </div>
            </Container>
            <Container fluid={true} className="mt-3">
                <LocationSearchBox close={() => {
                    this.props.close()
                }}/>
            </Container>
        </div>)

    }
}


