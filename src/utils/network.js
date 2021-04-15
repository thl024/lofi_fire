// TODO config
const BASE_URL = "http://localhost:8080"

export function getProjectState(pid, callback, err_callback) {
    fetch(BASE_URL + "/project?" + new URLSearchParams({
        pid: pid,
    }), {
        method: 'GET',
    })
        .then(res => res.json())
        .then(
            (result) => {callback(result)},
            (error) => {err_callback(error)}
        )
}

export function saveProjectState(payload, callback, err_callback) {
    fetch(BASE_URL + "/project", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    }).then((result) => {
            if (result.status === 400) {
                err_callback(new Error("Bad request; perhaps project ID is malformed?"))
            } else if (result.status === 500) {
                err_callback(new Error("Server error; contact dev"))
            } else {
                try {
                    result.json().then(res => callback(res));
                } catch (e) {
                    err_callback(new Error("Server error; contact dev"))
                }
            }
        },
        (error) => {err_callback(error)}
    )
}