import {Container} from 'react-bootstrap';
import './indexcard.css';

function locationSearch() {
    return (
        <Container className="my-5 py-5">
            <div className="row mt-5 pt-5 align-self-center">
                {/*<div className="col-12 col-md-2 col-lg-3"></div>*/}
                <div className="col12 col-md-8 col-lg-6 neumorphic_form" id="toplevel">
                    <form action="" method="get" className="my-3">
                        <div className="text-center h3 p-3">Search For Hospitals</div>

                        <div className="form-row mb-3 px-2 px-md-5">
                            <div className="input-group">
                                {/*{% include 'v2/components/locationsearch.html' %}*/}
                            </div>

                        </div>

                        <div className="" id="topsearch">
                            <center>
                                <button type="submit" className="btn input-left input-right bg-dark btn-dark">Search
                                </button>
                            </center>
                        </div>
                        <div className="text-center mb-3">
                            <a className="links link-primary" href="javascript:void(0)" onClick="toggleFilters()"
                               id="filtertext">
                                Filter Results
                            </a>
                        </div>
                        <div className="container text-center h6" id="filters">
                            {/*{% include 'v2/components/ratings_form.html' %}*/}


                        </div>
                        <div className="mb-3" id="bottomsearch">
                            <center>
                                <button type="submit" className="btn input-left input-right bg-dark btn-dark">Search
                                </button>
                            </center>
                        </div>
                    </form>

                </div>
            </div>
        </Container>
    );
}

export default locationSearch;