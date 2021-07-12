export function getQueryVariable(variable: string) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return false;
}

export function getParam<T1>(param: string, default_value: T1 | string = '', get_query: boolean = false) {
    if (get_query) {
        let qs = getQueryVariable(param)
        if (typeof qs === 'string') {
            qs = qs.replace(/[+]/g, ' ')
        }
        if (qs) {
            localStorage.setItem(param, qs)
        }
    }
    let value: string;
    if (localStorage.getItem(param)) {
        value = localStorage.getItem(param) as string;
    } else {
        value = '';
    }

    return localStorage.getItem(param) === default_value ? '' : value
}


export function setParam(param: string, value: string, default_value: string = '') {
    if (value) {
        localStorage.setItem(param, value)
    } else {
        localStorage.setItem(param, default_value)

    }
}
