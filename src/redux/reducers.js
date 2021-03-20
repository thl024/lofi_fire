// Setup initial state
import {
    ADD_INSTRUMENT,
    CHANGE_BPM, ON_PLAY_BEAT,
    REFRESH_INSTRUMENT,
    RESET,
    SELECT_INSTRUMENT,
    TOGGLE_PIANO_ROLL_NOTE
} from "./actions";
import {initializeEmptyData} from "../utils/utils";

// Initial state of the application
const initialState = {
    bpm: 80,
    selectedIndex: 0,
    playIndex: -1,

    // Instrument objects are split into many fields to allow for different components to access different fields
    // This reduces potential lag from over re-rendering
    // instruments: [],
    ids: [],
    names: [],
    // srcs: [],
    // instTypes: [],
    // fileTypes: [],
    data: [],
    colors: []
}

// Use the initialState as a default value
// TODO -- read something about combined reducers, look into that
export default function appReducer(state = initialState, action) {
    let data, ids, names, colors;
    switch (action.type) {
        /**
         * Instrument Actions
         */
        case ADD_INSTRUMENT:
            // const instruments = [...state.instruments, action.payload]
            ids = [...state.ids, action.payload.id]
            names = [...state.names, action.payload.name]
            data = [...state.data, action.payload.data]
            colors = [...state.colors, action.payload.color]

            return {
                ...state,
                ids: ids,
                names: names,
                data: data,
                colors: colors
            };
        case SELECT_INSTRUMENT:
            return {
                ...state,
                selectedIndex: action.payload
            }
        case REFRESH_INSTRUMENT:
            let emptyData = initializeEmptyData();
            data = [...state.data]
            data[action.payload] = emptyData

            //Set new data
            return {
                ...state,
                data: data
            }

        /**
         * Playback actions
         */
        case CHANGE_BPM:
            return {
                ...state,
                bpm: action.payload
            }

        /**
         * Piano roll actions
         */
        case TOGGLE_PIANO_ROLL_NOTE:
            let row_index = action.payload.i;
            let col_index = action.payload.j;

            let currentData = state.data[state.selectedIndex]

            // Change instrument data state
            let newData = currentData.map((row, i) =>
                row.map((val, j) => {
                    if (i === row_index && j === col_index) {
                        return !val
                    }
                    return val;
                })
            )

            data = [...state.data];
            data[state.selectedIndex] = newData;

            //Set new data
            return {
                ...state,
                data: data
                // instruments: state.instruments.map(
                //     (el, index) => index === state.selectedIndex? { ...el, data: newData }: el
                // )
            }

        case ON_PLAY_BEAT:
            return {
                ...state,
                playIndex: action.payload
            }

        /**
         * All use reducers
         */
        case RESET:
            return initialState

        default:
            return state;
    }
}