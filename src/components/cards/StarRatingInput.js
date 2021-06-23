import {Component} from "react";
import {Container,} from "react-bootstrap";
import './stars.css'
import {CgCloseO, CgPill, FaMoneyBillAlt, FaStar, SiAtom} from "react-icons/all";
import {getParam, setParam} from "../../api/QueryCreator";


export class StarRatingInput extends Component {
    state = {
        value: getParam(this.props.name),
    }


    setPersistence(value) {
        setParam(this.props.name, value,null)
    }


    render() {
        let value = getParam(this.props.name,0)
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
                <Container className="flex-row align-items-center justify-content-between">


                    {[1, 2, 3, 4, 5].map((number, i) =>
                        (<SvgInput name={this.props.name} size={20} spacing={5} key={number}
                                   className={(value <= i ? 'star-empty' : className) + " pointers "}
                                   onClick={(event) => {
                                       console.log('hello')
                                       this.setPersistence(number)
                                       this.setState({value: number})
                                   }}/>
                        )
                    )}

                    <CgCloseO size={20} spacing={4} className="pointers" onClick={(event) => {
                        this.setPersistence(0)
                        this.setState({value: 0})
                    }}
                    />
                </Container>
            </>
        )
    }
}