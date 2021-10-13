import React, {ChangeEvent} from "react";
import {AuthComponent, AuthState} from "../../api/auth";
import {Marker, MarkerObject} from "../../api/model";
import {RouteComponentProps, withRouter} from "react-router";
import {Container} from "react-bootstrap";
import {FcAddImage} from "react-icons/all";
import {toast} from "react-toastify";
import Loader from "react-loader-spinner";

interface AddHospitalPhotoProps {
    hspId: string
}

type AddHospitalPhotoPropsLoc = RouteComponentProps<AddHospitalPhotoProps>

interface AddHospitalPhotoState extends AuthState {
    id: number,
    model: MarkerObject,
    ready: boolean,
    show_review: boolean,
    file?: File
    imagePreviewUrl: string | ArrayBuffer | null
    done: boolean
}

export class AddHospitalPhotoLoc extends AuthComponent<AddHospitalPhotoPropsLoc, AddHospitalPhotoState> 
{
    fileInput: React.RefObject<HTMLInputElement>;


    constructor(props: AddHospitalPhotoPropsLoc) 
    {
        super(props);
        this.state = {
            ...this.state,
            id: 0,
            ready: false,
            done: false
        };
        this.fileInput = React.createRef();
    }

    async refreshReviews() 
    {
        this.setState({ready: false});

        const {hspId} = this.props.match.params;
        const marker = await Marker.get(hspId) as MarkerObject;

        this.setState({model: marker, ready: true});

    }

    async componentDidMount() 
    {
        super.componentDidMount();
        await this.refreshReviews();
    }

    handleFile = (event: ChangeEvent<HTMLInputElement>) => 
    {
        event.preventDefault();
        console.log(event.target.value);

        const reader = new FileReader();
        const file = event.target.files?.[0];
        if (file) 
        {

            reader.onloadend = () => 
            {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result,
                    done: false
                });

            };
            reader.readAsDataURL(file);


        }
    };
    handleClick = () => 
    {
        console.log(this.fileInput.current?.click());
    };
    handleSubmit = () => 
    {
        this.state.model.addPhoto(this.state.file as File).then((r) => 
        {
            console.log(r);
            toast.success("Thank you For Uploading Image", {
                position: "bottom-center"
            });
            this.setState({done:true});

        }).catch(async (e) => 
        {
            const message = await e.json();
            console.log(message);
            toast.error(message.detail, {
                position: "bottom-center"
            });
        });
    };

    render() 
    {
        return this.state.ready ?
            <div className="bg-grey d-flex flex-column   min-vh-100">

                <Container className="mt-5 pt-4 ">
                    <h4><b>Add Hospital Photo</b></h4>
                </Container>
                <Container className=" px-0 pb-3 pt-3 mt-5 bg-white neumorphic-input">
                    <div className="d-flex flex-column px-3">
                        <h4 className="text-center">Upload Image File</h4>
                        <h6 className="text-center">for <b>{this.state.model.name}</b></h6>

                        <div
                            className={"bg-white mx-5 my-4 mt-3 p-3 border-primary neumorphic_file file-container round-15"}
                            onClick={this.handleClick}>
                            {this.state.file ?

                                <>
                                    <img src={this.state.imagePreviewUrl as string} alt="upload"
                                        className={"w-100 rounded"}/>
                                    <div>{this.state.file.name}</div>
                                </>
                                : <>

                                    <div>Choose File</div>
                                    <FcAddImage className={"text-primary "} size={60}/>
                                </>

                            }
                            <input type="file" hidden onChange={this.handleFile} accept="image/*" ref={this.fileInput}/>
                        </div>
                        {this.state.file &&
                        (this.state.done ?
                            <button className="btn-success btn blue-gradient rounder ml-auto mr-auto w-50"
                                onClick={()=>
                                {
                                    this.props.history.goBack();
                                }}
                            >Go Back</button> :
                            <button className="btn-success btn green-gradient rounder ml-auto mr-auto w-50"
                                onClick={this.handleSubmit}>Submit</button>
                        )}
                    </div>
                </Container>

            </div>
            :
            <Container fluid={true} className="my-5 py-5 ">
                <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
            </Container>
        ;
    }
}

export const AddHospitalPhoto = withRouter(AddHospitalPhotoLoc);
