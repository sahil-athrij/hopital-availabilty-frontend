import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import filter from "../../images/filter.svg";
import { styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { AuthComponent, AuthPropsLoc, AuthState } from "../../api/auth";
import { withRouter } from "react-router";
import {Ambulance, AmbulanceObject} from "../../api/model";
import {AmbulanceCards} from "./SearchCard";



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

interface SearchAmbulanceState extends AuthState {
    ambulances: AmbulanceObject[],
    next: string,
    searchTerm: string
}

class SearchAmbulanceLoc extends AuthComponent <AuthPropsLoc, SearchAmbulanceState>
{
    constructor(props: AuthPropsLoc)
    {
        super(props);
        this.state = {
            ...this.state,
            searchTerm:""
        };
        this.getAmbulances();
    }

    async getAmbulances ()
    {
        Ambulance.filter({search: this.state.searchTerm}).then((ambulances) =>
        {
            const next = ambulances.next;
            const results = ambulances.results;
            this.setState({ambulances: results, next: next});
        });

    }

    editSearchTerm = (e: string) =>
    {
        this.setState({searchTerm: e}, ()=>
        {
            this.getAmbulances();
        });
    };


    render()
    {
        return (
            <div className="mx-2 pt-4 mb-5 pb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <ArrowBackIcon onClick={() => this.props.history.goBack()}/>
                    <p className="m-0"><b>Ambulances</b></p>
                    <img src={filter} alt="filter"/>
                </div>
                <div className="mt-2">
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search for Ambulances"
                            inputProps={{ "aria-label": "search" }}
                            type="text"
                            value={this.state.searchTerm}
                            onChange = {(event) => this.editSearchTerm(event.target.value)}
                        />
                    </Search>
                </div>
                <div className="d-flex justify-content-around flex-wrap mt-3 px-0 p-0">

                    {this.state.ambulances && this.state.ambulances.map((model, i) => <AmbulanceCards model={model} key={i}/>)}

                </div>
                <Fab onClick={()=>this.props.history.push("/addambulance")} sx={{ position:"fixed", bottom:80, right: 16, }} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>

        );
    }
}

const SearchAmbulance = withRouter(SearchAmbulanceLoc);
export default SearchAmbulance;
