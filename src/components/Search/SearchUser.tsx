import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserCard from "./UserCard";
import {UserSearch, UserSearchObject} from "../../api/model";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";
import filter from "../../images/filter.svg";
import SearchIcon from "@mui/icons-material/Search";
import {styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";


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

interface SearchUserState extends AuthState
{
    users: UserSearchObject[];
    searchTerm: string;
    next: string;
}

class SearchUserLoc extends AuthComponent <AuthPropsLoc, SearchUserState>
{
    constructor(props: AuthPropsLoc)
    {
        super(props);
        this.state = {
            ...this.state,
            users: [],
            searchTerm:"",
            next: "",
        };
    }

    async getUsers ()
    {
        UserSearch.filter({search: this.state.searchTerm}).then((users) =>
        {
            const next = users.next;
            const results = users.results;
            this.setState({users: results, next: next});
            console.log(users.results);
        });
    }

    editSearchTerm = (e: string) =>
    {
        this.setState({searchTerm: e}, ()=>
        {
            this.getUsers();
        });
    };

    render()
    {
        return <div className="mx-2 pt-4 mb-5 pb-4">
            <div style={{left: "0", top: "0", background: "#fff", zIndex: 100, padding: "8px"}} className="position-fixed w-100">
                <div className="d-flex justify-content-between align-items-center">
                    <ArrowBackIcon onClick={() => this.props.history.goBack()}/>
                    <p className="m-0"><b>User Search</b></p>
                    <img src={filter} alt="filter"/>
                </div>
                <div className="mt-2">
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search for users"
                            inputProps={{ "aria-label": "search" }}
                            type="text"
                            value={this.state.searchTerm}
                            onChange = {(event) => this.editSearchTerm(event.target.value)}
                        />
                    </Search>
                </div>
            </div>

            <div style={{paddingTop: "70px"}} className="mt-3 px-0">

                {this.state.users && this.state.users.map((model, i) => <UserCard model={model} key={i}/>)}

            </div>
        </div>;
    }
}

export const SearchUser = withRouter(SearchUserLoc);
