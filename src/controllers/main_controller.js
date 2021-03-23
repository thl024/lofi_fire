// TODO setup all playback functionality here, export functionality here
import {AudioController} from "./audio/audio_controller";
import {ALL_KEYS, defaultColorChoices} from "../utils/constants";
import {instrument_mappings} from "../instrument_mappings";
import {v4 as uuidv4} from "uuid";
import {initializeEmptyData} from "../utils/utils";
import {addInstrument, deleteInstrument, editInstrument, onPlayBeat, reset, selectInstrument} from "../redux/actions";
import {store} from "../redux/stores"

export class MainController {

    constructor() {
        this.audioController = new AudioController(ALL_KEYS);
        this.instrumentMappings = instrument_mappings;

        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.refresh = this.refresh.bind(this);
        this.export = this.export.bind(this);

        this.updateBPM = this.audioController.updateBPM;
        this.onCreateInstrument = this.onCreateInstrument.bind(this);
        this.onEditInstrument = this.onEditInstrument.bind(this);
        this.onDeleteInstrument = this.onDeleteInstrument.bind(this);
        this.notifySingleNote = this.notifySingleNote.bind(this);
    }

    seedInitialInstruments() {
        this.onCreateInstrument(Object.keys(instrument_mappings)[0], defaultColorChoices[0]);
    }

    // Creates a new instrument
    onCreateInstrument(instrumentName, instrumentColor) {
        let newInstrument = {
            id: uuidv4(),
            name: instrumentName,
            src: this.instrumentMappings[instrumentName].src,
            instType: this.instrumentMappings[instrumentName].instType,
            fileType: this.instrumentMappings[instrumentName].fileType,
            data: initializeEmptyData(),
            color: instrumentColor
        }

        // Load instrument
        this.audioController.loadInstrument(newInstrument, (err) => {
            if (err) {
                console.log("Failed to load instrument: " + instrumentName + "; " + err.toString());
                return;
            }

            // Notify redux of new instrument
            store.dispatch(addInstrument(newInstrument))
        });
    }

    // Edit instrument
    onEditInstrument(index, instrumentName, instrumentColor) {
        this.audioController.stop();
        let state = store.getState();

        let editedInstrument = {
            id: state.ids[index],
            name: instrumentName,
            src: this.instrumentMappings[instrumentName].src,
            instType: this.instrumentMappings[instrumentName].instType,
            fileType: this.instrumentMappings[instrumentName].fileType,
            data: state.data[index],
            color: instrumentColor
        }

        this.audioController.unloadInstrument(state.ids[index])

        // Load instrument
        this.audioController.loadInstrument(editedInstrument, (err) => {
            if (err) {
                console.log("Failed to load instrument: " + instrumentName + "; " + err.toString());
                return;
            }

            // Notify redux of edited instrument
            editedInstrument.index = index;
            store.dispatch(editInstrument(editedInstrument))
        });
    }

    onDeleteInstrument(index) {
        let state = store.getState();

        if (state.ids.length <= 1) {
            return;
        }

        // Quit audio before deleting an instrument
        this.audioController.stop();
        this.audioController.unloadInstrument(state.ids[index]);

        // Fix indices
        if (state.selectedIndex === index) {
            if (index !== 0) {
                store.dispatch(selectInstrument(index - 1));
            }
        }
        store.dispatch(deleteInstrument(index))
    }

    notifySingleNote(noteIndex, timeIndex) {
        const state = store.getState();
        const data = state.data[state.selectedIndex];
        const id = state.ids[state.selectedIndex];
        // Play single note if turned on
        if (!data[noteIndex][timeIndex]) {
            this.audioController.playSingleNote(id, noteIndex)
        }

        // Notify audio controller that a new note has been added, so that it may update audio player w/ new data
        this.audioController.notifyNoteChanged(id, noteIndex, timeIndex);
    }

    // TODO think about just using audio controller for the playback stuff
    play() {
        // Play is an asynchronous operation, require callback to retrieve tick information
        const state = store.getState();

        store.dispatch(onPlayBeat(-1));

        // TODO -- should be no need to pass in state vars, audio controller should have them
        this.audioController.play(state.bpm, state.ids, state.data, (index) => {
            // Callback called on every tick, set play index
            store.dispatch(onPlayBeat(index));
        });
    }

    stop() {
        this.audioController.stop();
        store.dispatch(onPlayBeat(-1));
    }

    clear() {
        // Reset state to default
        store.dispatch(reset())
    }

    refresh() {
        let state = store.getState();
        state.ids.forEach((id => {
            this.audioController.unloadInstrument(id)
        }));

        this.clear();

        // Initial instrument seed
        this.seedInitialInstruments();
    }

    export() {
        // TODO
    }
}