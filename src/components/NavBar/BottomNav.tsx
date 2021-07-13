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
        this.state = {...this.state, value: this.props.location.pathname}
    }

    hashChange = () => {
        this.setState({value: this.props.location.pathname})
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