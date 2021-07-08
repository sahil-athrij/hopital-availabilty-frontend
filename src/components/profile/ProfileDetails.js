import {AuthComponent} from "../../api/auth";
import {Container} from "react-bootstrap";
import {AiOutlinePlus, HiOutlineClipboardCopy, IoPersonCircle} from "react-icons/all";
import {withRouter} from "react-router";
import {toast} from "react-toastify";

export class ProfileDetailsLoc extends AuthComponent {

    render() {
        return (
            <>
                <div className={'d-flex flex-column bg-grey min-vh-100 flex-fill'}>
                    <Container className="mt-5 pt-5 neumorphic-input pb-2">
                        <div className="d-flex flex-row mb-4">
                            <IoPersonCircle className=" text-dark mr-2" size={100}/>
                            <div className="d-flex flex-fill flex-grow-1">
                                <div className="w-100 flex-fill flex-column d-flex">
                                    <div className="d-flex flex-row justify-content-center mb-2">
                                        <div className="d-flex flex-column w-50 border-right-dark">
                                            <h5 className="m-0">{this.state.user.tokens.invited}</h5>
                                            <small>Friends Invited</small>
                                        </div>

                                        <div className="d-flex flex-column w-50">
                                            <h5 className="m-0">{this.state.user.tokens.points}</h5>
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
                        <div className="d-flex flex-row ">
                            <div className="d-flex flex-column text-capitalize text-left">
                                <h5><b>{this.state.user.username}</b></h5>
                                <button className="d-flex align-items-center"
                                        onClick={() => {
                                            navigator.clipboard.writeText(this.state.user.tokens.private_token).then(() => {
                                                toast.dark('Copied ', {
                                                    position: "bottom-center",
                                                });
                                            })
                                        }}>
                                    Invite your Friends : <div className="mr-2">{this.state.user.tokens.private_token}
                                </div>
                                    <HiOutlineClipboardCopy size={20}/>
                                </button>
                            </div>
                        </div>
                    </Container>
                    <Container className={"pt-4  flex-fill"}>
                        <button onClick={() => {
                            this.props.history.push('/profile/addRequest')
                        }}
                                className={"neumorphic-input w-100 btn p-3 bg-white round-15 d-flex flex-column align-items-center justify-content-center"}>
                            <AiOutlinePlus className="text-success" size={20}/>
                            Add New Request
                        </button>
                    </Container>
                </div>

            </>
        )

    }

}

export const ProfileDetails = withRouter(ProfileDetailsLoc)