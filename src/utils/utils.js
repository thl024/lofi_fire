import {ALL_KEYS, NUM_MEASURES} from "./constants";

export function initializeEmptyData() {
    let midi = [];
    for (let i = 0; i < ALL_KEYS.length; i++) {
        let new_row = [];
        for (let j = 0; j < NUM_MEASURES * 4; j++)  {
            new_row.push(0);
        }
        midi.push(new_row);
    }
    return midi;
}

export function generatePayload(projectPayload) {
    let convertedPayload = {instruments: []};
    if (projectPayload.pid !== undefined && projectPayload.pid !== null) {
        convertedPayload.pid = projectPayload.pid;
    }
    for (let i = 0; i < projectPayload.names.length; i++) {
        let newInst = {
            name: projectPayload.names[i],
            color: projectPayload.colors[i],
            data: projectPayload.data[i],
            id: projectPayload.ids[i]
        };
        convertedPayload.instruments.push(newInst);
    }
    return convertedPayload;
}
//
// export function convertResponse(projectResponse) {
//     let convertedPayload = {names: [], colors: [], data: [], ids: []};
//     for (let i = 0; i < projectResponse.instruments.length; i++) {
//         convertedPayload.names.push(projectResponse.instruments[i].name);
//         convertedPayload.colors.push(projectResponse.instruments[i].color);
//         convertedPayload.data.push(projectResponse.instruments[i].data);
//         convertedPayload.ids.push(projectResponse.instruments[i].id);
//     }
//     return convertedPayload;
// }