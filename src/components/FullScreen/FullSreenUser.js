import {Container} from "react-bootstrap";
import {ReactComponent as Back} from "../../images/back.svg";

import './location.css'
import {AiOutlinePlusCircle, FaHandsHelping, IoMdHelpCircleOutline, IoPersonCircle} from "react-icons/all";
import {AuthComponent} from "../../api/auth";


export class AnonMenuBox extends AuthComponent {
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
                    <div className="d-flex flex-row align-items-center my-2">
                        <FaHandsHelping size={25}/>
                        <p className="px-3 m-0">Request Help</p>
                    </div>
                    <div className="d-flex flex-row align-items-center my-2">
                        <AiOutlinePlusCircle size={25}/>
                        <p className="px-3 m-0">Add Hospitals</p>
                    </div>
                    <div className="d-flex flex-row align-items-center my-2">
                        <IoMdHelpCircleOutline size={25}/>
                        <p className="px-3 m-0">Help</p>
                    </div>
                </div>
                <Container fluid={true} className="bg-white justify-content-between p-3">
                    <button className="btn btn-dark w-100 p-2" onClick={this.performAuth}>
                        Login
                    </button>
                </Container>
            </div>
        )
    }
}

export class UserMenuBox extends AuthComponent {
    render() {
        let {user} = this.state

        return (
            <div className="w-100">
                <div className="d-flex flex-row align-items-center border-bottom w-100 pb-3">

                    <IoPersonCircle className="text-secondary opacity50" size={100}/>
                    <div className="d-flex flex-column text-left justify-content-center line-height-small">
                        <p className="m-0">Hello,</p>
                        <strong className="m-0">{user.username}</strong>
                    </div>
                </div>
                <div className="d-flex flex-column border-bottom w-100">
                    <div className="d-flex flex-row align-items-center my-2">
                        <FaHandsHelping size={25}/>
                        <p className="px-3 m-0">Request Help</p>
                    </div>
                    <div className="d-flex flex-row align-items-center my-2">
                        <AiOutlinePlusCircle size={25}/>
                        <p className="px-3 m-0">Add Hospitals</p>
                    </div>
                    <div className="d-flex flex-row align-items-center my-2">
                        <IoMdHelpCircleOutline size={25}/>
                        <p className="px-3 m-0">Help</p>
                    </div>
                </div>
                <Container fluid={true} className="bg-white justify-content-between p-3">
                    <button className="btn btn-dark w-100 p-2" onClick={()=> {
                        this.removeAuth()
                        this.props.refresh_parent()
                    }}>
                        Logout
                    </button>
                </Container>
            </div>
        )
    }
}

export class FullScreenUser extends AuthComponent {
    constructor() {
        super();
        this.state = {
            ...this.state,
        }
    }


    render() {
        console.log(this.state)

        return (<div className="fixed-top w-100 h-100 bg-white header">

            <Container fluid={true} className="py-3 bg-grey justify-content-start">
                <div className="BlueBackground p-2" onClick={() => {
                    this.props.close()
                }}>
                    <Back/>
                </div>
                <div className="h3 m-0 mx-2">
                    Need Medi
                </div>
            </Container>
            <Container fluid={true} className="mt-2">
                {this.state.auth ?
                    <UserMenuBox refresh_parent={this.refresh}/>
                    :
                    <AnonMenuBox/>
                }
            </Container>
        </div>)
    }
}





