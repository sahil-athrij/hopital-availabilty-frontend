import React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {FullScreenSearch} from "../FullScreen/fullScreenSearch";
import {AuthComponent, AuthState} from "../../api/auth";
import {getParam} from "../../api/QueryCreator";
import {CSSTransition} from "react-transition-group";
import {Container, Navbar} from "react-bootstrap";
import {ResponsiveState} from "../ResponsiveComponent";
import {ReactComponent as Burger} from "../../images/burger.svg";


import "./nabar.css";

import {Avatar} from "antd";

type NavBarProp = RouteComponentProps<Record<string, string|undefined>>
/** 
 * properties of ResponsiveState is called in to NavBarState
 * Assigning type of variables
 */
interface NavBarState extends ResponsiveState, AuthState{

    loc: string,
    show_location: boolean,
    query: string,
    show_search: boolean,
    show_filter: boolean,
    show_user: boolean,
}

export class NavBarLoc extends AuthComponent<NavBarProp, NavBarState> 
{
/**
 * Constructor description.
 * initialize loc, query
 * @returns { JSX.Element } navBar Component
 */
    constructor(props: NavBarProp) 
    {
        super(props);
        this.state = {
            ...this.state,
            loc: getParam("loc", "Select Location", true),       //get parameter or set it as default value 
            query: getParam("query", "Search Hospital", true),  //get parameter or set it as default value 
            show_user: window.location.href.includes("#user"),         //set as true if is url contain #user
            show_filter: window.location.href.includes("#filter"),    //set as true if is url contain #filter
            show_location: window.location.href.includes("#location"),   //set as true if is url contain #location
            show_search: window.location.href.includes("#search")       //set as true if is url contain #search
        };
    }

    /**
     * The function runs on hash change and sets the states appropriately.
     */
    hashChange = () => 
    {

        this.setState({
            show_user: window.location.href.includes("#user"),
            show_filter: window.location.href.includes("#filter"),
            show_location: window.location.href.includes("#location"),
            show_search: window.location.href.includes("#search")
        });
    };

    render() 
    {
        const currentLocation = this.props.location.search + this.props.location.hash; 
        const showSearchBar = !this.props.location.pathname.includes("/details") &&       //to hide search bar in details, profiles, addhospital
            !this.props.location.pathname.includes("/profile") &&
            !this.props.location.pathname.includes("/addHospital");
        console.log(this.state.user?.username);
        return (
            <Navbar collapseOnSelect expand="xl" variant="dark"
                className={"navbar  fixed-top " + (showSearchBar ? "bg-white" : "bg-grey")}
                id="navbar">

                <Container className="" >


                    <div className="searchmain d-flex flex-row align-items-center">

                        <Navbar.Toggle  aria-controls="navbarSupportedContent" className="BlueBackground p-2"
                            onClick={() => 
                            {

                                this.props.history.push(currentLocation + "#user");
                                this.setState({show_user: !this.state.show_user});
                            }}>
                            <Burger/>
                        </Navbar.Toggle>
                        <button className="srchtxt flex-grow-1" onClick={() =>
                        {
                            this.props.history.push(currentLocation + "#search");

                            this.setState({show_search: !this.state.show_search});
                        }} >
                                Search hospitals
                        </button>
                        <Avatar  className="mr-2">{this.state.user? this.state.user.username?this.state.user.username[0]:"?":"?"}</Avatar>



                    </div>


                    <CSSTransition classNames="user-screen" in={this.state.show_user} timeout={300}
                        unmountOnExit>
                    </CSSTransition>

                </Container>

                {showSearchBar &&
                    <CSSTransition classNames="location-screen" in={this.state.show_search} timeout={300}
                        unmountOnExit>
                        <FullScreenSearch close={() => 
                        {

                            const loc = getParam("loc", "Select Location");
                            const query = getParam("query", "Search Hospital");
                            this.props.history.goBack();
                            this.setState({loc: loc, query: query});
                            this.setState({show_search: false});
                        }}/>
                    </CSSTransition>
                }

            </Navbar>

        );
    }

}


export const NavBar = withRouter(NavBarLoc);
