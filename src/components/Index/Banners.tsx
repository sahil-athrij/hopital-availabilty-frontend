import React from 'react';
import {makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import Hospital from '../../images/hospital.jpg';
import Help from '../../images/help.jpg';
import AddHospital from '../../images/addHospital.jpg';
import GiveHelp from '../../images/giveHelp.jpg';
import {useHistory, useLocation, withRouter} from "react-router";
import {withStyles} from "@material-ui/core";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {createStyles, WithStyles} from "@material-ui/styles";


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const SliderSteps = [
    {
        label: 'Search Hospitals',
        description: 'Search for nearby top hospitals',
        imgPath: Hospital,
        url: '#search'
    },
    {
        label: 'Request Help',
        imgPath: Help,
        description: 'Request Volunteers and friends for Medical Help',
        url: '/profile/addRequest'
    },
    {
        label: 'Add Hospital',
        imgPath: AddHospital,
        description: 'Add Hospital info so others can find help',
        url: '/addHospital'

    },
    {
        label: 'Give Help',
        imgPath: GiveHelp,
        description: 'See Friends medical request and Help them if you can',
        url: '/profile/'
    },

];

const styles = (theme: Theme) => createStyles({
    root: {
        background: "transparent"
    },

    holder: {
        background: "#0091ea",
        // boxShadow: "1.33056px 1.33056px 3.99167px rgba(0, 0, 0, 0.1)",
        borderRadius: "30px",
        overflow: 'hidden'
    },
    shadow: {
        position: "absolute",
        height: "8px",
        zIndex: -1,
        background: "#0091ea",
        filter: "blur(12px)",
        borderRadius: "16px",
        bottom: "25px",
        width: '92%',
    },

    top: {
        // background: "#F1F4FB",
        height: "75px",
        flexGrow: 1,
        maxWidth: "60%"

    },
    img: {
        display: 'block',
        width: "145px",
        height: "150px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "0px 30px 30px 0px"
    },
})

interface SwipeableTextMobileState extends AuthState {
    activeStep: number
}

interface SwipeableTextMobileProps extends AuthPropsLoc, WithStyles<typeof styles> {
}


class SwipeableTextMobileStepperLoc extends AuthComponent<SwipeableTextMobileProps, SwipeableTextMobileState> {
    constructor(props: SwipeableTextMobileProps) {
        super(props);
        this.state = {...this.state, activeStep: 0}

    }

    setActiveStep = (value: number) => {
        this.setState({activeStep: value})
    }
    handleNext = () => {
        this.setActiveStep(this.state.activeStep + 1);
    };
    handleBack = () => {
        this.setActiveStep(this.state.activeStep - 1);
    };

    maxSteps = SliderSteps.length;

    handleStepChange = (step: number) => {
        this.setActiveStep(step);
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <AutoPlaySwipeableViews
                    axis={'x'}
                    index={this.state.activeStep}
                    onChangeIndex={this.handleStepChange}
                    enableMouseEvents
                >
                    {SliderSteps.map((step, index) => (
                        <div className="p-2 pb-4 d-flex align-items-center flex-column" key={step.label}>
                            {Math.abs(this.state.activeStep - index) <= 2 ? (
                                <>
                                    <div
                                        className={`${classes.holder} w-100 text-white neumorphic-input h-100 d-flex align-items-begin justify-content-end`}>
                                        <div className={`${classes.top} pt-3`}>
                                            <div><h4><b>{step.label}</b></h4></div>
                                            <div><b>{step.description}</b></div>
                                            <button className="py-0 mt-2 btn btn-light"
                                                    onClick={() => {
                                                        this.props.history.push(step.url)
                                                        this.props.history.push(step.url)
                                                        this.props.history.goBack()
                                                    }}
                                            ><b>&gt;{step.label}</b></button>
                                        </div>

                                        <div className={classes.img}
                                             style={{backgroundImage: `url(${step.imgPath})`}}/>
                                    </div>
                                    <div className={classes.shadow}/>
                                </>
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    variant="dots"
                    steps={this.maxSteps}
                    position="static"
                    activeStep={this.state.activeStep}
                    className={classes.root}
                    nextButton={
                        <Button size="small" onClick={this.handleNext}
                                disabled={this.state.activeStep === this.maxSteps - 1}>
                            Next
                            {<KeyboardArrowRight/>}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
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