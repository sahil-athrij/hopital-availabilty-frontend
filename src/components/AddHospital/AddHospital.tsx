import React from "react";
import {AuthComponent, AuthProps, AuthState} from "../../api/auth";
import {Container} from "react-bootstrap";
import {Step, StepLabel, Stepper} from "@material-ui/core";
import {toast} from "react-toastify";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './AddHospital.css';

interface AddHospitalState extends AuthState {
    position: number
}

export class AddHospital extends AuthComponent<AuthProps, AddHospitalState> {

    constructor(props: AuthProps) {
        super(props);
        this.state = {
            ...this.state,
            position: 0
        }
    }

    setPosition = (position: number) => {
        let filled = true
        console.log(filled)
        if (filled)
            this.setState({position})
        else {
            toast.error('Please fill all the required details before proceeding', {
                position: "bottom-center",
            });
        }
    }
    eventHandlers = (event: any) => {
        console.log(event)
    }

    render() {
        if (!this.state.auth) {
            this.performAuth()
            return (<></>)
        } else {
            const center = {
                lat: 51.505,
                lng: -0.09,
            }
            return (
                <div className="bg-grey d-flex flex-column  justify-content-between min-vh-100">

                    <Container className="mt-5 pt-4 ">
                        <h4><b>Add Hospital</b></h4>
                    </Container>
                    <Container className=" py-3 bg-white neumorphic-input">

                        {this.state.position === 0 &&
                        <div>
                            <MapContainer center={center} zoom={13} scrollWheelZoom={true} touchZoom={true} doubleClickZoom={true}

                            >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker
                                    draggable={false}
                                    position={center}>
                                </Marker>
                            </MapContainer>

                        </div>

                        }
                        {this.state.position === 1 &&
                        <div>2</div>
                        }

                    </Container>

                    <Container className=" py-2 bg-white neumorphic-input p-0 ">
                        <div className="d-flex flex-row px-3 w-100 justify-content-center">
                            {this.state.position !== 0 &&
                            <button className="btn w-50 btn-light" onClick={() => {
                                this.setPosition(this.state.position - 1)
                            }}>Previous</button>
                            }
                            {this.state.position !== 4 ?
                                <button className="btn w-50 btn-primary blue-gradient"
                                        onClick={() => {
                                            this.setPosition(this.state.position + 1)
                                        }}> Next</button> :
                                <button className="btn w-50 btn-success"
                                        onClick={() => this.setPosition(0)}> Submit</button>}
                        </div>

                        <Stepper activeStep={this.state.position} alternativeLabel>
                            <Step onClick={() => {
                                this.setPosition(0)
                            }}><StepLabel/></Step>
                            <Step onClick={() => {
                                this.setPosition(1)
                            }}><StepLabel/></Step>

                        </Stepper>
                        <div className="space-50"/>
                    </Container>
                </div>

            )
        }
    }
}