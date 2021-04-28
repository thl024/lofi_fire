// Setup initial state
import {
    ADD_INSTRUMENT,
    CHANGE_BPM, DELETE_INSTRUMENT, EDIT_INSTRUMENT, INDIV_LOADING, LOADING,
    ON_PLAY_BEAT,
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
    loading: false,
    indivLoading: false,

    // Instrument objects are split into many fields to allow for different components to access different fields
    // This reduces potential lag from over re-rendering
    // instruments: [],
    ids: [],
    names: [],
    data: [],
    colors: [],
}

// Use the initialState as a default value
// TODO -- read something about combined reducers, look into that
export default function appReducer(state = initialState, action) {
    let data, ids, names, colors, index;
    switch (action.type) {
        /**
         * Instrument Actions
         */
        case ADD_INSTRUMENT:
            // const instruments = [...state.instruments, action.payload]
            ids = [...state.ids, action.payload.id]
            names = [...state.names, action.payload.name]
            data = [...state.data, action.payload.data]

            console.log(data);
            colors = [...state.colors, action.payload.color]

            return {
                ...state,
                ids: ids,
                names: names,
                data: data,
                colors: colors
            };

        case EDIT_INSTRUMENT:
            index = action.payload.index;
            names = [...state.names]
            colors = [...state.colors]

            names[index] = action.payload.name;
            colors[index] = action.payload.color;

            return {
                ...state,
                names: names,
                colors: colors
            };

        case DELETE_INSTRUMENT:
            ids = [...state.ids]
            names = [...state.names]
            data = [...state.data]
            colors = [...state.colors]

            ids.splice(action.payload, 1);
            names.splice(action.payload, 1);
            data.splice(action.payload, 1);
            colors.splice(action.payload, 1);

            return {
                ...state,
                ids: ids,
                names: names,
                data: data,
                colors: colors
            }

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
                        return (val + 1) % 2
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

        case LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case INDIV_LOADING:
            return {
                ...state,
                indivLoading: action.payload
            }

        default:
            return state;
    }
}