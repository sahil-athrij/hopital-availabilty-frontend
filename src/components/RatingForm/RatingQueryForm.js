import {Component} from "react";
import {Row} from "react-bootstrap";
import {SliderRating, StarRating} from "./Ratings";


export class RatingQueryForm extends Component {
    render() {
        return (
            <>
                <Row className="mt-0 mt-md-4 mb-2">
                    <StarRating name="oxyfr" label="Oxygen Care" content="Quality Rating for Oxyen Care"/>
                    <SliderRating name="oxyafr" label="Oxygen Availability"
                             content="Chance of Getting a Oxygen Supplied Beds (%) "/>
                </Row>
                <Row>
                    <SliderRating name="ventfr" label="Ventilator Availability"
                             content="Chance of Getting a Ventilator Beds (%) "/>
                    <SliderRating name="icufr" label="ICU Availability"
                             content="Chance of Getting into ICU if needed (%) "/>
                </Row>
                <Row>
                    <StarRating name="financialfr" extra_class="financial" label="Affordability"
                             content="Affordability of the hospital .higher is expensive"/>
                    <StarRating name="price" label="Average Cost"
                             content="Average Daily Cost of Stay (including Beds, Doctor Fees , Test ,Excluding Medicines"/>

                </Row>
                <Row>
                    <StarRating name="carefr" label="Convenience" col='p-0'
                             content="Convenience of Getting Care (higher is Better) the ease with dealing with Administrative"/>
                    <StarRating name="covidfr" label="Covid Care" col='p-0'
                             content="Quality of Covid Care (higher is better)"/>
                </Row>
            </>

        )
    }
}