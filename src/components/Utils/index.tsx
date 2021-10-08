import { Button } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";
import './index.css';

import star from "../../images/star.svg";
import fadestar from "../../images/fadestar.svg";
import LinearProgress from "@mui/material/LinearProgress";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import stars from "../../images/5stars.svg";
import info from "../../images/info.svg";

const BigBlueButtonStyle = {
    letterSpacing: "0.49px",
    borderRadius: "20px",
    background: "linear-gradient(180deg, #0338B9 0%, #3E64FF 100%)",
};

export const BigBlueButton = ({ text, ...props }: { text: string }) => (
    <Button
        {...props}
        className="nunito-bold-white-16px p-3 my-3 "
        fullWidth
        variant="contained"
        sx={{ ...BigBlueButtonStyle, textTransform: "none", fontWeight: "700px" }}
    >
        {text}
    </Button>
);

export const StarRating = ({ rating }: { rating: number }) => (
    <Container>
        {[...Array(Math.round(5 - rating))].map((e, i) => (
            <img
                key={i}
                className="rtg align-self-start mt-4 ml-1"
                src={fadestar}
                alt="rating"
            />
        ))}

        {[...Array(Math.round(rating))].map((e, i) => (
            <img
                key={i}
                className="rtg align-self-start mt-4 ml-1"
                src={star}
                alt="rating"
            />
        ))}
    </Container>
);

export const RatingBar = () => (
    <>
        <div className="d-flex justify-content-between align-items-center px-4">
            <div className="d-flex flex-column m-0 p-0">
                <h4 className="m-0 p-0">
                    <b>21</b>
                </h4>
                <Rating className="w-25" name="disabled" value={3.6} disabled precision={0.1} />

                <p className="m-0 p-0">
                    <small>(21)</small>
                </p>
            </div>

            <div className="w-100 mx-4">
                <LinearProgress sx={{ width: '100%', color: 'grey.500' }} className="rt-bar mb-1" variant="determinate" value={50} />
                <LinearProgress sx={{ width: '100%', color: 'grey.500' }} className="rt-bar mb-1" variant="determinate" value={50} />
                <LinearProgress sx={{ width: '100%', color: 'grey.500' }} className="rt-bar mb-1" variant="determinate" value={50} />
                <LinearProgress sx={{ width: '100%', color: 'grey.500' }} className="rt-bar mb-1" variant="determinate" value={50} />
                <LinearProgress sx={{ width: '100%', color: 'grey.500' }} className="rt-bar mb-1" variant="determinate" value={50} />
            </div>
            <Tooltip title="need to be updated" arrow>
            sdsd
               <InfoOutlinedIcon sx={{color:"#6B779A"}}/>
            </Tooltip>
        </div>
    </>
);