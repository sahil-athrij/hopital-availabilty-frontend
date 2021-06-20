import {Component} from "react";
import {Container} from "react-bootstrap";
import Slider from "@material-ui/core/Slider";
import {Input, withStyles} from "@material-ui/core";
import './stars.css'

const AirbnbSlider = withStyles({
    root: {
        color: '#3a8589',
        height: 3,
        padding: '13px 0',
    },
    thumb: {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        marginTop: -12,
        marginLeft: -13,
        boxShadow: '#ebebeb 0 2px 2px',
        '&:focus, &:hover, &$active': {
            boxShadow: '#ccc 0 2px 3px 1px',
        },
        '& .bar': {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    track: {
        height: 3,
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: 3,
    },
})(Slider);

function AirbnbThumbComponent(props) {
    return (
        <span {...props}>
      <span className="bar"/>
      <span className="bar"/>
      <span className="bar"/>
    </span>
    );
}

export class SliderRatingInput extends Component {
    state = {value: 0}

    setPersistence(value) {
        localStorage.setItem(this.props.name, value)
    }

    handleValueChange(newValue) {
        this.setPersistence(newValue)
        this.setState({value: newValue})
    }

    render() {
        let value = 0 || localStorage.getItem(this.props.name)
        console.log(value)
        return (

            <>
                <label htmlFor={this.props.name} className="">
                    {this.props.label}
                </label>
                <Container className="flex-row align-items-center justify-content-between">
                    <AirbnbSlider
                        ThumbComponent={AirbnbThumbComponent}
                        className="w-100 slider-input"
                        step={20}
                        value={value}
                        onChange={(e, newValue) => this.handleValueChange(newValue)}
                        aria-labelledby="input-slider"
                        valueLabelDisplay="on"
                    />
                    <div>
                        Percentage :
                        <Input
                            value={value}
                            className="w-50"

                            margin="dense"
                            onChange={(e) => this.handleValueChange(e.target.value)}
                            onBlur={(event) => {
                                if (value < 0) {
                                    this.handleValueChange(0)
                                } else if (value > 100) {
                                    this.handleValueChange(100)
                                }
                            }}
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: 100,
                                type: 'number',
                            }}
                        />
                    </div>


                </Container>
            </>

        )
    }
}

export class DoubleSliderRatingInput extends Component {
    state = {valuemin: 0, valuemax: 100}

    setPersistence(valuemin, valuemax) {
        localStorage.setItem(this.props.name + "_gte", Number(valuemin))
        localStorage.setItem(this.props.name + "_lte", Number(valuemax))
    }

    handleValueChange(newValue1, newValue2) {
        if (newValue1 < 0) {
            this.setPersistence(0, newValue2)
        } else if (newValue1 > newValue2) {
            this.setPersistence(newValue2 - 1, newValue2)

        } else if (newValue2 > 1000000) {
            this.setPersistence(newValue1, 1000000)
        } else {
            this.setPersistence(newValue1, newValue2)

        }
        this.setState({valuemin: newValue1, valuemax: newValue2})
    }

    render() {
        let valuemin = Number(localStorage.getItem(this.props.name + "_gte"))
        let valuemax = Number(localStorage.getItem(this.props.name + "_lte") || 100)
        return (

            <>
                <label htmlFor={this.props.name} className="">
                    {this.props.label}
                </label>
                <Container className="flex-row align-items-center justify-content-between">
                    <AirbnbSlider
                        className="w-100 slider-input"
                        ThumbComponent={AirbnbThumbComponent}
                        step={1000}
                        min={0}
                        max={20000}
                        value={[valuemin, valuemax]}
                        onChange={(e, newValue) => this.handleValueChange(...newValue)}
                        aria-labelledby="input-slider"
                    />
                    <div className="flex-row d-flex align-items-center justify-content-between w-100">
                        <div className="w-50 p-2">
                            Min:
                            <Input
                                value={valuemin}
                                className="w-100"
                                margin="dense"
                                onChange={(e) => this.handleValueChange(e.target.value, valuemax)}
                                onBlur={(event) => {
                                    this.handleValueChange(event.target.value, valuemax)
                                }}
                                inputProps={{
                                    step: 1000,
                                    min: 0,
                                    max: 20000,
                                    type: 'number',
                                }}
                            />
                        </div>

                        <div className="w-50 p-2">
                            Max:
                            <Input
                                value={valuemax}
                                className="w-100"
                                margin="dense"
                                onChange={(e) => this.handleValueChange(valuemin, e.target.value)}
                                onBlur={(event) => {

                                }}
                                inputProps={{
                                    step: 1000,
                                    min: 0,
                                    max: 20000,
                                    type: 'number',
                                }}
                            />

                        </div>

                    </div>


                </Container>
            </>

        )
    }
}