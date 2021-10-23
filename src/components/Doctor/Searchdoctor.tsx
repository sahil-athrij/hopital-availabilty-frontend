import React, { Component } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import filter from "../../images/filter.svg";
import { styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";


const Search = styled("div")(({ theme }) => ({
    position: "relative",
    backgroundColor: "rgba(107, 119, 154, 0.05);",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    borderRadius: "10px",
}));
  
const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));


export default class Searchdoctor extends Component 
{
    render() 
    {
        return (
            <div className="mx-4 pt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <ArrowBackIcon/>
                    <p className="m-0">Doctors</p>
                    <img src={filter} alt="filter"/>
                </div>
                <div className="mt-2">
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search for doctors"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </div>
            </div>
        );
    }
}
