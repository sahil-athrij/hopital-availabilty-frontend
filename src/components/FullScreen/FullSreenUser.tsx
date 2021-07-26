import {Container} from "react-bootstrap";
import {ReactComponent as Back} from "../../images/back.svg";
import {AiFillHome, AiOutlinePlusCircle, FaHandsHelping, IoMdHelpCircleOutline, IoPersonCircle} from "react-icons/all";
import {AuthComponent, AuthPropsLoc, AuthState, reactUrl} from "../../api/auth";
import {withRouter} from "react-router";
import {Link} from "@material-ui/core";
import {CSSTransition} from "react-transition-group";
import {FullScreenShare} from "./FullScreenShare";
import React from "react";
import {FullScreenLocationProps} from "./FullScreenLocation";

import './location.css'


interface MenuBoxProps extends AuthPropsLoc {
    close: () => void
    refresh_parent?: () => void
}


export class AnonMenuBoxLoc extends AuthComponent<MenuBoxProps, AuthState> {
    render() {

        return (
            <div className="w-100">
                <div className="d-flex flex-row align-items-center border-bottom w-100 pb-3">

                    <IoPersonCircle className="text-secondary opacity50" size={100}/>
                    <div className="d-flex flex-column text-left justify-content-center line-height-small">
                        <p className="m-0">Hello,</p>
                        <strong className="m-0">Login to Your Account</strong>
                    </div>
                </div>
                <div className="d-flex flex-column border-bottom w-100">
                    <Link className="d-flex flex-row align-items-center text-dark my-2"
                          onClick={() => {
                              // two push required to counteract goBack
                              this.props.history.replace('/')
                              this.props.history.push('/')
                              this.props.close()
                          }}>
                        <AiFillHome size={25}/>
                        <p className="px-3 m-0">Home</p>
                    </Link>
                    <Link className="d-flex flex-row align-items-center text-dark my-2"
                          onClick={() => {
                              // two push required to counteract goBack
                              this.props.history.replace('/addHospital')
                              this.props.history.push('/addHospital')
                              this.props.close()
                          }}
                    >
                        <AiOutlinePlusCircle size={25}/>
                        <p className="px-3 m-0">Add Hospitals</p>
                    </Link>
                    <Link className="d-flex flex-row align-items-center text-dark my-2">
                        <IoMdHelpCircleOutline size={25}/>
                        <p className="px-3 m-0">Help</p>
                    </Link>
                </div>
                <Container fluid={true} className="bg-white justify-content-between p-3">
                    <button className="btn btn-dark rounder w-100 p-2" onClick={this.performAuth}>
                        Login
                    </button>
                </Container>
            </div>
        )
    }
}

interface UserMenuBoxState extends AuthState {
    show_share: boolean
}

class UserMenuBoxLoc extends AuthComponent<MenuBoxProps, UserMenuBoxState> {
    constructor(props: MenuBoxProps) {
        super(props);
        this.state = {
            ...this.state,
            show_share: false
        }
    }

    hashChange = () => {
        if (!this.props.location.hash.includes('share')) {
            this.setState({show_share: false})
        } else {
            this.setState({show_share: true})
        }
    }

    render() {
        let {user} = this.state
        let currentLocation = this.props.location.search + this.props.location.hash


        return (
            <div className="w-100">
                <div className="d-flex flex-row align-items-center border-bottom w-100 pb-3">

                    <IoPersonCircle className=" text-dark mr-2" size={100}/>
                    <button className="d-flex flex-column text-left justify-content-center line-height-small"
                            onClick={() => {
                                // two push required to counteract goBack
                                this.props.history.replace('/profile')
                                this.props.history.push('/profile')
                                this.props.close()
                            }}
                    >
                        <p className="m-0">Hello,</p>
                        <strong className="m-0 h3 py-1"><b>{user ? user.username : ''}</b></strong>
                        <p className="m-0 underline">View profile</p>
                    </button>
                </div>
                <div className="d-flex flex-column border-bottom w-100  font-weight-bold">
                    <Link className="d-flex flex-row align-items-center text-dark my-2"
                          onClick={() => {
                              // two push required to counteract goBack
                              this.props.history.replace('/')
                              this.props.history.push('/')
                              this.props.close()
                          }}>
                        <AiFillHome size={25}/>
                        <p className="px-3 m-0">Home</p>
                    </Link>
                    <Link className="d-flex flex-row align-items-center text-dark my-2"
                          onClick={() => {
                              // two push required to counteract goBack
                              this.props.history.replace('/profile/addRequest')
                              this.props.history.push('/profile/addRequest')
                              this.props.close()
                          }}>
                        <FaHandsHelping size={25}/>
                        <p className="px-3 m-0">Request Help</p>
                    </Link>
                    <Link className="d-flex flex-row align-items-center text-dark my-2"

                          onClick={() => {
                              // two push required to counteract goBack
                              this.props.history.replace('/addHospital')
                              this.props.history.push('/addHospital')
                              this.props.close()
                          }}
                    >
                        <AiOutlinePlusCircle size={25}/>
                        <p className="px-3 m-0">Add Hospitals</p>
                    </Link>
                    <Link className="d-flex flex-row align-items-center text-dark my-2">
                        <IoMdHelpCircleOutline size={25}/>
                        <p className="px-3 m-0">Help</p>
                    </Link>
                </div>


                <Container fluid={true} className="bg-white justify-content-between p-3">
                    <button className="btn btn-primary blue-gradient  rounder  w-100 p-2" onClick={() => {
                        this.props.history.push(currentLocation + "#share")
                        this.setState({show_share: !this.state.show_share})
                    }}>
                        Invite Friends
                    </button>
                </Container>
                <Container fluid={true} className="bg-white justify-content-between p-3">
                    <button className="btn btn-dark rounder w-100 p-2" onClick={() => {
                        this.removeAuth()
                        window.location.href = '/'

                    }}>
                        Logout
                    </button>
                </Container>
                <CSSTransition classNames="filter-screen" in={this.state.show_share} timeout={300}
                               unmountOnExit>
                    <FullScreenShare
                        url={`${reactUrl}/invite?invite=${user ? user.tokens.private_token : ''}`}
                        close={() => {
                            this.props.history.goBack()
                            this.setState({show_share: false})
                        }}/>
                </CSSTransition>
            </div>
        )
    }
}

export const UserMenuBox = withRouter(UserMenuBoxLoc)
export const AnonMenuBox = withRouter(AnonMenuBoxLoc)


export class FullScreenUser extends AuthComponent<FullScreenLocationProps, AuthState> {

    render() {

        return (<div className="fixed-top w-100 z-index-1031 h-100 bg-white header">

            <Container fluid={true} className="py-3 bg-grey justify-content-start">
                <button className="BlueBackground p-2" onClick={() => {
                    this.props.close()
                }}>
                    <Back/>
                </button>
                <div className="h3 m-0 mx-2">
                    Need Medi
                </div>
            </Container>
            <Container fluid={true} className="mt-2">
                {this.state.auth ?
                    <UserMenuBox close={this.props.close} refresh_parent={this.refresh}/>
                    :
                    <AnonMenuBox close={this.props.close}/>
                }
            </Container>
        </div>)
    }
}





