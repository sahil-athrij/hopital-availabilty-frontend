import React, { FC } from "react";
import "./card.css";
const Card: FC = ({ children }) => {
  return (
    <div className="center">
      <div className="box-card  sha">{children}</div>
    </div>
  );
};

export default Card;
