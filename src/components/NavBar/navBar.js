import {Container, Nav, Navbar} from "react-bootstrap";
import ResponsiveComponent from "../ResponsiveComponent";
import {ReactComponent as Burger} from "../../images/burger.svg"
import {ReactComponent as Brand} from "../../images/brand.svg"
import './nabar.css';
import {ReactComponent as Marker} from "../../images/markersvg.svg";
import {CSSTransition} from "react-transition-group";
import {FullScreenLocation, FullScreenSearch} from "../LocationSearch/FullScreenLocation";
import {BiSearch, BiSlider} from "react-icons/all";
import {withRouter} from "react-router";

class NavBarLoc extends ResponsiveComponent {

    state = {
        loc: localStorage.getItem("loc") || "Select Location",
        show_location: false,
        query: localStorage.getItem("query") || "Search Hospitals",
        show_search: false,
        url: this.props.location.pathname
    }


    render() {
        console.log(this.props.location)
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="light" className="navbar  fixed-top bg-white"
                    id="navbar">

                <Container className fluid={true}>
                    <div className="justify-content-start">
                        <Navbar.Toggle aria-controls="navbarSupportedContent" className="BlueBackground p-2">
                        <span>
                             <Burger/>
                        </span>
                        </Navbar.Toggle>
                        <Navbar.Brand className="navbar-brand px-3" href={'#'}>
                            <Brand height={30} width={30}/>
                        </Navbar.Brand>
                    </div>
                    {
                        this.state.url === '/search' ?
                            <>
                                <div className="pointers" onClick={() => {
                                    this.setState({show_location: !this.state.show_location})
                                }}><BiSlider scale={4} size={30}/>
                                </div>
                            </>
                            :
                            <>
                                <div className="pointers" onClick={() => {
                                    this.setState({show_location: !this.state.show_location})
                                }}>{this.state.loc}<Marker/>
                                </div>
                                <CSSTransition classNames="location-screen" in={this.state.show_location} timeout={300}
                                               unmountOnExit
                                ><FullScreenLocation close={() => {
                                    let loc;
                                    loc = localStorage.getItem('loc')
                                    this.setState({show_location: false, loc: loc})
                                }}/>
                                </CSSTransition>
                            </>
                    }
                </Container>
                <Container className="w-100 input-holder pointers m-2" onClick={() => {
                    this.setState({show_search: !this.state.show_search})
                }}>
                    <BiSearch scale={4} size={30} className=" input-marker ml-3 mr-2"/>
                    <div
                        className="main-input searchbox fill-rest overflow-hidden"> {this.state.query}</div>
                </Container>
                <CSSTransition classNames="location-screen" in={this.state.show_search} timeout={300}
                               unmountOnExit
                >
                    <FullScreenSearch close={() => {
                        let loc;
                        loc = localStorage.getItem('loc')
                        let query;
                        query = localStorage.getItem("query")
                        this.setState({show_search: false, loc: loc, query: query})
                    }}/>
                </CSSTransition>


                {/*<form className="d-flex align-self-center text-center w-50 " method="GET" action="/search/">*/
                }
                {/*    <div className="input-group">*/
                }
                {/*        <LocationSearch/>*/
                }
                {/*    </div>*/
                }
                {/*</form>*/
                }
                <Navbar.Collapse className="justify-content-end" id="navbarSupportedContent">
                    <Nav className=" ml-auto ">

                        <Nav.Link href="/v2/" active={true}>Home</Nav.Link>
                        <Nav.Link href="/v2/add_hospital/">Add Hospital</Nav.Link>
                        <Nav.Link href="/v2/help/">Help</Nav.Link>

                    </Nav>

                </Navbar.Collapse>
                <div id="nav-bg">

                </div>

            </Navbar>

        )
    }

}

let NavBar;
export default NavBar = withRouter(NavBarLoc);