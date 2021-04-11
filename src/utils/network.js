// TODO config
const BASE_URL = "http://localhost:8080"

export function getProjectState(pid, callback, err_callback) {
    fetch(BASE_URL + "/project", {
        method: 'GET',
    })
        .then(res => res.json())
        .then(
            (result) => {callback(result)},
            (error) => {err_callback(error)}
        )
}

export function saveProjectState(payload, callback, err_callback) {
    console.log(JSON.stringify(payload))
    fetch(BASE_URL + "/project", {
        method: 'POST',
        body: JSON.stringify(payload),
    })
        .then(res => res.json())
        .then(
            (result) => {callback(result)},
            (error) => {err_callback(error)}
        )
}