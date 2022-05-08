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
import { Doctor, DoctorObject } from "../../api/model";
import DoctorProfile from "../Details/DoctorCards";


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
    addDoctor: boolean,  //Useless use later if needed
    doctors: DoctorObject[],
    next: string,
    searchTerm: string
}

class SearchdoctorLoc extends AuthComponent <AuthPropsLoc, SearchDoctorState> 
{
    constructor(props: AuthPropsLoc) 
    {
        super(props);
        this.state = {
            ...this.state,
            addDoctor: false,
            searchTerm:""            
        };
        this.getDoctors();
    }

    async getDoctors () 
    {
        Doctor.filter({search: this.state.searchTerm}).then((doctors) => 
        {
            const next = doctors.next;
            const results = doctors.results;
            this.setState({doctors: results, next: next});
            console.log(doctors.results);
        });
    } 

    editSearchTerm = (e: string) => 
    {
        this.setState({searchTerm: e}, ()=> 
        {
            this.getDoctors();
        });
    };


    render() 
    {
        return (
            <div className="mx-2 pt-4 mb-5 pb-4">
                <div style={{left: "0", top: "0", background: "#fff", zIndex: 100, padding: "8px"}} className="position-fixed w-100">
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
                                type="text"
                                value={this.state.searchTerm}
                                onChange = {(event) => this.editSearchTerm(event.target.value)}
                            />
                        </Search>
                    </div>
                </div>

                <div style={{paddingTop: "70px"}} className="mt-3 px-0">

                    {this.state.doctors && this.state.doctors.map((model, i) => <DoctorProfile model={model} key={i}/>)}

                </div>
                <Fab onClick={()=>this.props.history.push("/adddoctor")} sx={{ position:"fixed", bottom:80, right: 16, }} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        
        );
    }
}

const SearchDoctor = withRouter(SearchdoctorLoc);
export default SearchDoctor;
