import {Button} from "@mui/material";
import React from "react";
import {Container} from "react-bootstrap";

import star from "../../images/star.svg";
import fadestar from "../../images/fadestar.svg"


const BigBlueButtonStyle = {
    letterSpacing: "0.49px",
    borderRadius: "20px",
    background: "linear-gradient(180deg, #0338B9 0%, #3E64FF 100%)",
}

export const BigBlueButton = ({text}: { text: string }) => (
    <Button
        className="nunito-bold-white-16px p-3 my-3 "
        fullWidth variant="contained" sx={{...BigBlueButtonStyle, textTransform: "none"}}>{text}</Button>)

export const StarRating = ({rating}: { rating: number }) => (
    <Container>
        {[...Array(Math.round(5-rating))].map((e, i) => <img key={i} className="rtg align-self-start mt-4 ml-1" src={fadestar}
                                                   alt="rating"/>)}


        {[...Array(Math.round(rating))].map((e, i) => <img key={i} className="rtg align-self-start mt-4 ml-1" src={star}
                                               alt="rating"/>)}
    </Container>)

export const Star = () => (
  <img src="../../images/addHospital.jpg"/>

)
