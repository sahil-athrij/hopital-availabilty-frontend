import Model, {ModelObject} from "./api";

let baseUrl;
baseUrl = "http://127.0.0.1:8000"

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

export const Review = new Model(baseUrl + '/api/review/', ReviewObject)
export const Sus = new Model(baseUrl + '/api/suspicious/', susObject)
export const Marker = new Model(baseUrl + '/api/marker/', MarkerObject)
