import React from "react";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

class Notification extends React.Component
{
    render()
    {
        return <div style={{height: "100vh"}} className="d-flex align-items-center justify-content-center flex-column align-self-center">

            <Link to={"/"}>
                <IconButton style={{position: "fixed", top: "15px", left: "15px", color: "black"}} >
                    <ArrowBackIcon/>
                </IconButton>
            </Link>
            <SentimentDissatisfiedIcon fontSize="large"/>
            <h6 className="mt-3">Currently you don&apos;t have any notification</h6>
        </div>;
    }
}

export default Notification;
