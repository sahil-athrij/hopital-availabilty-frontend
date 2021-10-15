import React from "react";
import MobileStepper from "@mui/material/MobileStepper";

import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import {autoPlay, virtualize} from "react-swipeable-views-utils";
import Hospital from "../../images/hospital.jpg";
import Help from "../../images/help.jpg";
import AddHospital from "../../images/addHospital.jpg";
import GiveHelp from "../../images/giveHelp.jpg";
import {withRouter} from "react-router";
import {createStyles, withStyles, WithStyles} from "@mui/styles";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const VirtualizeSwipeableViews = virtualize(AutoPlaySwipeableViews);
/**
  * Describes about the details of Carosals
  * Array containing feautures of needmedi
  */
const SliderSteps = [
    {
        label: "Search Hospitals",
        description: "Search for nearby top hospitals",
        imgPath: Hospital,
        url: "#search"
    },
    {
        label: "Request Help",
        imgPath: Help,
        description: "Request Volunteers and friends for Medical Help",
        url: "/addRequest"
    },
    {
        label: "Add Hospital",
        imgPath: AddHospital,
        description: "Add Hospital info so others can find help",
        url: "/addHospital"

    },
    {
        label: "Give Help",
        imgPath: GiveHelp,
        description: "See Friends medical request and Help them if you can",
        url: "/profile/"
    },

];
/**
 * Styling of Swipable-Sliders
 */
const styles = () => createStyles({
    root: {
        background: "transparent"
    },

    holder: {
        background: "#0091ea",
        // boxShadow: "1.33056px 1.33056px 3.99167px rgba(0, 0, 0, 0.1)",
        borderRadius: "30px",
        overflow: "hidden"
    },
    shadow: {
        position: "absolute",
        height: "8px",
        zIndex: -1,
        background: "#0091ea",
        filter: "blur(12px)",
        borderRadius: "16px",
        bottom: "25px",
        width: "92%",
    },

    top: {
        // background: "#F1F4FB",
        height: "75px",
        flexGrow: 1,
        maxWidth: "60%"

    },
    img: {
        display: "block",
        width: "145px",
        height: "150px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "0px 30px 30px 0px"
    },
});

interface SwipeableTextMobileState extends AuthState {
    activeStep: number
}

interface SwipeableTextMobileProps extends AuthPropsLoc, WithStyles<typeof styles> {
}
/**
 * Describes the type of argument of carousel()
 */

interface CarouselParams {
    key: number;
    index: number;
}
/**
 * Displays the components of slidersteps in a swipable format
 */

class SwipeableTextMobileStepperLoc extends AuthComponent<SwipeableTextMobileProps, SwipeableTextMobileState> 
{
    constructor(props: SwipeableTextMobileProps) 
    {
        super(props);
        this.state = {...this.state, activeStep: 0};

    }
    /**
     * function to change the Carousel
     * @param value: number
     */

    setActiveStep = (value: number) => 
    {
        this.setState({activeStep: value});
    };
    /**
     * Handles the next button related with the carousel
     */

    handleNext = () => 
    {
        this.setActiveStep(this.state.activeStep + 1);
    };
    /**
     * Handles the back button related with the carousel
     */

    handleBack = () => 
    {
        this.setActiveStep(this.state.activeStep - 1);
    };

    maxSteps = SliderSteps.length;
    /**
     * Returns the same number if it is less than the maximum limit of array
     * Return the first number if the number exceeds the maximum limit
     * @returns number 
     */
    calcIndex = () => 
    {
        return Math.abs(this.state.activeStep - this.maxSteps * Math.floor(this.state.activeStep / this.maxSteps));
    };
    /**
     * Functions to set a new state 
     * @param step number 
     */

    handleStepChange = (step: number) => 
    {
        this.setActiveStep(step);
    };
    /**
     * Returns the individual carousels 
     * @returns { JSX.Element } Banners Component
     */
    Carousel = ({key, index}: CarouselParams) => 
    {
        const {classes} = this.props;
        const dataIndex = this.calcIndex();
        const step = SliderSteps[dataIndex];
        return <div className="p-2 pb-4 d-flex align-items-center flex-column" key={key}>
          
            {/* Only renders two cards before and after from the current card */}

            {Math.abs(this.state.activeStep - index) <= 2 ? (
                <>
                    <div
                        className={`${classes.holder} w-100 text-white neumorphic-input h-100 d-flex align-items-begin justify-content-end`}>
                        <div className={`${classes.top} pt-3`}>
                            <div><h4><b>{step.label}</b></h4></div>
                            <div><b>{step.description}</b></div>
                            <button className="py-0 mt-2 btn btn-light"
                                onClick={() => 
                                {
                                    this.props.history.push(step.url);
                                    this.props.history.push(step.url);
                                    this.props.history.goBack();
                                }}
                            ><b>&gt;{step.label}</b></button>
                        </div>

                        <div className={classes.img}
                            style={{backgroundImage: `url(${step.imgPath})`}}/>
                    </div>
                    <div className={classes.shadow}/>
                </>
            ) : null}
        </div>;

    };
    /**
     * Renders the swipable carousels
     * @returns { JSX.Element } Banners Component
     */

    render() 
    {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <VirtualizeSwipeableViews
                    // axis={'x'}
                    index={this.state.activeStep}
                    onChangeIndex={this.handleStepChange}
                    slideRenderer={this.Carousel}
                    enableMouseEvents/>
    
                {/**
     * Describes the bottom layer of banner
     */}

                <MobileStepper
                    variant="dots"
                    steps={this.maxSteps}
                    position="static"
                    activeStep={this.calcIndex()}
                    className={classes.root}
                    nextButton={
                        <Button size="small" onClick={this.handleNext}>
                            Next
                            {<KeyboardArrowRight/>}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack}>
                            {<KeyboardArrowLeft/>}
                            Back
                        </Button>
                    }
                />
            </div>
        );
    }
}

const SwipeableTextMobileStepper = withStyles(styles, {withTheme: true})(withRouter(SwipeableTextMobileStepperLoc));
export default SwipeableTextMobileStepper;
