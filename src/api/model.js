import Model, {ModelObject} from "./api";

class MarkerObject extends ModelObject {
    constructor(data, baseUrl) {

        super(data, baseUrl);
        this.fields = ["id", "Phone", "size", "financial_rating", "avg_cost", "covid_rating", "beds_available", "care_rating",
            "oxygen_rating", "ventilator_availability", "oxygen_availability", "icu_availability", "lat", "lng", "images",
            "display_address", "name", "datef"]
        this.excluded_fields = ['image', 'added_by_id']
        this.getData()

    }

}

class ReviewObject extends ModelObject {


    constructor(data, baseUrl) {
        super(data, baseUrl);
        this.fields = ["id", "marker", "financial_rating", "avg_cost", "covid_rating", "beds_available", "care_rating",
            "oxygen_rating", "ventilator_availability", "oxygen_availability", "icu_availability", "comment", "datef",
            "images", "day",]
        this.excluded_fields = ['image', 'written_by_id']
        this.getData()
    }
}

class susObject extends ModelObject {

    constructor(data, baseUrl) {
        super(data, baseUrl);
        this.fields = ["id", "marker", "comment", "created_by", "datef"]
        this.getData()
    }
}

let Marker
export let Review = new Model('/review/', ReviewObject)
export let Sus = new Model('/suspicious/', susObject)
export default Marker = new Model('/marker/', MarkerObject)
