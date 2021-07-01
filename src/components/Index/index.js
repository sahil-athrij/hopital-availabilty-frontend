import {Container} from "react-bootstrap";
import {withRouter} from "react-router";
import './index.css'
import {AuthComponent} from "../../api/auth";

class Index extends AuthComponent {


    render() {

        return (
            <>
                <Container fluid={true} className=" mt-5 p-3 ">

                </Container>
                <Container fluid={true} className=" mt-5 blue-gradient py-2 holder">

                    <div className=" p-2 text-white">
                        <h3>Search For Hospitals</h3>
                        <h6> hello</h6>
                        <h6>take help from friends</h6>
                        <h6> hello</h6>
                        <div className="d-flex justify-content-even">
                            <button onClick={this.performAuth} className={"btn btn-light flex-fill m-2 py-2 round-15 bg-white"}><b>Login</b></button>
                            <button  onClick={this.performAuth} className={"btn btn-light flex-fill m-2 py-2 round-15 bg-white"}><b>Sign Up</b></button>
                        </div>
                    </div>
                </Container>
            </>
        );
    }

}

export default withRouter(Index);