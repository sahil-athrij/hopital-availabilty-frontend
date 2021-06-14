export function queryCreator(base_path, dict) {
    let qs;
    qs = new URLSearchParams(dict).toString()
    console.log(qs)
    const path = `${base_path}?${qs}`;
    console.log(path)
    return path

}

export function localStoragetoQuery(base_path, list = []) {
    let dict;
    dict = {}
    list.map(element => {
        let item = localStorage.getItem(element)
        dict[element] = item
        console.log(element,item)
        return item
    })
    console.log(dict)

    return queryCreator(base_path, dict)
}

export function filterFormGetter(base_path) {
    let fields;
    fields = ['loc', 'query', 'oxyfr', 'oxyafr', 'ventfr', 'icufr', 'financialfr', 'price', 'carefr', 'covidfr']
    return localStoragetoQuery(base_path,fields)
}

