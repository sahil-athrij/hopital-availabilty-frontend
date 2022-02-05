import {getAuth} from "./auth";
import {ModelRegistry} from "./model";

export const baseUrl = process.env.BASE_URL;


export async function get(url: string, kwargs = {}, headers = {})
{
    const response = await fetch(url + "?" + new URLSearchParams(kwargs),
        {
            headers: {
                ...headers
            }
        }
    );
    if (response.status > 300)
    
        throw (response);
    
    else
    {

        console.log(response);
        return response.json();
    }
}

export async function post(url: RequestInfo, kwargs = {}, headers = {})
{
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: JSON.stringify(kwargs)
    }
    );
    if (response.status > 300)
    
        throw (response);
    
    else
    {

        console.log(response);
        return response.json();
    }
}

export async function filePost(url: RequestInfo, formData: FormData, headers = {})
{
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            ...headers
        },
        body: formData
    }
    );
    if (response.status > 300)
    
        throw (response);
    
    else
    {
        console.log(response);
        return response.json();
    }
}


export async function filePatch(url: RequestInfo, formData: FormData, headers = {})
{
    const response = await fetch(url, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        headers: {
            ...headers
        },
        body: formData
    });

    if (response.status > 300)
        throw (response);
    else
        return response.json();
}


export async function patch(url: RequestInfo, kwargs = {}, headers = {})
{
    const response = await fetch(url, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: JSON.stringify(kwargs)
    }
    );
    if (response.status > 300)
    
        throw (response);
    
    else
    {

        console.log(response);
        return response.json();
    }
}

export interface ModelData
{
    [key: string]: number | string,
}


export class ModelObject
{
    data;
    baseUrl;
    id: number;
    fields: string[] = ["id"];

    constructor(data: ModelData, baseUrl: string)
    {
        this.data = data;
        this.id = data.id as number;
        this.baseUrl = baseUrl;

    }

    getData()
    {
        for (const item of this.fields)
            (this as Record<string, unknown>)[item] = this.data[item];
    }

    setData()
    {
        for (const item of this.fields)
            this.data[item] = (this as unknown as Record<string, string | number>)[item];
    }

    save = async () =>
    {
        this.setData();
        const headers = {"Authorization": `Bearer ${getAuth()}`};
        return patch(`${this.baseUrl}${this.id}/`, this.data, headers);
    };

    modify = async (path: string, data = this.data) =>
    {
        try
        {
            this.setData();
            const headers = {"Authorization": `Bearer ${getAuth()}`};
            return await post(`${this.baseUrl}${this.id}/${path}`, data, headers);
        }
        catch (e)
        {
            throw await (e as { json: () => Promise<unknown> }).json();
        }

    };

}


export default class Model
{
    baseurl: string;
    modelClass: ModelRegistry;

    constructor(baseUrl: string, modelClass: ModelRegistry)
    {
        this.baseurl = baseUrl;
        this.modelClass = modelClass;
    }


    get = async (id: number | string, kwargs: Record<string, unknown> = {}, auth = false) =>
    {
        let headers = {};

        if (auth)
        
            headers = {"Authorization": `Bearer ${getAuth()}`};
        


        const data = await get(`${this.baseurl}${id}/`, kwargs, headers);
        return new this.modelClass(data, this.baseurl);

    };

    filter = async (kwargs = {}, auth = false) =>
    {
        try
        {
            let headers = {};

            if (auth)
            
                headers = {"Authorization": `Bearer ${getAuth()}`};
            


            const data = await get(`${this.baseurl}`, kwargs, headers);
            const lst = data.results.map((item: ModelData) => new this.modelClass(item, this.baseurl));
            return {results: lst, next: data.next};
        }
        catch (e)
        {
            throw e;
        }
    };
    /*path doesn't need /
    * */
    action_general = async (path: string, kwargs = {}, auth = false) =>
    {
        try
        {
            let headers = {};
            if (auth)
                headers = {"Authorization": `Bearer ${getAuth()}`};

            const data = await get(`${this.baseurl}${path}`, kwargs, headers);
            const lst = data.results.map((item: ModelData) => new this.modelClass(item, this.baseurl));

            return {results: lst, next: data.next};
        }
        catch (e)
        {
            throw e;
        }
    };


    /**
     * @param {{}} kwargs
     */
    async create(kwargs = {})
    {
        try
        {
            const headers = {"Authorization": `Bearer ${getAuth()}`};
            const data = await post(`${this.baseurl}`, kwargs, headers);
            return new this.modelClass(data, this.baseurl);
        }
        catch (e)
        {
            throw await (e as { json: () => Promise<unknown> }).json();
        }
    }

    async action_post(path: string, kwargs = {})
    {
        try
        {
            const headers = {"Authorization": `Bearer ${getAuth()}`};
            const data = await post(`${this.baseurl}${path}`, kwargs, headers);
            return new this.modelClass(data, this.baseurl);
        }
        catch (e)
        {
            throw await (e as { json: () => Promise<unknown> }).json();
        }
    }

}

