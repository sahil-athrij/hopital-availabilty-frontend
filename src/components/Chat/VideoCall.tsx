import React, {Component} from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import KeyboardArrowUpIcon from "../../images/KeyboardArrowUpIcon.svg";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import IconButton from "@mui/material/IconButton";
import CallEndIcon from "@mui/icons-material/CallEnd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HttpsIcon from "@mui/icons-material/Https";
import image from "../../images/doctorhead.jpg";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#083CBE" : grey[800],
}));

class VideoCall extends Component
{

    constructor(props: boolean)
    {
        super(props);
        this.state = {openStatus: false};
    }

    toggleDrawer = (open: boolean) => () =>
    {
        this.setState({openStatus: open});
        console.log("clicked");
    };

    render()
    {
        return (
            <>
                <div style={{background: "#3E64FF", zIndex: 50, height: "100vh", color: "#8DB5B4"}}>
                    <div style={{padding: "1rem"}} className="d-flex justify-content-center align-items-center">
                        <KeyboardArrowDownIcon />
                        <HttpsIcon style={{height: "1rem"}}/>
                        <p className="m-0" >End-to-end encrypted</p>
                    </div>
                    <div style={{color: "#F0F0F0"}}>
                        <img style={{borderRadius: "50%"}} src={image} alt={"profile"}/>
                        <h3 className="mt-3">Dr Robert Langdon</h3>
                        <p>Calling</p>
                    </div>
                </div>
                <Global
                    styles={{
                        ".MuiDrawer-root > .MuiPaper-root": {
                            height: "10%",
                            overflow: "visible",
                        },
                    }}
                />
                <SwipeableDrawer
                    // container={container}
                    style={{zIndex: 100}}
                    anchor="bottom"
                    open={this.state.openStatus}
                    onClose={this.toggleDrawer(false)}
                    onOpen={this.toggleDrawer(true)}
                    // swipeAreaWidth={drawerBleeding}
                    disableSwipeToOpen={false}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <StyledBox
                        sx={{
                            position: "absolute",
                            top: "-5rem",
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            visibility: "visible",
                            right: 0,
                            left: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <IconButton onClick={()=>
                        {
                            this.setState({openStatus: open});
                        }}>
                            <img style={{width: "1.8rem"}} src={KeyboardArrowUpIcon} alt={"arrow up"}/>
                        </IconButton>
                        <div style={{paddingBottom: "2rem"}} className="d-flex justify-content-around w-100">
                            <IconButton>
                                <FlipCameraIosIcon style={{color: "#fff"}}/>
                            </IconButton>

                            <IconButton style={{color: "#fff"}}>
                                <VolumeUpIcon/>
                            </IconButton>

                            <IconButton style={{color: "#fff"}}>
                                <VideocamOffIcon/>
                            </IconButton>

                            <IconButton style={{color: "#fff"}}>
                                <MicOffIcon/>
                            </IconButton>

                            <IconButton style={{color: "#fff", background: "#E91C43"}}>
                                <CallEndIcon/>
                            </IconButton>

                        </div>
                    </StyledBox>
                    <StyledBox
                        sx={{
                            px: 2,
                            pb: 2,
                            height: "100%",
                            overflow: "auto",
                        }}
                    >
                    </StyledBox>
                </SwipeableDrawer>
            </>
        );
    }
}

export default VideoCall;
