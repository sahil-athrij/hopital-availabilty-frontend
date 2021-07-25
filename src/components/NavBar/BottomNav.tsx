import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import React from "react";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";
import {AiFillHome, BsPersonFill, FaHandsHelping, FaHospitalAlt} from "react-icons/all";


interface BottomNavState extends AuthState {
    value: string
}

class BottomNavLoc extends AuthComponent<AuthPropsLoc, BottomNavState> {
    constructor(props: AuthPropsLoc) {
        super(props);
        let value = this.getActive()
        this.state = {...this.state, value}
    }

    getActive() {
        return this.props.location.pathname.includes('/profile/addRequest') ? '/profile/addRequest' :
            this.props.location.pathname.includes('/addHospital') ? '/addHospital' :
                this.props.location.pathname.includes('/profile') ? '/profile/' : '/'
    }

    hashChange = () => {
        console.log(this.getActive())
        this.setState({value: this.getActive()})
    }
    handleChange = (event: React.ChangeEvent<{}>, value: string) => {
        this.setState({value})
        this.props.history.push(value)
    }

    render(): JSX.Element {
        return <React.Fragment>
            <BottomNavigation value={this.state.value} className='bottomnavbar fixed-bottom'
                              onChange={this.handleChange}>
                <BottomNavigationAction label="Home" value="/" icon={<AiFillHome size={30}/>}/>
                <BottomNavigationAction label="Request" value="/profile/addRequest"
                                        icon={<FaHandsHelping size={30}/>}/>
                <BottomNavigationAction label="Add" value="/addHospital" icon={<FaHospitalAlt size={30}/>}/>
                <BottomNavigationAction label="Profile" value="/profile/" icon={<BsPersonFill size={30}/>}/>
            </BottomNavigation>
        </React.Fragment>

    }
}

export const BottomNav = withRouter(BottomNavLoc)