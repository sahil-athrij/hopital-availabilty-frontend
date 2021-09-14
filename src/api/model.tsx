import Model, {baseUrl, filePost, ModelData, ModelObject} from "./api";
import {getAuth} from "./auth";

interface ImageObject {
    hospital: number
    image: string
    review: number | null
    useinmarker: boolean
}

export class MarkerObject extends ModelObject {
    lng: any;
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
    images?: ImageObject[]
    ventilator_availability: number = 0;
    lat: any;
    doctors : DoctorObject[] = [];
    about: string | undefined;
    departments: Array<DepartmentObject> = [];

    constructor(data: ModelData, baseUrl: string) {

        super(data, baseUrl);
        this.fields = ["id", "Phone", "size", "financial_rating", "avg_cost", "covid_rating", "beds_available", "care_rating",
            "oxygen_rating", "ventilator_availability", "oxygen_availability", "icu_availability", "lat", "lng", "images",
            "display_address", "name", "datef", 'address', 'comment', 'departments']
        this.getData()

    }

    async addPhoto(file: File) {
        const formData = new FormData();


        formData.append(
            "image",
            file,
            file.name
        );
        formData.append(
            'hospital',
            this.id.toString()
        )
        let headers = {'Authorization': `Bearer ${getAuth()}`}

        return await filePost(baseUrl + '/api/image/', formData, headers)
    }


}
export class Comment extends ModelObject {
    id =-1;
    marker = -1;
    financial_rating = -1;
    avg_cost = -1;
    covid_rating = -1;
    care_rating	 = -1;
    oxygen_rating = -1;
    beds_available = -1;
    size= -1;
    oxygen_availability: number = 0;
    ventilator_availability =-1;
    icu_availability: number = 0;
    comment:string ="";
    written_by: number =-1;
    written_by_name="";
    images?: ImageObject[];
    datef : string = "";

    constructor(data: ModelData, baseUrl: string) {

        super(data, baseUrl);
        this.fields = ['id', 'marker', 'financial_rating', 'avg_cost', 'covid_rating', 'care_rating', 'oxygen_rating',
        'beds_available', 'size', 'ventilator_availability', 'oxygen_availability',
        'icu_availability', 'comment', 'written_by', 'images', 'written_by_name', 'datef']
        this.getData()

    }



}
export class DepartmentObject extends ModelObject {
    name: { id: number, name: string | undefined } = {id: -1, name: undefined};
    x = -1;
    y = -1;
    hospital = -1;
    images: Array<{ image: string, useinmarker: boolean, hospital: number, review: number }> = [];
    doctors: Array<DoctorObject> = [];
    name_id = -1;

    constructor(data: ModelData, baseUrl: string) {

        super(data, baseUrl);
        this.fields = ['name', 'x', 'y', 'hospital', 'images', 'doctors', 'name_id']
        this.getData()

    }

    async addPhoto(file: File) {
        const formData = new FormData();


        formData.append(
            "image",
            file,
            file.name
        );
        formData.append(
            'hospital',
            this.id.toString()
        )
        let headers = {'Authorization': `Bearer ${getAuth()}`}

        return await filePost(baseUrl + '/api/image/', formData, headers)
    }


}

export class DoctorObject extends ModelObject {
    id: number = -1;
    name: string | undefined;
    phone_number: number = -1;
    hospital: Array<number> = [];
    departments: Array<number> = [];
    user: number = -1;
    working_time: string | undefined;
    rating: number = -1;
    reviews: [] = [];
    patients: number = -1;
    experience: number = -1;
    specialization: string | undefined;
    about: string | undefined;
    image: { uri: string | undefined } = {uri: undefined};

    constructor(data: ModelData, baseUrl: string) {
        super(data, baseUrl);
        this.fields = ['id', 'name', 'phone_number', 'hospital', 'department', 'user', 'working_time',
            'rating', 'reviews', 'patients', 'experience', 'specialization', 'about', 'image'];
        this.getData();
    }

    // async addPhoto(file: File) {
    //     const formData = new FormData();
    //
    //
    //     formData.append(
    //         "image",
    //         file,
    //         file.name
    //     );
    //     formData.append(
    //         'hospital',
    //         this.id.toString()
    //     )
    //     let headers = {'Authorization': `Bearer ${getAuth()}`}
    //
    //     return await filePost(baseUrl + '/api/image/', formData, headers)
    // }


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
    Name: string = '';
    age: number = 0;
    gender: string = 'M';
    address: string = '';
    symptoms: string = '';
    covidresult: boolean = false;
    gender_name: string = '';
    symdays: string = '';
    spo2: number = 0;
    bedtype_name: string = '';
    blood: string = '';
    ct: boolean = false;
    ctscore: string = '';

    constructor(data: ModelData, baseUrl: string) {
        super(data, baseUrl);
        this.fields = ['id', 'Name', 'age', 'gender', 'address', 'symptoms', 'symdays', 'spo2', 'hospitalday', 'oxy_bed', 'covidresult',
            'hospitalpref', 'attendername', 'attenderphone', 'relation', 'srfid', 'bunum', 'blood', 'bedtype', 'ct',
            'ctscore', 'gender_name', 'bedtype_name']
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
export const Department = new Model(baseUrl + '/internals/departments/', DoctorObject)
export const Marker = new Model(baseUrl + '/api/marker/', MarkerObject)
export const Doctor = new Model(baseUrl + '/internals/doctors/', DoctorObject)
export const Patient = new Model(baseUrl + '/api/patient/', PatientObject)

export type ModelRegistry =
    typeof MarkerObject
    | typeof ReviewObject
    | typeof susObject
    | typeof PatientObject
    | typeof ModelObject

