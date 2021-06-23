export function getQueryVariable(variable) {
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

export function getParam(param, default_value = '', get_query = false) {
    if (get_query) {

        let qs = getQueryVariable(param)
        console.log(qs)
        if (qs) {
            localStorage.setItem(param, qs)
        }
    }

    return localStorage.getItem(param) === default_value ? '' : localStorage.getItem(param) || ''
}


export function setParam(param, value, default_value = '') {
    if (value) {
        localStorage.setItem(param, value)
    } else {
        localStorage.setItem(param, default_value)

    }
}
