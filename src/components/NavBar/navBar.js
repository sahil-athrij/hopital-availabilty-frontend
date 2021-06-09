import {Col, Container, Nav, Navbar} from "react-bootstrap";
import './nabar.css';
import {LocationSearch} from "../LocationSearch/locationSearch";


function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="light" className="navbar  fixed-top bg-white"
                id="navbar">
            <Container fluid={true}>
                <Navbar.Brand className="navbar-brand" href={'#'}>
                    <img src="" width="30" height="30" alt=""/>
                </Navbar.Brand>
                <Col xs={1} md={2}/>
                <form className="d-flex align-self-center text-center w-50 " method="GET" action="/search/">
                    <div className="input-group">
                        <LocationSearch/>
                    </div>
                </form>
                <Navbar.Toggle type="button" aria-controls="navbarSupportedContent"/>
                <Navbar.Collapse className="justify-content-end" id="navbarSupportedContent">
                    <Nav className=" ml-auto ">

                        <Nav.Link href="/v2/" active={true}>Home</Nav.Link>
                        <Nav.Link href="/v2/add_hospital/">Add Hospital</Nav.Link>
                        <Nav.Link href="/v2/help/">Help</Nav.Link>

                        {/*{% if user.is_authenticated %}*/}
                        {/*<li className="nav-item dropdown">*/}
                        {/*    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"*/}
                        {/*       data-bs-toggle="dropdown" aria-expanded="false">*/}
                        {/*        {{user.username}}*/}
                        {/*    </a>*/}
                        {/*    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
                        {/*        <li><a className="dropdown-item" href="/v2/logout">Logout</a></li>*/}
                        {/*    </ul>*/}
                        {/*</li>*/}
                        {/*{% else %}*/}
                        {/*<li className="nav-item ms-auto">*/}
                        {/*    <a className="nav-link " href="/v2/login/">login</a>*/}
                        {/*</li>*/}
                        {/*{% endif %}*/}
                    </Nav>

                </Navbar.Collapse>
            </Container>
            <div id="nav-bg">

            </div>

            {/*<Navbar.Brand href="#home">*/}
            {/*    <img*/}
            {/*        alt=""*/}
            {/*        src={Logo}*/}
            {/*        width="30"*/}
            {/*        height="30"*/}
            {/*        className="d-inline-block align-top Nav-logo"*/}
            {/*    />{' '}*/}
            {/*    NeedMedi*/}
            {/*</Navbar.Brand>*/}
            {/*<Navbar.Toggle aria-controls="responsive-navbar-nav"/>*/}
            {/*<Navbar.Collapse id="responsive-navbar-nav">*/}
            {/*    <Nav className="ml-auto">*/}
            {/*        <Nav.Link eventKey={2} href="#login" className="mx-2">*/}
            {/*            Login*/}
            {/*        </Nav.Link>*/}
            {/*        <Nav.Link href="#help" className="mx-2">Help</Nav.Link>*/}
            {/*    </Nav>*/}
            {/*</Navbar.Collapse>*/}
        </Navbar>

    );
}

export default NavBar;