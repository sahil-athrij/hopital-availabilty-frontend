import {Component,Fragment} from "react";
import {Container,} from "react-bootstrap";
import './stars.css'
import {CgPill, FaMoneyBillAlt, FaStar, SiAtom} from "react-icons/all";


export class StarRatingReview extends Component {
    state = {
        value: this.props.value,
    }

    render() {
        let value = this.props.value
        let SvgInput
        let className;
        if (this.props.type === 'financial') {
            SvgInput = FaMoneyBillAlt
            className = 'financial-full'
        } else if (this.props.type === 'covid') {
            SvgInput = CgPill
            className = 'covid-full'
        } else if (this.props.type === 'oxygen') {
            SvgInput = SiAtom
            className = 'oxygen-full'
        } else {
            SvgInput = FaStar
            className = 'star-full'
        }
        return (
            <>
                <label htmlFor={this.props.name} className="">
                    {this.props.label}
                </label>
                <Container className="d-flex flex-row align-items-center justify-content-between">
                    {[1, 2, 3, 4, 5].map((number, i) =>
                        (<Fragment key={number}>
                                <SvgInput name={this.props.name} size={value - 1 === i ? 25 : 20} spacing={5}
                                          key={number}
                                          className={(value <= i ? 'star-empty' : className) + " pointers "}
                                          onClick={(event) => {
                                              this.setState({value: number})
                                              this.props.setValue(this.props.name, number)
                                          }}/>
                                <input type="radio" name={this.props.name} value={number} className="position-absolute"
                                       style={{opacity: 0,left:"-300px"}}
                                       checked={this.props.value === number}
                                       onChange={(event) => {
                                           this.setState({value: number})
                                           this.props.setValue(this.props.name, number)
                                       }}
                                />
                            </Fragment>
                        )
                    )}
                </Container>
            </>
        )
    }
}