import {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {LocationSearch} from "../components/LocationSearch/locationSearch"
import {RatingQueryForm} from "../components/RatingForm/RatingQueryForm";
import {withRouter} from "react-router";
import {filterFormGetter} from "../api/QueryCreator";

class Index extends Component {


    state = {showing: false};

    handleSubmit(event) {
        event.preventDefault()
        let {history} = this.props
        history.push(filterFormGetter('/search'))


    }

    render() {

        const {showing} = this.state
        return (
            <Container className="my-5 py-5">
                <Row className="mt-5 pt-5 align-self-center">
                    <Col xs={12} md={{span: 8, offset: 2}} lg={{span: 6, offset: 3}} className="neumorphic_form">
                        <form onSubmit={(event) => {
                            this.handleSubmit(event)
                        }} className="my-3">
                            <div className="text-center h3 p-3">Search For Hospitals</div>
                            <Row className="form-row mb-3 px-2 px-md-5">
                                <div className="input-group">
                                    <LocationSearch/>
                                </div>
                            </Row>

                            {!showing &&
                            <div className="mb-3" id="bottomsearch">
                                <center>
                                    <button type="submit" className="btn input-left input-right bg-dark btn-dark">Search
                                    </button>
                                </center>
                            </div>
                            }

                            <div className="text-center mb-3">
                                <a className="links link-primary" onClick={() => this.setState({showing: !showing})}
                                   id="filtertext">
                                    {showing ? "Hide Filter" : "Show Filter"}
                                </a>
                            </div>
                            <div className="container text-center h6" id="filters">
                                {showing && <RatingQueryForm/>}
                            </div>
                            {showing &&
                            <div className="mb-3">
                                <center>
                                    <button type="submit" className="btn input-left input-right bg-dark btn-dark">Search
                                    </button>
                                </center>
                            </div>
                            }
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default withRouter(Index);