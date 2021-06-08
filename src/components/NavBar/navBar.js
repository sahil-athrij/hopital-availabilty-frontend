import {Navbar} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import Logo from "../../images/logo.svg";
import './nabar.css';

function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="NavBar">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src={Logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top Nav-logo"
                />{' '}
                NeedMedi
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link eventKey={2} href="#login" className="mx-2">
                        Login
                    </Nav.Link>
                    <Nav.Link href="#help" className="mx-2">Help</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );
}

export default NavBar;