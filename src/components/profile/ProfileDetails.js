import {AuthComponent} from "../../api/auth";
import {Container} from "react-bootstrap";
import {IoPersonCircle} from "react-icons/all";
import {withRouter} from "react-router";

export class ProfileDetailsLoc extends AuthComponent {

    render() {
        return (
            <>
                <Container className="mt-5 pt-5">
                    <div className="d-flex flex-row mb-4">
                        <IoPersonCircle className=" text-dark mr-2" size={100}/>
                        <div className="d-flex flex-fill flex-grow-1">
                            <div className="w-100 flex-fill flex-column d-flex">
                                <div className="d-flex flex-row justify-content-center mb-2">
                                    <div className="d-flex flex-column w-50 border-right-dark">
                                        <h5 className="m-0">3</h5>
                                        <small>Friends Invited</small>
                                    </div>

                                    <div className="d-flex flex-column w-50">
                                        <h5 className="m-0">500</h5>
                                        <small>Points</small>
                                    </div>
                                </div>
                                <button onClick={() =>
                                    this.props.history.push('edit')
                                }
                                        className=" input-holder py-2 btn w-100"><b>Edit Profile</b>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column text-capitalize text-left">
                            <h5><b>{this.state.user.username}</b></h5>
                            <input readOnly={true} value={this.state.user.tokens.private_token}/>
                        </div>
                    </div>

                </Container>
            </>
        )

    }

}

export const ProfileDetails = withRouter(ProfileDetailsLoc)