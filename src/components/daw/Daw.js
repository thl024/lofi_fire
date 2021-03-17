import React from 'react';
import {ControlBar} from "./control_bar/ControlBar";
import {InstrumentPicker} from "./instrument_picker/InstrumentPicker";
import {PianoRoll} from "./piano_roll/PianoRoll";
import './Daw.css';
import {AudioController} from "../../audio/AudioController";
import {instrumentMappings} from "./InstrumentMappings";
import { v4 as uuidv4 } from 'uuid';

// Helpers to initialize DAW state
const ALL_KEYS = initializeNotes();
const NUM_MEASURES = 8;
const initialState = {
    bpm: 130,
    selectedIndex: 0,

    // TODO rename this to instrument ids
    // Unfortunately, react does not work well with objects as states, therefore we must split these
    // instrumentIds: [],
    // instrumentData: [],
    // instrumentTypes: [],


    // Contains Name, Data, Type, & Src
    instruments: []
}
function initializeNotes() {
    const notes = ["B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C"]
    const noteRange = [4];

    const allNotes = [];
    noteRange.forEach(octave => {notes.forEach(note => {
        allNotes.push(note+octave);
    })})
    allNotes.unshift("C5")
    return allNotes
}
// function packageTracks(instrumentIds, instrumentNames, instrumentData, instrumentTypes) {
//     let tracks = [];
//     for (let i = 0; i < instrumentIds.length; i++) {
//         tracks.push({
//             "id":  instrumentIds[i],
//             "name": instrumentNames[i],
//             "data": instrumentData[i],
//             "type": instrumentTypes[i]
//         });
//     }
//     return tracks;
// }

// Coordinates the playback control bar with the playlist & instruments
export class Daw extends React.Component {

    constructor(props) {
        super(props);

        // Initialize DAW State
        this.state = initialState;
        this.instrumentMappings = instrumentMappings;
        this.audioController = new AudioController(ALL_KEYS);

        // Bindings
        this.onSelectInstrument = this.onSelectInstrument.bind(this);
        this.onClickPianoRoll = this.onClickPianoRoll.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.updateBPM = this.updateBPM.bind(this);
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.refresh = this.refresh.bind(this);
        this.export = this.export.bind(this);
    }

    // Initialize instrument on page load
    componentDidMount() {
        this.seedInitialInstruments();
    }

    seedInitialInstruments() {
        this.onCreateInstrument("Grand Piano");
        this.onCreateInstrument("Nylon Guitar");
    }

    play() {
        this.audioController.play(this.state.bpm, this.state.instruments)
    }

    stop() {
        this.audioController.stop();
    }

    refresh() {
        // Reset state to default
        this.setState(state => {
            return initialState;
        });

        // Initial instrument seed
        this.seedInitialInstruments();
    }

    export() {
        // TODO
    }

    onMouseMove() {
        this.audioController.resume();
    }

    // Updates the BPM
    updateBPM = () => (render, handle, value, un, percent) => {
        this.setState({
            "bpm": value[0]
        });
    };

    initializeEmptyData() {
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

    // TODO more params
    // Creates a new instrument
    onCreateInstrument(instrumentName) {
        let newInstrument = {
            "id": uuidv4(),
            "name": instrumentName,
            "src": this.instrumentMappings[instrumentName].src,
            "instType": this.instrumentMappings[instrumentName].instType,
            "fileType": this.instrumentMappings[instrumentName].fileType,
            "data": this.initializeEmptyData()
        }

        // Load instrument
        this.audioController.loadInstrument(newInstrument, (err) => {
            if (err) {
                console.log("Failed to load instrument: " + instrumentName + "; " + err.toString());
                return;
            }
            // Change state
            this.setState(state => {
                const instruments = [...state.instruments, newInstrument]

                return {
                    ...state,
                    instruments: instruments
                };
            });
        });
    }

    // Puts focus on the selected instrument
    onSelectInstrument(index) {
        this.setState(state => {
            return {
                ...state,
                selectedIndex: index
            }
        })
    }

    // TODO more params - edit color
    onEditInstrument(index) {

    }

    // Clears the data for a given instrument
    onResetInstrument(index) {

    }

    // Deletes an instrument
    onDeleteInstrument(index) {

    }

    onClickPianoRoll(row_index, col_index) {
        let currentInstrument = this.state.instruments[this.state.selectedIndex]

        // Play note if enabling note
        if (!currentInstrument.data[row_index][col_index]){
            // TODO -- intermediary between audio player and daw to translate indices to note names
            this.audioController.playSingleNote(currentInstrument, row_index);
        }

        // Change instrument data state
        this.setState(state => {
            let newData = currentInstrument.data.map((row, i) =>
                row.map((val, j) => {
                    if (i === row_index && j === col_index) {
                        return !val
                    }
                    return val;
                })
            )

            //Set new data
            return {
                ...state,
                instruments: state.instruments.map(
                    (el, index) => index === state.selectedIndex? { ...el, data: newData }: el
                )
            }
        })
    }

    render() {
        return <div onClick={this.onMouseMove}>
            <ControlBar updateBPM={this.updateBPM}
                        bpm={this.state.bpm}
                        play={this.play}
                        stop={this.stop}
                        refresh={this.refresh}
                        export={this.export} />
            <br />
            <div className="playlist-wrapper">
                <InstrumentPicker instruments={this.state.instruments}
                                  selectedIndex={this.state.selectedIndex}
                                  onSelectInstrument={this.onSelectInstrument} />
                <PianoRoll
                    data={this.state.instruments.length > 0 ?
                        this.state.instruments[this.state.selectedIndex].data:null}
                    onClickPianoRoll={this.onClickPianoRoll}
                    numKeys={ALL_KEYS.length}
                    numMeasures={NUM_MEASURES} />
            </div>

        </div>
    }
}