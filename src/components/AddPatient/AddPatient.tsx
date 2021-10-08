import {Marker, PatientObject} from "../../api/model";
import {AuthComponent, AuthState} from "../../api/auth";
import {RouteComponentProps, withRouter} from "react-router";
import {ResponsiveProps} from "../ResponsiveComponent";
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Chip, Container, ListItem, Tabs} from "@mui/material";
import {Tab} from "@material-ui/core";
import './AddPatient.css'


interface AddPatientState extends AuthState {
    model: PatientObject;
    activeStep: number;
    skipped: number;


}

export interface AuthPropsLoc extends RouteComponentProps<ResponsiveProps> {

}

export class AddPatient extends AuthComponent<AuthPropsLoc, AddPatientState> {

    constructor(props: AuthPropsLoc) {
        super(props);
        this.state = {
            ...this.state,
            activeStep: 0,


        }

    }

    styles = [{
        background: "linear-gradient(180deg, #0338B9 0%, #3E64FF 100%)",
        color: "white",
        margin: 0,
        fontSize: '12px',
        borderRadius: '10px'
    }, {background: "#F0F0F0", margin: 0, fontSize: '12px', borderRadius: '10px'}]
    tabs = ['Patient Info', 'Symptoms', 'Test Info', 'Attender', 'Hospital']
    steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        })

    }

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    };


    render() {
        if (!this.state.auth) {
            this.performAuth()
            return (<></>)
        } else {
            console.log(this.state)
            return (
                <Box className='px-2' sx={{width: '100%'}}>

                    <ListItem className='wholetab '
                              value={this.state.activeStep}
                    >

                        {
                            this.tabs.map((label, index) => (
                                <Chip size='small' className='' label={label}
                                      sx={this.styles[this.state.activeStep === index ? 0 : 1]}/>
                            ))
                        }

                    </ListItem>

                    {this.state.activeStep === this.tabs.length ? (
                        <React.Fragment>
                            <Typography sx={{mt: 2, mb: 1}}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Box sx={{flex: '1 1 auto'}}/>
                                {/*<Button onClick={this.handleReset}>Reset</Button>*/}
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Typography sx={{mt: 2, mb: 1}}>Step {this.state.activeStep + 1}</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Button
                                    color="inherit"
                                    disabled={this.state.activeStep === 0}
                                    onClick={this.handleBack}
                                    sx={{marginLeft: '1.25rem', background: '#E5E5E5', textTransform: 'none', mr: 1}}
                                >
                                    Prev
                                </Button>
                                <Box sx={{flex: '1 1 auto'}}/>

                                <Button className="nxtbutton"
                                        sx={{color: "white", marginRight: "1.25rem", textTransform: 'none'}}
                                        onClick={this.handleNext}>
                                    {this.state.activeStep === this.tabs.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>

            )
        }
    }
}

export const Addpatient = withRouter(AddPatient)