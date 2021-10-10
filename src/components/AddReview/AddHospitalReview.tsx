import { Button } from "@mui/material";
import React from "react";
import close from "../../images/close.svg";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import profile from "../../images/profile-image.svg";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import { Marker, MarkerObject, Review } from "../../api/model";
import { toast } from "react-toastify";


interface AddHospitalReviewState extends AuthState {
  model: MarkerObject,
  ready: boolean,  
  id: number,
    total_rating: number, 
    financial_rating: number,
    avg_cost: number,
    covid_rating: number,
    beds_available: number,
    care_rating: number,
    oxygen_rating: number,
    ventilator_availability: number,
    oxygen_availability: number,
    icu_availability: number,
    comment: string,
    datef: string,
    images: object[] | any,
    day: number,
    written_by_name: string,
    written_by: string,
    size: number,

}

export default class AddHospitalReview extends AuthComponent<AuthPropsLoc, AddHospitalReviewState> {

  constructor(props: AuthPropsLoc) {
    super(props);
    this.state = {
        ...this.state,
        total_rating:0, 
        financial_rating: 0,
        avg_cost:0,
        covid_rating:0,
        beds_available:0,
        care_rating:0,
        id: 0,
        ready: false,
        oxygen_rating:0,
        ventilator_availability:0,
        oxygen_availability:0,
        icu_availability:0,
        comment: "",
    }


}

  setValue = (name: string, event: string | boolean | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let value
    if (typeof event !== "boolean" && typeof event !== 'string') {
        value = event.target.value
    } else {
        value = event
    }
    //TODO: fix ts ignore
    // @ts-ignore
    this.setState({[name]: value})

}

savePatient = async () => {
  console.log(this.state)
  const toSend = this.state;

  toSend.user = null;


  if (this.state.total_rating && this.state.care_rating && this.state.financial_rating && this.state.oxygen_rating)
      Review.create({...toSend,})
          .then(() => {
              this.props.history.push(`/`)
              toast.success('Successfully added your details', {
                  position: 'bottom-center'
              })
          }).catch((error) => {
          toast.error(error.details, {
              position: 'bottom-center'
          })
      })
  else
      toast.error("please enter the required details", {
          position: 'bottom-center'
      })
}

async refreshReviews() {
  this.setState({ready: false})
  //TODO: fix later
  // @ts-ignore
  let {hspId} = this.props.match.params
  console.log(hspId);
  let marker = await Marker.get(hspId) as MarkerObject

  this.setState({model: marker, ready: true, id: hspId})

}

async componentDidMount() {
  super.componentDidMount()
  await this.refreshReviews()
}

  render() {
    return (
      <div className="pb-4">
        <div style={{boxShadow: "0px 10px 60px rgba(0, 0, 0, 0.0625)"}} className="d-flex justify-content-between p-3 h-25"> 
          <img src={close} onClick={() => this.props.history.goBack()} alt={"close"} />
          <p className="align-self-center m-0 p-0 justify-content-center">
            <b>Hospital Name</b>
          </p>
          <Button onClick={this.savePatient} className="sub" variant="contained">
            Submit
          </Button>
        </div>

        <div className="d-flex mx-4 mt-4">
          <img src={profile} alt="img" />

          <div className="d-flex flex-column justify-content-center text-left ml-2">
            <h6 className="m-0">
              <b>Unknown User</b>
            </h6>
            <p className="p-0 m-0">
              <small>Share your experience to help others</small>
            </p>
          </div>
        </div>

        <div className="d-flex mx-4 px-4 mt-4">
            <Rating
              className="required mx-4 justify-content-between"
              name="size-large"
              defaultValue={this.state.total_rating}
              size="large"
              onChange={(event, value) =>
                this.setState({total_rating: Number(value)})}
            />
          </div>

        <div className="mx-4 mb-4 mt-1">
          <TextField
            sx={{borderRadius: "10px"}}
            className="mt-2"
            fullWidth
            variant="outlined"
            label="Tell us more"
            InputLabelProps={{ shrink: true }}
            size="small"
            onChange={(event) =>
              this.setValue("comment", event)}
          />

          <TextField
            className="mt-4"
            fullWidth
            variant="outlined"
            select
            label="Oxygen Availability"
            InputLabelProps={{ shrink: true }}
            size="small"
            onChange={(event) =>
              this.setValue("oxygen_availability", event)}
          >
            <MenuItem value={0}>Available</MenuItem>
            <MenuItem value={1}>Unavailable</MenuItem>
            <MenuItem value={2}>Didn't Avail</MenuItem>

          
          </TextField>

          <TextField
            className="mt-4"
            fullWidth
            variant="outlined"
            select
            label="ICU Availability"
            InputLabelProps={{ shrink: true }}
            size="small"
            onChange={(event) =>
              this.setValue("icu_availability", event)}
          >
             <MenuItem value={0}>Available</MenuItem>
            <MenuItem value={1}>Unavailable</MenuItem>
            <MenuItem value={2}>Didn't Avail</MenuItem>

          </TextField>

          <TextField
            className="mt-4"
            fullWidth
            variant="outlined"
            select
            label="Ventilator Availability"
            InputLabelProps={{ shrink: true }}
            size="small"
            onChange={(event) =>
              this.setValue("ventilator_availability", event)}
          >
             <MenuItem value={0}>Available</MenuItem>
            <MenuItem value={1}>Unavailable</MenuItem>
            <MenuItem value={2}>Didn't Avail</MenuItem>
            
          </TextField>

          <div className="d-flex flex-column text-left mt-4 pl-4">
            <h6 className="m-0">
              <b>General Care Quality</b>
            </h6>

            <Rating
              className="required mx-1 mt-1 justify-content-between"
              name="size-large"
              defaultValue={this.state.care_rating}
              size="large"
              onChange={(event, value) =>
                this.setState({care_rating: Number(value)})}
            />            
          </div>


          <div className="d-flex flex-column text-left mt-4 pl-4">
            <h6 className="m-0">
              <b>Infrastructure Quality</b>
            </h6>

            <Rating
              className="required mx-1 mt-1 justify-content-between"
              name="size-large"
              defaultValue={this.state.oxygen_rating}
              size="large"
              onChange={(event, value) =>
                this.setState({oxygen_rating: Number(value)})}
            />            
          </div>


          <div className="d-flex flex-column text-left mt-4 pl-4">
            <h6 className="m-0">
              <b>Affordability</b>
            </h6>

            <Rating
              className="required mx-1 mt-1 justify-content-between"
              name="size-large"
              defaultValue={this.state.financial_rating}
              size="large"
              onChange={(event, value) =>
                this.setState({financial_rating: Number(value)})}
            />            
          </div>

          <TextField
            className="my-4"
            fullWidth
            variant="outlined"
            label="Average Daily Coast"
            InputLabelProps={{ shrink: true }}
            size="small"
            onChange={(event) =>
              this.setValue("avg_coast", event)}
          />

          
        </div>
      </div>
    );
  }
}
