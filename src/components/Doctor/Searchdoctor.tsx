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
import {Button, Chip, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {withStyles} from "@mui/styles";


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

const departments = ["Cardiology", "Anaesthesiology", "Dermatology", "Endocrinology", "Gastroenterology", "Oncology",
    "Nephrology", "Neurology", "Paediatrics", "Psychiatry", "Pulmonology", "Radiology", "Rheumatology", "Geriatrics", "Gynaecology", "Community Health", "ENT",
    "Dental", "Venerology", "Dietician", "Pathology", "General Physician", "Orthopaedics"];

const types = ["Economy", "Speciality", "Super speciality", "Normal"];

const medicine = ["Ayurveda", "Allopathy", "Homeopathy"];

const StyledChip = withStyles({
    root: {},

    label: {
        padding: "0",
    },

})(Chip);

const bluechip = {
    background: "#3E64FF", "&:hover": {
        background: "#3E64FF",
        color: "white",
    }, borderRadius: "5px", color: "white", fontSize: "15px", width: "126px", height: "41px"
};

const greychip = {
    background: "#F0F0F0",
    borderRadius: "5px",
    color: "black",
    fontSize: "15px",
    width: "126px",
    height: "41px"
};

interface SearchDoctorState extends AuthState {
    addDoctor: boolean,  //Useless use later if needed
    doctors: DoctorObject[],
    next: string,
    searchTerm: string,
    filter_active: boolean,
    filters: string[],
}

class SearchdoctorLoc extends AuthComponent <AuthPropsLoc, SearchDoctorState> 
{
    constructor(props: AuthPropsLoc) 
    {
        super(props);
        this.state = {
            ...this.state,
            addDoctor: false,
            searchTerm:"",
            filter_active: false,
            filters: [],
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

    toggleDrawer = (newOpen: boolean) => () =>
    {
        this.setState({filter_active: newOpen});
    };

    handleChipChange(value: string)
    {
        console.log(value);
        const index = this.state.filters.indexOf(value);
        const {filters} = this.state;
        if (index > -1)

            filters.splice(index, 1);

        else

            filters.push(value);



        this.setState({filters});
    }


    render() 
    {
        return (
            <div className="mx-2 pt-4 mb-5 pb-4">
                <div style={{left: "0", top: "0", background: "#fff", zIndex: 100, padding: "8px"}} className="position-fixed w-100">
                    <div className="d-flex justify-content-between align-items-center">
                        <ArrowBackIcon onClick={() => this.props.history.goBack()}/>
                        <p className="m-0"><b>Doctors</b></p>
                        <IconButton onClick={this.toggleDrawer(true)}>
                            <img  src={filter} alt="filter"/>
                        </IconButton>
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
                <SwipeableDrawer anchor="bottom"
                    open={this.state.filter_active}
                    onClose={this.toggleDrawer(false)}
                    onOpen={this.toggleDrawer(true)}
                    disableSwipeToOpen={false}
                    ModalProps={{
                        keepMounted: true,
                    }} className="fixed-bottom w-100 h-50 p-3" sx={{overflowY: "auto"}}>

                    <div className="filtertop w-100 d-flex justify-content-between pt-3 pb-2 px-3 align-self-center">
                        Select the tags you want to search
                        <IconButton  onClick={() =>
                        {
                            this.setState({filter_active: false}
                            );
                        }}>
                            <CloseIcon sx={{color: "#0338B9"}}/>
                        </IconButton>
                    </div>
                    {this.state.filters?.length? <Button sx={{width:"fit-content", marginLeft:"auto"}} className="bg-grey d-flex justify-content-end" endIcon={<ClearAllIcon sx={{color: "#0338B9"}}/>} onClick={() =>
                    {
                        this.setState({filters: []});
                    }}>
                        clear
                    </Button>:<></>}
                    <div className="filterbottom d-flex flex-column">
                        <div className="filterhead text-center w-100 mb-4 mt-4 ">Types</div>
                        <div className="chips d-flex flex-wrap justify-content-between align-items-center">
                            {types.map((value, key) => (
                                <div key={key} className="child mb-2">
                                    <StyledChip onClick={() => this.handleChipChange(value)}
                                        sx={this.state.filters.includes(value) ? bluechip : greychip}
                                        label={value} />
                                </div>
                            ))}
                        </div>
                        <div className="filterhead text-center w-100 mb-4 mt-2 ">Departments</div>
                        <div className="chips d-flex flex-wrap justify-content-between align-items-center">
                            {departments.map((value, key) => (
                                <div key={key} className="child mb-2">
                                    <StyledChip onClick={() => this.handleChipChange(value)}
                                        sx={this.state.filters.includes(value) ? bluechip : greychip}
                                        label={value} />
                                </div>
                            ))}
                        </div>
                        <div className="filterhead text-center w-100 mb-4 mt-2 ">Medicine</div>
                        <div className="chips d-flex flex-wrap justify-content-around align-items-center">
                            {medicine.map((value, key) => (
                                <div key={key} className="child mb-2">
                                    <StyledChip onClick={() => this.handleChipChange(value)}
                                        sx={this.state.filters.includes(value) ? bluechip : greychip}
                                        label={value} />
                                </div>
                            ))}
                        </div>
                    </div>

                </SwipeableDrawer>
                <Fab onClick={()=>this.props.history.push("/adddoctor")} sx={{ position:"fixed", bottom:80, right: 16, }} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        
        );
    }
}

const SearchDoctor = withRouter(SearchdoctorLoc);
export default SearchDoctor;
