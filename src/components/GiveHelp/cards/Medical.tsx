import React from "react";
import { PatientObject } from "../../../api/model";
import Card from "./Card";
import "./med.css";

export interface Pat {
  user: PatientObject;
}

const Medical = ({ user }: Pat) => {
  console.log(user);
  return (
    <>
      <Card>
        <div className="main-line">
          <h3 className="med-h">Medical request</h3>
          <hr />
        </div>
        <h3 className="h2">{user.Name}</h3>
        <div className="infopt">
          <div className="col">
            <div className="inpt">
              <p>Blood Group:</p>
              <span className="result">A+ve</span>
            </div>
            <div className="inpt">
              <p>Covid result:</p>
              <span className="result">-ve</span>
            </div>
            <div className="inpt">
              <p>CT Score:</p>
              <span className="result">210</span>
            </div>
          </div>
        </div>
        <div className="col cen">
          <div className="inpt">
            <p>Previous Hospital:</p>
            <span className="result">Baby</span>
          </div>
          <div className="inpt">
            <p>Mobile:</p>
            <span className="result">{user.mobile_number}</span>
          </div>
          <div className="inpt">
            <p>SRF ID:</p>
            <span className="result">100</span>
          </div>
          <div className="inpt">
            <p>URM Number:</p>
            <span className="result">210</span>
          </div>
        </div>
        <div className="center">
          <div className="inpt ">
            <p>Symptoms:</p>
            <span className="result">covid</span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Medical;
