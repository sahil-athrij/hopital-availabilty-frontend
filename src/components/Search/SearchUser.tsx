import React from "react";
import {Container, IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";




class SearchUser extends React.Component {
    render() {
        return <div>
            <Container className="input-holder overflow-x-hidden mb-3 mx-2 my-2">
                <div className=" w-100 d-flex justify-content-between align-self-center">
                    <IconButton style={{paddingLeft: "0"}}>
                        <ArrowBackIcon />
                    </IconButton>

                    <input placeholder="Search" className="main-input w-75 mx-2 align-content-start pt-1" type="search"/>

                </div>
            </Container>
        </div>
    }
}

export default SearchUser;
