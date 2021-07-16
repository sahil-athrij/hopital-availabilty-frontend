import {getAuth} from "./auth";
import {ModelRegistry} from "./model";

export const baseUrl = "https://needmedi.com"
// export const baseUrl = "http://127.0.0.1:8000"


export async function get(url: string, kwargs = {}, headers = {}) {
    const response = await fetch(url + "?" + new URLSearchParams(kwargs),
        {
            headers: {
                ...headers
            }
        }
    );
    if (response.status > 300) {
        throw (response)
    } else {

        console.log(response)
        return response.json()
    }
}

export async function post(url: RequestInfo, kwargs = {}, headers = {}) {
    const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(kwargs)
        }
    );
    if (response.status > 300) {
        throw (response)
    } else {

        console.log(response)
        return response.json()
    }
}

export async function filePost(url: RequestInfo, formData: FormData, headers = {}) {
    const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                ...headers
            },
            body: formData
        }
    );
    if (response.status > 300) {
        throw (response)
    } else {
        console.log(response)
        return response.json()
    }
}


export async function patch(url: RequestInfo, kwargs = {}, headers = {}) {
    const response = await fetch(url, {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(kwargs)
        }
    );
    if (response.status > 300) {
        throw (response)
    } else {

        console.log(response)
        return response.json()
    }
}

export interface ModelData {
    [key: string]: number | string,
}


export class ModelObject {
    data;
    baseUrl;
    id: number;
    fields: string[] = ['id'];
    excluded_fields: string[] = [];

    constructor(data: ModelData, baseUrl: string) {
        this.data = data
        this.id = data.id as number
        this.baseUrl = baseUrl

    }

    getData() {
        let self = this
        this.fields.forEach(item => {
            //TODO: Fix TS ignore
            // @ts-ignore
            self[item] = self.data[item]
        })
    }

    setData() {
        let self = this
        this.fields.forEach(item => {
            //TODO: Fix TS ignore
            // @ts-ignore
            self.data[item] = self[item]
        })
    }

    save = async () => {
        this.setData()
        let headers = {'Authorization': `Bearer ${getAuth()}`}
        return patch(`${this.baseUrl}${this.id}/`, this.data, headers)
    }

}


export default class Model {
    baseurl: string;
    modelClass: ModelRegistry;

    constructor(baseUrl: string, modelClass: ModelRegistry) {
        this.baseurl = baseUrl
        this.modelClass = modelClass
    }


    get = async (id: number | string, kwargs: {} = {}) => {
        let data = await get(`${this.baseurl}${id}/`, kwargs)
        return new this.modelClass(data, this.baseurl)

    };

    filter = async (kwargs = {}) => {
        try {
            let data = await get(`${this.baseurl}`, kwargs)
            //TODO: add return type
            let lst: any[];
            lst = [];
            data.results.forEach((item: ModelData) => {
                let obj = new this.modelClass(item, this.baseurl)
                lst.push(obj)
            })
            return {results: lst, next: data.next}
        } catch (e) {
            let errors;
            errors = e
            console.log(errors)
            throw errors

        }
    };

    /**
     * @param {{}} kwargs
     */
    async create(kwargs = {}) {
        try {
            let headers = {'Authorization': `Bearer ${getAuth()}`}
            let data = await post(`${this.baseurl}`, kwargs, headers)
            return new this.modelClass(data, this.baseurl)
        } catch (e) {
            let errors;
            errors = await e.json()
            console.log(errors)
            throw errors

        }
    }

}

