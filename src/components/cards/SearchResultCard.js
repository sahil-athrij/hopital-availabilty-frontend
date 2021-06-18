import {Component} from "react";
import {StarRating} from "../RatingForm/Ratings";
import {Marker} from "../../api/model";

class SearchCards extends Component {

    render() {
        return (
            <div className="card card-left neumorphic_input card-margin bg-grey">
                <img src="/static/images/hospital.svg" className="card-img-top  p-2 p-md-4"/>
                <div className="card-body card-body-left widget-49 bg-white w-100">
                    <h5 className="card-title card-title-left">{this.props.model.name}</h5>
                    <h6 className="card-title card-title-left">{this.props.model.display_address}</h6>
                    <div className="d-flex d-flex justify-content-between mb-3">
                        <h6 className="card-title card-title-left">
                            {
                                this.props.model.Phone === '0000000000' ? '' :
                                    <a href={"tel:" + this.props.model.Phone}>
                                        <i className="fa fa-phone-alt text-success"
                                           aria-hidden="true"/>
                                        ${this.props.model.Phone}</a>
                            }
                        </h6>
                        <h6 className="card-title card-title-left" id="{{ id }}title">
                            <a target="_blank"
                               href={`https://www.google.com/maps/search/${this.props.model.name}/@${this.props.model.lat},${this.props.model.lng},19.88z`}>
                                <i className="fa fa-map-marker"/> Route Map
                            </a>
                        </h6>
                    </div>


                    <div className="widget-49-meeting-points  row">
                        <StarRating className="col-6" label="Oxygen Care"
                                    content="Quality Rating for Oxyen Care" disabled="disabled"
                                    value="${this.props.model.oxygen_rating}"/>
                        <StarRating className="col-6" extra_className="financial"
                                    label="Affordability"
                                    content="Affordability of the hospital .higher is expensive" disabled="disabled"
                                    value={this.props.model.financial_rating}/>
                    </div>
                    <div className="widget-49-meeting-points  row">
                        <StarRating className="col-6" label="Convenience"
                                    content="Convenience of Getting Care (higher is Better) the ease with dealing with Administrative"
                                    disabled="disabled" value={this.props.model.care_rating}/>
                        <StarRating className="col-6" label="Covid Care"
                                    content="Quality of Covid Care (higher is better)" disabled="disabled"
                                    value={this.props.model.covid_rating}/>
                    </div>
                    <div className="widget-49-meeting-points mt-2 row">
                        <div className="col">Average Cost : <span>{this.props.model.avg_cost}</span> Rs</div>
                        <div className="col">Oxygen Availability : <span>{this.props.model.oxygen_availability}</span> %
                        </div>
                    </div>
                    <div className="widget-49-meeting-points my-2 row">
                        <div className="col">Ventilator Availability
                            : <span>{this.props.model.ventilator_availability}</span> %
                        </div>
                        <div className="col">ICU Availability : <span>{this.props.model.icu_availability}</span> %
                        </div>
                    </div>
                    <h6 className="card-title card-title-left" id="{{ id }}title">

                    </h6>
                    <div className="d-flex d-flex justify-content-between">
                        <a href={"/details/" + this.props.model.id + "?review=true"}
                           className="btn bg-white text-warning">
                            <i className="fa fa-star"/>Share Feedback</a>

                        <a href={"/details/" + this.props.model.id}
                           className="btn input-right input-left bg-dark btn-dark">More
                            Info</a>
                    </div>
                </div>
            </div>

        )
    }

}


export class SearchResults extends Component {

    state = {'models': [], next: ''}

    componentDidMount() {
        Marker.filter().then((response) => {
            let {results, next} = response
            this.setState({models: results, next: next})

        })
    }

    render() {
        console.log(this.state)
        return (
            this.state.models.map((model) =>
                <SearchResults model={model}/>
            )

        )

    }
}