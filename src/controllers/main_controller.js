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
        this.playSingleNote = this.playSingleNote.bind(this);

        store.subscribe(() => {
            // let pianoNoteHit = store.getState().instruments;
        })
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

    playSingleNote(i) {
        const state = store.getState();
        this.audioController.playSingleNote(state.ids[state.selectedIndex], i)
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
        store.dispatch(onPlayBeat(-1))

        // TODO dispatch play index update
        // this.setState((state) => {
        //     return {
        //         ...state,
        //         playIndex: -1
        //     }
        // });
    }

    clear() {
        // Reset state to default
        store.dispatch(reset())
    }

    refresh() {
        this.clear();

        // Initial instrument seed
        this.seedInitialInstruments();
    }

    export() {
        // TODO
    }

}