// TODO setup all playback functionality here, export functionality here
import {AudioController} from "./audio/audio_controller";
import {ALL_KEYS} from "../utils/constants";
import {instrument_mappings} from "../utils/instrument_mappings";
import {v4 as uuidv4} from "uuid";
import {initializeEmptyData} from "../utils/utils";
import {addInstrument, onPlayBeat, reset} from "../redux/actions";
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
        this.notifySingleNote = this.notifySingleNote.bind(this);
    }

    seedInitialInstruments() {
        this.onCreateInstrument("Grand Piano", "#fec8c1");
        this.onCreateInstrument("Nylon Guitar", "#fad9c1");
        this.onCreateInstrument("Lofi Kick 1", "#ffefd7");
        this.onCreateInstrument("Lofi Hat 1", "#dcedc1");
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
        state.names.forEach((name => {
            this.audioController.unloadInstrument(name)
        }));

        this.clear();

        // Initial instrument seed
        this.seedInitialInstruments();
    }

    export() {
        // TODO
    }
}