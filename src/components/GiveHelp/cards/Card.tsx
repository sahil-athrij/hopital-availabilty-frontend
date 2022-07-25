import { Button } from "@mui/material";
import React, { FC } from "react";
import "./card.css";

interface Help {
  help?: () => void;
}

const Card: FC<Help> = ({ children, help }) => {
  return (
    <div className="center mt-5 coldir">
      <div className="box-card  sha">
        {children}
        <div className="btns">
          <Button className="sub subbt" variant="contained">
            Decline
          </Button>
          <Button className="sub subbt" onClick={help} variant="contained">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
