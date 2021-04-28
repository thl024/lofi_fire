// TODO setup all playback functionality here, export functionality here
import {AudioController} from "./audio/audio_controller";
import {ALL_KEYS, defaultColorChoices} from "../utils/constants";
import {audio_metadata} from "./audio_metadata";
import {v4 as uuidv4} from "uuid";
import {generatePayload, initializeEmptyData} from "../utils/utils";
import {
    addInstrument,
    deleteInstrument,
    editInstrument,
    onPlayBeat,
    reset,
    selectInstrument, setIndividualLoading,
    setLoading
} from "../redux/actions";
import {store} from "../redux/stores"
import {saveProjectState} from "../utils/network";

export class MainController {

    constructor(pid) {
        this.audioController = new AudioController(ALL_KEYS);
        this.pid = pid;

        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.refresh = this.refresh.bind(this);
        this.export = this.export.bind(this);

        this.updateBPM = this.audioController.updateBPM;
        this.onCreateInstrument = this.onCreateInstrument.bind(this);
        this.onEditInstrument = this.onEditInstrument.bind(this);
        this.onDeleteInstrument = this.onDeleteInstrument.bind(this);
        this.notifySingleNote = this.notifySingleNote.bind(this);

        this.numInstrumentsToLoad = 0;
        this.numInstrumentsLoaded = 0;
    }

    seedInstruments(projectData) {
        store.dispatch(setLoading(true));

        // No project id
        if (projectData === null) {
            this.onCreateInstrument(Object.keys(audio_metadata)[0], defaultColorChoices[0]);
        } else { // Project id included
            // Project details
            projectData.instruments.forEach((inst) => {
                this.onCreateInstrumentWithData(inst.name, inst.color, inst.data[0], inst.id);
            })
        }
    }

    // Creates a new instrument
    onCreateInstrument(instrumentName, instrumentColor) {
        this.onCreateInstrumentWithData(instrumentName, instrumentColor, initializeEmptyData(), uuidv4())
    }

    onCreateInstrumentWithData(instrumentName, instrumentColor, data, id) {
        this.numInstrumentsToLoad += 1;
        store.dispatch(setIndividualLoading(true));

        let newInstrument = {
            id: id,
            name: instrumentName,
            data: data,
            color: instrumentColor
        }

        // Load instrument
        this.audioController.loadInstrument(newInstrument, (err) => {
            if (err) {
                console.log("Failed to load instrument: " + instrumentName + "; " + err.toString());
            } else {
                // Notify redux of new instrument
                store.dispatch(addInstrument(newInstrument))
            }

            // Handle callbacks for loading
            this.numInstrumentsLoaded += 1;
            if (this.numInstrumentsLoaded === this.numInstrumentsToLoad) {
                console.log(store.getState())

                // Update redux with loading
                store.dispatch(setLoading(false));
                // store.dispatch(setIndividualLoading(false));
            }
        });
    }

    // Edit instrument
    onEditInstrument(index, instrumentName, instrumentColor) {
        this.audioController.stop();
        let state = store.getState();

        let editedInstrument = {
            id: state.ids[index],
            name: instrumentName,
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
        if (audio_metadata[state.names[state.selectedIndex]].instType !== "sfx" &&
            !data[noteIndex][timeIndex]) {
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
        this.seedInstruments(null);
    }

    export(callback, err_callback) {
        let state = store.getState();
        let instruments = []
        for (let i = 0; i < state.names.length; i++) {
            instruments.push({
                name: state.names[i],
                data: state.data[i],
                id: state.ids[i],
                color: state.colors[i],
            })
        }


        let projectPayload = {
            pid: this.pid,
            instruments: instruments,
        }

        saveProjectState(projectPayload).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })

        // saveProjectState(generatePayload(projectPayload), (res) => {
        //     // callback(res.pid);
        //     console.log(res);
        // }, (err) =>  {
        //     // err_callback(err)
        //     console.log(err)
        // });
    }
}