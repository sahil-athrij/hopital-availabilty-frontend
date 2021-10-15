import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";
import {MenuItem, TextField, Button} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./AddDepartment.css";
import {Department, DepartmentName, DepartmentNameObject} from "../../api/model";
import {Skeleton} from "antd";
import {toast} from "react-toastify";

interface AddDepartmentState extends AuthState {
    departments: Array<DepartmentNameObject>,
    id: number,
    hospital: number,
    ready?: boolean
}


class AddDepartmentLoc extends AuthComponent<AuthPropsLoc, AddDepartmentState> 
{

    async componentDidMount() 
    {
        super.componentDidMount();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const {hospital} = this.props.match.params;
        const departments = await DepartmentName.filter();

        this.setState({
            departments: departments.results as Array<DepartmentNameObject>,
            hospital,
            ready: true,
        });
    }

    saveDepartment = () => 
    {
        Department.create({name_id: this.state.id, hospital: this.state.hospital})
            .then(() => 
            {
                this.props.history.push(`/details/${this.state.hospital}`);
                toast.success("thank you for the contribution", {
                    position: "bottom-center"
                });
            }).catch((error) => 
            {
                toast.error(error.details, {
                    position: "bottom-center"
                });
            });
    };

    render(): JSX.Element 
    {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore                                                                //TODO
        // const {hspId} = this.props.match.params;

        return (
            this.state.ready ?
                <div className="main h-100">
                    <div className="head-sec d-flex justify-content-between p-3 shadow-none h-25">
                        <CloseIcon onClick={() => this.props.history.goBack()} />
                        <p className="align-self-center m-0 p-0 justify-content-center"><b>Add Department details</b>
                        </p>
                        <Button className="sub" variant="contained" onClick={this.saveDepartment}>Submit</Button>
                    </div>

                    <div className="m-4">

                        <TextField className="mt-4" fullWidth variant="outlined" select label="Name"
                            InputLabelProps={{shrink: true, }} size="small"
                            onChange={({target}) => this.setState({id: Number(target.value)})}>
                            {this.state.departments.map(({name, id}, i) =>
                                <MenuItem value={id} key={i}>{name}</MenuItem>
                            )}
                        </TextField>

                        {/*<p className="text-left mt-3 p-0"><small><b>Facilities available</b></small></p>    */}
                        {/*<TextField fullWidth variant="outlined" select label="Is there a lab" InputLabelProps={{shrink: true,}} size="small" />*/}
                        {/*<TextField className="mt-4" fullWidth variant="outlined" select label="Pharmacy" InputLabelProps={{shrink: true,}} size="small" />*/}
                        {/*<TextField className="mt-4" fullWidth variant="outlined" select label="Facility number 1" InputLabelProps={{shrink: true,}} size="small" />*/}
                        {/*<TextField className="mt-4" fullWidth variant="outlined"  label="Facility number 2" InputLabelProps={{shrink: true,}} size="small"/>*/}
                        {/*<TextField className="mt-4" fullWidth variant="outlined"  label="Number of Doctors" InputLabelProps={{shrink: true,}} size="small"/>*/}
                        {/*<p className="text-left mt-3"><small><b>Doctor Details</b></small></p>  */}

                    </div>

                </div> :
                <div className="main h-100">
                    <div className="head-sec d-flex justify-content-between p-3 shadow-none h-25">
                        <CloseIcon onClick={() => this.props.history.goBack()}/>
                        <p className="align-self-center m-0 p-0 justify-content-center"><b>Add Department details</b>
                        </p>
                        <Button className="sub" variant="contained" onClick={this.saveDepartment}>Submit</Button>
                    </div>

                    <div className="m-4">
                        <Skeleton.Input className="mt-2 w-100" active={true} size={"large"}/>
                    </div>
                </div>

        );
    }
}

export const AddDepartmentComponent = withRouter(AddDepartmentLoc);
