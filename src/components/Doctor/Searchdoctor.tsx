import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import filter from "../../images/filter.svg";
import { styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { AuthComponent, AuthPropsLoc, AuthState } from "../../api/auth";
import { withRouter } from "react-router";


const Search = styled("div")(({ theme }) => ({
    position: "relative",
    backgroundColor: "rgba(107, 119, 154, 0.05);",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    borderRadius: "10px",
}));
  
const SearchIconWrapper = styled("div")(({ theme }) => ({
    margin: "0",
    padding: theme.spacing(0, 0, 0, 2),
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
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "100%",
        },
    },
}));

interface SearchDoctorState extends AuthState {
    addDoctor: boolean  //Useless use later if needed
}

class SearchdoctorLoc extends AuthComponent <AuthPropsLoc, SearchDoctorState> 
{
    constructor(props: AuthPropsLoc) 
    {
        super(props);
        this.state = {
            ...this.state,
            addDoctor: false,            
        };
    }

    render() 
    {
        return (
            <div className="mx-4 pt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <ArrowBackIcon onClick={() => this.props.history.goBack()}/>
                    <p className="m-0"><b>Doctors</b></p>
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
                <Fab onClick={()=>this.props.history.push("/adddoctor")} sx={{ position:"absolute", bottom:80, right: 16, }} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        
        );
    }
}

const SearchDoctor = withRouter(SearchdoctorLoc);
export default SearchDoctor;
