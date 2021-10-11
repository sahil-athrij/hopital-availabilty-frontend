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
import { withRouter } from "react-router";
import { withStyles } from "@mui/styles";


const RatingStyler = withStyles({
  icon: {
      padding: '1rem',
  },
})(Rating);

interface AddHospitalReviewState extends AuthState {
  model: MarkerObject,
  ready: boolean,  
  marker: number,
    total_rating: null | number, 
    financial_rating: null | number,
    avg_cost: number,
    care_rating: number | null,
    oxygen_rating: null | number,
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

class AddHospitalReviewLoc extends AuthComponent<AuthPropsLoc, AddHospitalReviewState> {

  constructor(props: AuthPropsLoc) {
    super(props);
    this.state = {
        ...this.state,
        total_rating:0, 
        financial_rating: 0,
        avg_cost:0,
        care_rating:0,
        marker: 0,
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


  if (this.state.total_rating && this.state.care_rating && this.state.financial_rating && this.state.oxygen_rating)
      Review.create({...this.state,user:null})
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
  console.log(this.props.match.params)
  //TODO: fix later
  // @ts-ignore
  let {hspId} = this.props.match.params
  let marker = await Marker.get(hspId) as MarkerObject

  this.setState({ready: true, marker: hspId, model:marker})

}

async componentDidMount() {
  super.componentDidMount()
  await this.refreshReviews()
}


  render() {
    if (!this.state.auth) {
      this.performAuth()
      return (<></>)
  } else {
    return (
      <div className="pb-4">
        <div style={{boxShadow: "0px 10px 60px rgba(0, 0, 0, 0.0625)"}} className="d-flex justify-content-between p-3 h-25"> 
          <img src={close} onClick={() => this.props.history.goBack()} alt={"close"} />
          <p className="align-self-center m-0 p-0 justify-content-center">
            <b>{this.state.model?.name}</b>
          </p>
          <Button onClick={this.savePatient} className="sub" variant="contained">
            Submit
          </Button>
        </div>

        <div className="d-flex mx-4 mt-4">
          <img src={profile} alt="img" />

          <div className="d-flex flex-column justify-content-center text-left ml-2">
            <h6 className="m-0">
              <b>{this.state.user? this.state.user.username:"Unknown User"}</b>
            </h6>
            <p className="p-0 m-0">
              <small>Share your experience to help others</small>
            </p>
          </div>
        </div>

        <div className="d-flex mx-4 mt-4">
            <RatingStyler
              name="size-large"
              size="large"
              onChange={(event, value) =>
                this.setState({total_rating: value})}
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

          <div className="d-flex flex-column text-left mt-4">
            <h6 className="m-0 pl-4">
              <b>General Care Quality</b>
            </h6>

            <RatingStyler
              name="size-large"
              size="large"
              onChange={(event, value) =>
                this.setState({care_rating: value})}
            />          
          </div>


               <div className="d-flex flex-column text-left mt-4">
            <h6 className="m-0 pl-4">
              <b>Infrastructure Quality</b>
            </h6>

            <RatingStyler
              name="size-large"
              size="large"
              onChange={(event, value) =>
                this.setState({oxygen_rating: value})}
            />          
          </div>    


          <div className="d-flex flex-column text-left mt-4">
            <h6 className="m-0 pl-4">
              <b>Affordability</b>
            </h6>

            <RatingStyler
              name="size-large"
              size="large"
              onChange={(event, value) =>
                this.setState({financial_rating: value})}
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
}


export const AddHospitalReview = withRouter(AddHospitalReviewLoc);