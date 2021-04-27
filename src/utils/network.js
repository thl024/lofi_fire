// TODO config
const BASE_URL = "http://localhost:8080"

export function getProjectState(pid) {
    return new Promise(function(resolve, reject) {
        fetch(BASE_URL + "/project?" + new URLSearchParams({
            pid: pid,
        }), {
            method: 'GET',
        })
            .then(res => res.json())
            .then(
                (result) => {resolve(result)},
                (error) => {reject(error)}
            )
    })
}

export function saveProjectState(payload) {
    return new Promise(function(resolve, reject) {
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
                    reject(new Error("Bad request; perhaps project ID is malformed"))
                } else if (result.status === 500) {
                    reject(new Error("Server error; contact dev"))
                } else {
                    try {
                        result.json().then(res => resolve(res));
                    } catch (e) {
                        reject(new Error("Server error; contact dev"))
                    }
                }
            },
            (error) => {reject(error)}
        )
    });
}

export function getAudioMetadata() {
    return new Promise(function(resolve, reject) {
        fetch(BASE_URL + "/sounds", {
            method: 'GET',
        })
            .then(res => res.json())
            .then(
                (result) => {resolve(result)},
                (error) => {reject(error)}
            )
    });
}

export function getAudio(id)  {
    return new Promise(function(resolve, reject) {
        fetch(BASE_URL + "/sound?" + new URLSearchParams({
            soundID: id,
        }), {
            method: 'GET',
        }).then(res => {return res.json()})
            .then(
                (result) => {resolve(result)},
                (error) => {reject(error)}
            )
    })
}