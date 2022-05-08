import React, {Component} from "react";
import Button from "@mui/material/Button";
import {UserSearchObject} from "../../api/model";
import {Avatar} from "@mui/material";
import {baseUrl, post} from "../../api/api";
import {getAuth} from "../../api/auth";
import {toast} from "react-toastify";


interface myProps
{
    model: UserSearchObject;
}

class UserCard extends Component<myProps>
{
    constructor(props: myProps)
    {
        super(props);
    }

    async AddFriend(token: string)
    {
        await post(`${baseUrl}/auth/users/friend/`, {token}, {"Authorization": `Bearer ${getAuth()}`})
            .then(() => toast.success("friend Added Successfully", { position: "bottom-center"}))
            .catch((error) => toast.error((error as { details: string }).details, {position: "bottom-center"}));
    }

    render()
    {
        return (
            <div>
                <div className="my-2 doctor-card ">

                    <div>
                        <div>
                            <div className="d-flex">
                                <Avatar className="Doc-icon"
                                    alt={this.props.model.first_name}
                                    src={this.props.model.image}
                                    sx={{ width: 70, height: 70 }}
                                />
                                <div className="d-flex justify-content-center mx-3 flex-column align-items-start">
                                    <div className="nunito-black-ebony-clay-16px text-start">
                                        {this.props.model.first_name + this.props.model.last_name}
                                    </div>
                                </div>

                                <div style={{marginLeft: "auto"}} className="d-flex justify-content-around">
                                    <div className="d-flex align-items-center" style={{textDecoration:"none"}} >
                                        <Button onClick={()=>this.AddFriend(this.props.model.private_token)} variant="contained">Add Friend</Button>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default UserCard;
