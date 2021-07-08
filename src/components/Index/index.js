import {Container} from "react-bootstrap";
import './index.css'
import {AuthComponent} from "../../api/auth";
import {AuthenticatedBanner, Banners} from "./Banners";
import './banner.css';
import {withRouter} from "react-router";

class Index extends AuthComponent {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            display: true
        }
    }


    render() {

        return (
            <>
                <Container fluid={true} className=" mt-5 p-3 ">

                </Container>
                {
                    this.state.auth ? <AuthenticatedBanner/> : <Banners/>
                }
            </>)
    }

}

export default withRouter(Index);