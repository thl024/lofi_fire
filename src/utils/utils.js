import {ALL_KEYS, NUM_MEASURES} from "./constants";

export function initializeEmptyData() {
    let midi = [];
    for (let i = 0; i < ALL_KEYS.length; i++) {
        let new_row = [];
        for (let j = 0; j < NUM_MEASURES * 4; j++)  {
            new_row.push(false);
        }
        midi.push(new_row);
    }
    return midi;
}