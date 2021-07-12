import Model, {baseUrl, ModelData, ModelObject} from "./api";


export class MarkerObject extends ModelObject {
    lng: any;
    excluded_fields: string[];
    comment: object[] | any
    oxygen_availability: number = 0;
    covid_rating: number = 0;
    financial_rating: number = 0;
    oxygen_rating: number = 0;
    address: any;
    name: string | undefined;
    care_rating: number = 0;
    Phone: string | undefined;
    avg_cost: number = 0
    icu_availability: number = 0;
    model: any;
    ventilator_availability: number = 0;
    lat: any;

    constructor(data: ModelData, baseUrl: string) {

        super(data, baseUrl);
        this.fields = ["id", "Phone", "size", "financial_rating", "avg_cost", "covid_rating", "beds_available", "care_rating",
            "oxygen_rating", "ventilator_availability", "oxygen_availability", "icu_availability", "lat", "lng", "images",
            "display_address", "name", "datef", 'address', 'comment']
        this.excluded_fields = ['image', 'added_by_id']
        this.getData()

    }


}

export class ReviewObject extends ModelObject {


    constructor(data: ModelData, baseUrl: string) {
        super(data, baseUrl);
        this.fields = ["id", "marker", "financial_rating", "avg_cost", "covid_rating", "beds_available", "care_rating",
            "oxygen_rating", "ventilator_availability", "oxygen_availability", "icu_availability", "comment", "datef",
            "images", "day",]
        this.getData()
    }
}

export class PatientObject extends ModelObject {


    constructor(data: ModelData, baseUrl: string) {
        super(data, baseUrl);
        this.fields = ['id', 'Name', 'age', 'gender', 'address', 'symptoms', 'symdays', 'spo2', 'hospitalday', 'oxy_bed', 'covidresult',
            'hospitalpref', 'attendername', 'attenderphone', 'relation', 'srfid', 'bunum', 'blood', 'bedtype', 'ct',
            'ctscore']
        this.getData()
    }
}

export class susObject extends ModelObject {

    constructor(data: ModelData, baseUrl: string) {
        super(data, baseUrl);
        this.fields = ["id", "marker", "comment", "created_by", "datef"]
        this.getData()
    }
}

export const Review = new Model(baseUrl + '/api/review/', ReviewObject)
export const Sus = new Model(baseUrl + '/api/suspicious/', susObject)
export const Marker = new Model(baseUrl + '/api/marker/', MarkerObject)
export const Patient = new Model(baseUrl + '/api/patient/', PatientObject)

export type ModelRegistry =
    typeof MarkerObject
    |typeof ReviewObject
    |typeof susObject
    |typeof PatientObject
    |typeof ModelObject
