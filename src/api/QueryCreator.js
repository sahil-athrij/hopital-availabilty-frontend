export function queryCreator(base_path, dict) {
    let qs;
    qs = new URLSearchParams(dict).toString()
    console.log(qs)
    const path = `${base_path}?${qs}`;
    console.log(path)
    return path

}

export function localStoragetoDict(list){
    let dict;
    dict = {}
    list.map(element => {
        let item = localStorage.getItem(element)
        dict[element] = item
        console.log(element, item)
        return item
    })
    return dict
}
export function localStoragetoQuery(base_path, list = []) {
    let dict;
    dict = localStoragetoDict(list)


    return queryCreator(base_path, dict)
}

export function filterFormGetter(base_path) {
    let fields;
    fields = ['loc', 'query', 'oxyfr', 'oxyafr', 'ventfr', 'icufr', 'financialfr', 'price', 'carefr', 'covidfr']
    return localStoragetoQuery(base_path, fields)
}


export function reviewModelDict() {

    let translator;
    translator = {
        financial_rating__gte: 'financialfr',
        avg_cost__gte: 'price-min',
        avg_cost__lte: 'price-max',
        covid_rating__gte: 'covidfr',
        care_rating__gte: 'carefr',
        oxygen_rating__gte: 'oxyfr',
        ventilator_availability__gte: 'ventfr',
        oxygen_availability__gte: 'oxyafr',
        icu_availability__gte: 'icufr',
        search: 'query',
    }
    let dict;
    dict = {}
}