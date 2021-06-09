import {Component, Fragment} from "react";
import {Col, OverlayTrigger, Popover,} from "react-bootstrap";
import './rate.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'

class InfoPopover extends Component {
    popover = (<Popover id="popover-basic">
        <Popover.Title as="h3">{this.props.label}</Popover.Title>
        <Popover.Content>
            {this.props.content}
        </Popover.Content>
    </Popover>)

    render() {
        return (
            <OverlayTrigger trigger="click" rootClose placement="right" overlay={this.popover}
                            defaultShow={false} delay={1} flip={true}>
                <FontAwesomeIcon aria-hidden="true" icon={faInfoCircle}/>
            </OverlayTrigger>
        );
    }
}

export class SliderRating extends Component {
    state = {value: 0}

    render() {
        return (
            <>
                <Col className={'my-2 ' + this.props.col}>
                    <label htmlFor={this.props.name} className="">
                        {this.props.label} {this.props.content &&
                    <InfoPopover label={this.props.label} content={this.props.content}/>}
                    </label>
                    <Col className="star-rating">
                        <div className="form-check-inline">
                            <input step={20} type="range" value={this.state.value}
                                   name={this.props.name} disabled={this.props.disabled}
                                   onChange={(event) => {
                                       if (!this.props.disabled) {
                                           this.setState({value: event.target.value})
                                       }
                                   }}
                            />
                            <output className="ot mx-2">{this.state.value}</output>
                        </div>
                        {this.props.feedback &&
                        <div className="invalid-feedback">
                            Please rate {this.props.label}.
                        </div>
                        }
                    </Col>
                </Col>
            </>

        )
    }
}

export class StarRating extends Component {
    state = {value: 0}

    render() {
        return (
            <>
                <Col className={'my-2 ' + this.props.col}>
                    <label htmlFor={this.props.name} className="">
                        {this.props.label} {this.props.content &&
                    <InfoPopover label={this.props.label} content={this.props.content}/>}
                    </label>
                    <Col className="star-rating">
                        <div id={this.props.name} className="form-check-inline">
                            <div className={'rate ' + this.props.extra_class}>
                                {this.props.disabled ?
                                    <span>
                                        <i className="fa fa-times-circle move-up"
                                           onClick="$('input:radio[name={{ name }}]').val([0]);$('#{{ name }}feedback').show();"/>
                                    </span>
                                    :
                                    <output className="ot mx-2">{this.state.value}</output>
                                }

                                {[5, 4, 3, 2, 1].map((number, i) =>
                                    (<Fragment key={i}>
                                            <input type="radio" id={this.props.name + number} value={number}
                                                   name={this.props.name} disabled={this.props.disabled}
                                                   defaultChecked={parseInt(this.state.value) === number}
                                                   onClick={() => {
                                                       if (!this.props.disabled) {
                                                           this.setState({value: number})
                                                       }
                                                   }}
                                            />
                                            {/*<label key={i + 5} htmlFor={this.props.name + number}/>*/}
                                            <label htmlFor={this.props.name + number}> </label>
                                        </Fragment>
                                    )
                                )}
                            </div>
                            {this.props.feedback &&
                            <div id="{{ name }}feedback" className="invalid-feedback">
                                Please rate {this.props.label}.
                            </div>
                            }
                        </div>
                    </Col>
                </Col>
            </>
        )
    }
}