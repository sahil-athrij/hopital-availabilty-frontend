import React from "react";
import { PatientObject } from "../../../api/model";
import Card from "./Card";
import "./med.css";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
export interface Pat {
  user: PatientObject;
}

const Medical = ({ user }: Pat) => {
  console.log(user);
  const image =
    "https://s3-alpha-sig.figma.com/img/b239/cd59/a18c70b877211a4e109c17fa9dc080b9?Expires=1659916800&Signature=cRUWUOQzQyqWKnReFYoDwTqZh6elr-nNWsU0jlDBGXv2g81xLcKv6NSVq~1DEPD7pngn58rW3etQR3iGs92z~lQMGKpHg5Abc6BpsdwwvdFoMHDyT-9OLNkSTKGNm0rB5yMmhAriDCzxW0HTGoZUbLpR7uLgbb1L61iqiYV-jtqgJ9ofwTWUNR7LjiHykgwwZxKGPfUNXUzIzrvY0WJOyqULajZwkdnQsoAwtp56NXKWwGeRNINlVzd-P~RwFxCI-xZd6mijx8NKcG0x7OrCMU~oWMY0sTlPZf~uKcilrXT32NsjT-CNaUdwE22hPcoL-psx9jZM8JLn2mv9VR0opQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";
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
          <a href={user.attachment} target="_blank" rel="noreferrer">
            <div className="bill">
              <img src={image} alt="bill pic" className="imgbill" />
              <div className="stack-bill">
                <span className="textbill pdf">
                  <PictureAsPdfIcon />
                </span>
                <span className="textbill">medical_bill.pdf</span>
              </div>
            </div>
          </a>
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
