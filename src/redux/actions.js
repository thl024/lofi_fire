// Action types
export const MODAL_EXPORT = "modal/export"
export const MODAL_INSTRUMENT = "modal/instrument"

export const CHANGE_BPM = "bpm/changed";
export const INSTRUMENT_ADD = "instrument/new";
export const INSTRUMENT_EDIT = "instrument/edit";
export const INSTRUMENT_DELETE = "instrument/delete";
export const INSTRUMENT_SELECT = "instrument/select";
export const INSTRUMENT_REFRESH = "instrument/refresh";
export const TOGGLE_PIANO_ROLL_NOTE = "pianoroll/toggle";
export const ON_PLAY_BEAT = "onplay/beat";

export const RESET = "reset";
export const LOADING = "loading";
export const INDIV_LOADING = "indiv_loading";
export const SET_PID = "pid";

/**
 * Modal Actions
 */
export const changeExportModalState = content => ({
    type: MODAL_EXPORT,
    payload: content
})

export const changeInstrumentListModalState = content => ({
    type: MODAL_INSTRUMENT,
    payload: content
})

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
    type: INSTRUMENT_ADD,
    payload: content
})

export const editInstrument = content => ({
    type: INSTRUMENT_EDIT,
    payload: content
})

export const deleteInstrument = content => ({
    type: INSTRUMENT_DELETE,
    payload: content
});

export const selectInstrument = content => ({
    type: INSTRUMENT_SELECT,
    payload: content
})

export const refreshInstrument = content => ({
    type: INSTRUMENT_REFRESH,
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
export const setPid = content => ({
    type: SET_PID,
    payload: content
})

export const reset = content => ({
    type: RESET,
    payload: null
})

export const setLoading = content => ({
    type: LOADING,
    payload: content
})

export const setIndividualLoading = content => ({
    type: INDIV_LOADING,
    payload: content
})