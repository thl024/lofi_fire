// Action types
export const CHANGE_BPM = "bpm/changed";
export const ADD_INSTRUMENT = "instrument/new";
export const SELECT_INSTRUMENT = "instrument/select";
export const REFRESH_INSTRUMENT = "instrument/refresh";
export const TOGGLE_PIANO_ROLL_NOTE = "pianoroll/toggle";
export const ON_PLAY_BEAT = "onplay/beat";

export const RESET = "reset";

/**
 * Playback Actions
 */
export const changeBPM = content => ({
    type: CHANGE_BPM,
    payload: content
})

/**
 * Instrument Actions
 */
export const addInstrument = content => ({
    type: ADD_INSTRUMENT,
    payload: content
})

export const selectInstrument = content => ({
    type: SELECT_INSTRUMENT,
    payload: content
})

export const refreshInstrument = content => ({
    type: REFRESH_INSTRUMENT,
    payload: content
})

/**
 * Piano roll actions
 */
export const onTogglePianoRollNote = content => ({
    type: TOGGLE_PIANO_ROLL_NOTE,
    payload: content
})

export const onPlayBeat = content => ({
    type: ON_PLAY_BEAT,
    payload: content
})

/**
 * All use actions
 */
export const reset = content => ({
    type: RESET,
    payload: null
})