import {Container} from "react-bootstrap";
import {withRouter} from "react-router";
import ResponsiveComponent from "../components/ResponsiveComponent";

class Index extends ResponsiveComponent {


    state = {showing: false};


    render() {

        return (
            <Container fluid={true}>
            </Container>
        );
    }

}

export default withRouter(Index);