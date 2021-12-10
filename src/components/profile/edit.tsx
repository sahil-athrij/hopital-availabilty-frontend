import {AuthComponent, AuthState, getAuth, setObj} from "../../api/auth";
import {Language, LanguageObject} from "../../api/model";
import {AuthPropsLoc} from "../GiveHelp/GiveHelp";
import {withRouter} from "react-router";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import {Avatar, Container, TextField, Autocomplete} from "@mui/material";

import * as React from "react";
import "./edit.css";

import cam from "../../images/cam-pic.jpg";
import {StickyHead} from "../Utils";
import {toast} from "react-toastify";
import {baseUrl, filePatch, patch} from "../../api/api";
import {ChangeEvent} from "react";


interface EditState extends AuthState
{
    active: boolean,
    languages: Array<LanguageObject>,
    searchTerm: string,

}

type User = {
    id: number,
    tokens: {
        private_token: string,
        invite_token: string,
        invited: number,
        points: number,
        profile: string | null,
        phone_number:string,
        languages: string[],

    }; email: string; username: string; first_name: string; last_name: string;
};

class Edit extends AuthComponent<AuthPropsLoc, EditState>
{
    fileInput: React.RefObject<HTMLInputElement>;

    constructor(props: AuthPropsLoc)
    {
        super(props);
        this.state = {
            ...this.state,
            languages: [],
            searchTerm:"",
            user: {
                ...this.state.user,
                tokens: {...this.state.user?.tokens, languages: this.state.user?.tokens.languages}
            } as User
            

        };
        this.getLanguages().then(undefined);
        this.fileInput = React.createRef();
    }


    save = () =>
    {
        if (!this.state.user)
        
            return;
        
        const access_token = getAuth();

        return patch(`${baseUrl}/auth/users/me/`, this.state.user, {"Authorization": `Bearer ${access_token}`}).then(({results}) =>
        {
            setObj("user", results[0]);
            this.props.history.push("/profile");
            toast.success("Successfully edited your details", {
                position: "bottom-center"
            });
        }).catch((error) =>
        {
            toast.error(error.details, {
                position: "bottom-center"
            });
        });
    };

    uploadImage = (event: ChangeEvent<HTMLInputElement>) =>
    {
        event.preventDefault();

        const reader = new FileReader();
        const file = event.target.files?.[0];
        if (file)
        {

            reader.onloadend = () =>
            {
                const formData = new FormData();

                formData.append(
                    "image",
                    file,
                    file.name
                );

                const headers = {"Authorization": `Bearer ${getAuth()}`};

                filePatch(baseUrl + "/auth/users/me/", formData, headers).then(() =>
                {
                    toast.success("Successfully updated photo", {
                        position: "bottom-center"
                    });
                }).catch((error) =>
                {
                    toast.error(error.details, {
                        position: "bottom-center"
                    });
                });
            };
            reader.readAsDataURL(file);
        }
    };

    async getLanguages ()
    {
        Language.filter({search: this.state.searchTerm}).then((languages) => 
        {
            const results = languages.results;
            this.setState({languages: results});
        });

    } 

    editSearchTerm = (e: string) => this.setState({searchTerm: e}, this.getLanguages);

    render()
    {
        return (
            <div>
                <StickyHead title="Edit Your Profile" action={"Save"} onClick={this.save}
                    goBack={this.props.history.goBack}/>
                <Container className="d-flex justify-content-center my-3">
                    <input type="file" hidden onChange={this.uploadImage} accept="image/*" ref={this.fileInput}/>
                    <Avatar sx={{width: "107px", height: "107px"}}
                        onClick={() => this.fileInput.current?.click()}
                        src={this.state.user?.tokens.profile ||  cam}
                    />
                </Container>
                {this.state.user &&
                <Container className="px-5 ">
                    <p className="txthead mt-3 ">FIRST NAME</p>
                    <div className="d-flex justify-content-between flex-row align-items-center">
                        <TextField
                            value={this.state.user?.first_name}
                            fullWidth
                            onChange={({target}) => this.setState({
                                ...this.state,
                                user: {...this.state.user, first_name: target.value} as User
                            })}
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <button onClick={() =>
                                    {
                                        this.setState({
                                            ...this.state,
                                            user: {...this.state.user, first_name: ""} as User
                                        });
                                    }}>
                                        <HighlightOffIcon/>
                                    </button>
                                ),
                            }}
                        />

                    </div>
                    <p className="txthead mt-3">LAST NAME</p>
                    <div className="d-flex justify-content-between flex-row align-items-center">
                        <TextField
                            value={this.state.user?.last_name}
                            fullWidth
                            onChange={({target}) => this.setState({
                                ...this.state,
                                user: {...this.state.user, last_name: target.value} as User
                            })}
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <button onClick={() =>
                                    {
                                        this.setState({
                                            ...this.state,
                                            user: {...this.state.user, last_name: ""} as User
                                        });
                                    }}>
                                        <HighlightOffIcon/>
                                    </button>
                                ),
                            }}
                        />
                    </div>
                    <p className="txthead mt-3">EMAIL</p>
                    <div className="d-flex justify-content-between flex-row align-items-center">
                        <TextField
                            value={this.state.user?.email}
                            fullWidth
                            onChange={({target}) => this.setState({
                                ...this.state,
                                user: {...this.state.user, email: target.value} as User
                            })}
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <button onClick={() =>
                                    {
                                        this.setState({
                                            ...this.state,
                                            user: {...this.state.user, email: ""} as User
                                        });
                                    }}>
                                        <HighlightOffIcon/>
                                    </button>
                                ),
                            }}
                        />
                    </div>
                    <p className="txthead mt-3">PHONE</p>
                    <div className="d-flex justify-content-between flex-row align-items-center">
                        <TextField
                            value={this.state.user?.tokens?.phone_number}
                            fullWidth
                            onChange={({target}) => this.setState({
                                ...this.state,
                                user: {
                                    ...this.state.user,
                                    tokens: {...this.state.user?.tokens, phone_number: target.value}
                                } as User
                            })}
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <button onClick={() =>
                                    {
                                        this.setState({
                                            ...this.state,
                                            user: {
                                                ...this.state.user,
                                                tokens: {...this.state.user?.tokens, phone_number: ""}
                                            } as User
                                        });
                                    }}>
                                        <HighlightOffIcon/>
                                    </button>
                                ),
                            }}
                        />
                    </div>
                    <p className="txthead mt-3">LANGUAGES</p>
                    <div className="d-flex justify-content-between flex-row align-items-center">
                        <Autocomplete  /*TODO previous value in text filed*/
                            multiple
                            fullWidth
                            autoSelect
                            value={this.state.user?.tokens?.languages}
                            options={this.state.languages.map(({name})=> name)}
                            onChange={(_, language) => this.setState({
                                ...this.state,
                                user: {
                                    ...this.state.user,
                                    tokens: {...this.state.user?.tokens, languages: language}
                                } as User
                            })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    fullWidth
                                    // defaultValue={this.state.user?.tokens?.languages}
                                    // value={this.state.user?.tokens?.languages}
                                    onChange = {(event) => this.editSearchTerm(event.target.value)}
                                />)}
                        />
                    </div>
                    <div className="bottom-sec">
                        <hr className="linestyle"/>
                        <div className="endtxt pb-4">We appreciate your kindness</div>
                    </div>
                </Container>}


            </div>
        );
    }
}

export const EditPage = withRouter(Edit);
