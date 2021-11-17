import {Button} from "@mui/material";
import React from "react";
import {Container} from "react-bootstrap";
import "./index.css";

import star from "../../images/star.svg";
import fadestar from "../../images/fadestar.svg";
import CloseIcon from "@mui/icons-material/Close";


const BigBlueButtonStyle = {
    letterSpacing: "0.49px",
    borderRadius: "20px",
    background: "linear-gradient(180deg, #0338B9 0%, #3E64FF 100%)",
};

interface StickyHeadProps
{
    title: string,
    onClick: () => undefined | Promise<void>,
    goBack: () => void,
    action?: string,
}

export const BigBlueButton = ({...props}) =>
{
    const {text} = props;
    return (<Button
        {...props}
        className="nunito-bold-white-16px p-3 my-3 "
        fullWidth
        variant="contained"
        sx={{...BigBlueButtonStyle, textTransform: "none", fontWeight: "700px"}}
    >
        {text as string}
    </Button>
    );
};

export const StarRating = ({rating}: { rating: number }) => (
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

export const StickyHead = ({title, action, onClick, goBack}: StickyHeadProps) => (
    <>
        <Container className=" tophead fixed-top d-flex justify-content-between p-3 ">
            <CloseIcon className="d-flex align-self-center" onClick={() => goBack()}/>
            <p className="align-self-center m-0 p-0 text-left flex-grow-1 pl-4"><b>{title}</b>
            </p>
            <Button className="sub" onClick={onClick}
                variant="contained">{action || "Submit"}</Button>

        </Container>
        <div className=" mb-4 mt-4 pt-4 pb-2">

        </div>
    </>
);
