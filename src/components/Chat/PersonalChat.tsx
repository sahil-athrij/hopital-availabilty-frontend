import React, {Component} from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Account from "../../images/ventilator.svg";
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';


class PersonalChat extends Component
{
    render()
    {
        return (
            <div>
                <div style={{boxShadow: "0px 10px 60px rgba(0, 0, 0, 0.0625)"}} className="d-flex px-3 align-items-center">
                    {/*onClick={() => this.props.history.goBack()}*/}
                   <ArrowBackIcon/>
                    <img style={{borderRadius: "50%", marginLeft: "1rem"}} src={Account}/>
                    <div style={{marginLeft: "1rem", paddingTop: "1rem"}} className="d-flex flex-column text-start">
                        <h5>Doctor harruy</h5>
                        <p>online</p>
                    </div>
                    <VideocamIcon sx={{marginLeft: "auto", marginRight: "1rem"}} color="action"/>
                    <MoreVertIcon/>
                </div>
                <p style={{margin: ".5rem", fontSize: "10px", color: "#A1A1BC"}}>Message Now</p>
                <div className="d-flex justify-content-center align-items-center">

                    <div style={{background: "#F7F7F7", width: "70%", borderRadius: "8px", color: "#1B1A57"}} className="text-start p-2">
                        incoming message
                    </div>
                </div>
            </div>
        );
    }
}

export default PersonalChat;
