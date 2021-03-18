import React from 'react';
import {ControlBar} from "./control_bar/ControlBar";
import {InstrumentPicker} from "./instrument_picker/InstrumentPicker";
import {PianoRoll} from "./piano_roll/PianoRoll";
import {AudioController} from "../../audio/AudioController";
import {instrumentMappings} from "./InstrumentMappings";
import { v4 as uuidv4 } from 'uuid';
import './Daw.css';

// Helpers to initialize DAW state
// TODO move helpers to new file
const ALL_KEYS = initializeNotes();
const NUM_MEASURES = 8;
const initialState = {
    bpm: 80,
    selectedIndex: 0,
    playIndex: -1,

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
function initializeEmptyData() {
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

// Main controller, manages data flow between all children
// (instrument selector, playlist, control bar, audio playback)
export class Daw extends React.Component {

    constructor(props) {
        super(props);

        // Initialize DAW State
        this.state = initialState;
        this.instrumentMappings = instrumentMappings;
        this.audioController = new AudioController(ALL_KEYS);

        // Bindings
        this.onSelectInstrument = this.onSelectInstrument.bind(this);
        this.onRefreshInstrument = this.onRefreshInstrument.bind(this);
        this.onClickPianoRoll = this.onClickPianoRoll.bind(this);
        this.updateBPM = this.updateBPM.bind(this);
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.refresh = this.refresh.bind(this);
        this.export = this.export.bind(this);
    }

    // Initialize instruments on page load
    componentDidMount() {
        this.seedInitialInstruments();
    }

    seedInitialInstruments() {
        this.onCreateInstrument("Grand Piano", "#fec8c1");
        this.onCreateInstrument("Nylon Guitar", "#fad9c1");
        this.onCreateInstrument("Lofi Kick 1", "#ffefd7");
        this.onCreateInstrument("Lofi Hat 1", "#dcedc1");
    }

    play() {
        // Play is an asynchronous operation, require callback to retrieve tick information
        this.audioController.play(this.state.bpm, this.state.instruments, (index) => {
            // Callback called on every tick, set play index
            this.setState((state) => {
                return {
                    ...state,
                    playIndex: index,
                }
            });
        });
    }

    stop() {
        this.audioController.stop();
        this.setState((state) => {
           return {
               ...state,
               playIndex: -1
           }
        });
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

    // Updates the BPM
    updateBPM = () => (value) => {
        this.setState({
            "bpm": value
        });
    };

    // TODO more params (e.g. color)
    // Creates a new instrument
    onCreateInstrument(instrumentName, instrumentColor) {
        let newInstrument = {
            "id": uuidv4(),
            "name": instrumentName,
            "src": this.instrumentMappings[instrumentName].src,
            "instType": this.instrumentMappings[instrumentName].instType,
            "fileType": this.instrumentMappings[instrumentName].fileType,
            "data": initializeEmptyData(),
            "color": instrumentColor
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

    onRefreshInstrument(instrumentIndex) {
        // Change instrument data state
        this.setState(state => {
            let newData = initializeEmptyData();

            //Set new data
            return {
                ...state,
                instruments: state.instruments.map(
                    (el, index) => index === instrumentIndex ? { ...el, data: newData }: el
                )
            }
        })
    }

    // TODO more params - edit color
    onEditInstrument(index) {

    }

    // Deletes an instrument
    onDeleteInstrument(index) {

    }

    onClickPianoRoll(row_index, col_index) {
        let currentInstrument = this.state.instruments[this.state.selectedIndex]

        // Play note if enabling note
        if (!currentInstrument.data[row_index][col_index]){
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
        let pianoRollSection=<div className="playlist-wrapper"><h1>Loading...</h1></div>
        if (this.state.instruments.length > 0 && this.state.instruments[this.state.selectedIndex].data.length !== 0) {
            pianoRollSection = <div className="playlist-wrapper">
                <InstrumentPicker instruments={this.state.instruments}
                                  selectedIndex={this.state.selectedIndex}
                                  onRefreshInstrument={this.onRefreshInstrument}
                                  onSelectInstrument={this.onSelectInstrument} />
                <PianoRoll
                    instrument={this.state.instruments[this.state.selectedIndex]}
                    playIndex={this.state.playIndex}
                    onClickPianoRoll={this.onClickPianoRoll}
                    numKeys={ALL_KEYS.length}
                    numMeasures={NUM_MEASURES} />
            </div>
        }

        return <div className={"mainApp"} >
            <ControlBar
                className={"controlBar"}
                updateBPM={this.updateBPM}
                bpm={this.state.bpm}
                play={this.play}
                stop={this.stop}
                refresh={this.refresh}
                export={this.export} />
            <br />
            {pianoRollSection}
        </div>
    }
}