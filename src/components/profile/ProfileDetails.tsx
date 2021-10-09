import {AuthComponent, AuthPropsLoc, AuthState, reactUrl} from "../../api/auth";
import {Container} from "react-bootstrap";
import {AiOutlinePlus, HiOutlineClipboardCopy, IoPersonCircle} from "react-icons/all";
import {withRouter} from "react-router";
import React from "react";
import {CSSTransition} from "react-transition-group";
import {FullScreenShare} from "../FullScreen/FullScreenShare";
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Patient, PatientObject} from "../../api/model";
import {RequestDisplay} from "./RequestDisplay";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}


function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (

                <>{children}</>

            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface ProfileDetailsState extends AuthState {
    show_share: boolean;
    tab: number;
    requests: PatientObject[]
    friend_request: PatientObject[]
}


export class ProfileDetailsLoc extends AuthComponent<AuthPropsLoc, ProfileDetailsState> {
    constructor(props: AuthPropsLoc) {
        super(props);
        this.state = {
            ...this.state,
            show_share: false,
            requests: [],
            friend_request: [],
            tab: 0
        }
    }

    hashChange = () => {
        if (!this.props.location.hash.includes('share')) {
            this.setState({show_share: false})
        } else {
            this.setState({show_share: true})
        }
    }

    async componentDidMount() {
        super.componentDidMount();
        let data = await Patient.filter({}, true)
        let data1 = await Patient.action_general('friends/', {}, true)
        this.setState({requests: data.results, friend_request: data1.results})
    }

    render() {
        let {user} = this.state
        let currentLocation = this.props.location.search + this.props.location.hash

        return (
            <React.Fragment>
                <div className={'d-flex flex-column bg-grey min-vh-100 flex-fill'}>
                    <Container className="mt-5 pt-5 px-0 pb-0 neumorphic-input ">
                        <div className="d-flex flex-row px-3 mb-4">
                            <IoPersonCircle className=" text-dark mr-2" size={100}/>
                            <div className="d-flex flex-fill flex-grow-1">
                                <div className="w-100 flex-fill flex-column d-flex">
                                    <div className="d-flex flex-row justify-content-center mb-2">
                                        <div className="d-flex flex-column w-50 border-right-dark">
                                            <h5 className="m-0">{this.state.user ? this.state.user.tokens.invited : ''}</h5>
                                            <small>Friends Invited</small>
                                        </div>

                                        <div className="d-flex flex-column w-50">
                                            <h5 className="m-0">{this.state.user ? this.state.user.tokens.points : ''}</h5>
                                            <small>Points</small>
                                        </div>
                                    </div>
                                    <button onClick={() =>
                                        this.props.history.push('/profile/edit')
                                    }
                                            className=" input-holder py-2 btn w-100"><b>Edit Profile</b>
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="d-flex flex-row px-3">
                            <div className="d-flex flex-column text-capitalize text-left">
                                <h5><b>{this.state.user ? this.state.user.username : ''}</b></h5>
                                <button className="d-flex align-items-center"
                                        onClick={() => {
                                            this.props.history.push(currentLocation + "#share")
                                            this.setState({show_share: !this.state.show_share})
                                        }}>
                                    Invite your Friends : <div
                                    className="mr-2">{this.state.user ? this.state.user.tokens.private_token : ''}
                                </div>
                                    <HiOutlineClipboardCopy size={20}/>
                                </button>

                            </div>
                        </div>
                        <Tabs variant="fullWidth" value={this.state.tab}
                              onChange={(e, v) => this.setState({tab: v})}
                              aria-label="simple tabs example">
                            <Tab label="My Requests" {...a11yProps(0)} />
                            <Tab label="Friends" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                        </Tabs>
                    </Container>

                    <SwipeableViews
                        axis={'x'}
                        index={this.state.tab}
                        onChangeIndex={(v) => {
                            this.setState({tab: v});
                        }}
                    >
                        <TabPanel value={this.state.tab} index={0}>
                            <Container className={"py-4 mb-5 flex-fill request-holder"}
                            >

                                <button onClick={() => {
                                    this.props.history.push('//addRequest')
                                    this.props.history.push('//addRequest')
                                    this.props.history.goBack()
                                }}
                                        className={"neumorphic-input w-100 btn p-3 bg-white round-15 d-flex flex-column align-items-center justify-content-center"}>
                                    <AiOutlinePlus className="text-success" size={20}/>
                                    Add New Request
                                </button>
                                {this.state.requests.map((request) =>
                                    <RequestDisplay request={request}/>
                                )

                                }
                            </Container>
                        </TabPanel>
                        <TabPanel value={this.state.tab} index={1}>
                            <Container className={"py-4 mb-5 flex-fill request-holder"}
                            >
                                {this.state.friend_request.map((request) =>
                                    <RequestDisplay request={request}/>)
                                }
                            </Container>

                        </TabPanel>
                        <TabPanel value={this.state.tab} index={2}>
                            Item Three
                        </TabPanel>
                    </SwipeableViews>
                </div>

                <CSSTransition classNames="filter-screen" in={this.state.show_share} timeout={300}
                               unmountOnExit>
                    <FullScreenShare
                        url={`${reactUrl}/invite?invite=${user ? user.tokens.private_token : ''}`}
                        close={() => {
                            this.props.history.goBack()
                            this.setState({show_share: false})
                        }}/>
                </CSSTransition>
            </React.Fragment>
        )

    }

}

export const ProfileDetails = withRouter(ProfileDetailsLoc)