import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./topbar.css";
import Button from "@mui/material/Button";

const TopBar = () => 
{
  return (
   <div className="center">
     <div className="container">
        <button className="btn-close center">
        <CloseIcon/>
        </button>
        <h4 className="container_heading">Set Weekly Schedule</h4>
        <Button variant="contained" className="btn-sub">submit</Button>
    </div>
   </div>
  );
};

export default TopBar;
