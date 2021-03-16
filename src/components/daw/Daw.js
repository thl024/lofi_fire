import React from 'react';
import {ControlBar} from "./control_bar/ControlBar";
import {InstrumentPicker} from "./instrument_picker/InstrumentPicker";
import {PianoRoll} from "./piano_roll/PianoRoll";
import './Daw.css';
import {AudioPlayer} from "./AudioPlayer";
import {srcMappings} from "./SrcMappings";

// Coordinates the playback control bar with the playlist & instruments
export class Daw extends React.Component {

    constructor(props) {
        super(props);
        const allKeys = this.initializeNotes();

        // Initialize DAW State
        this.state = {
            bpm: 130,

            // TODO rename this to instrument ids
            instrumentNames: [],
            selectedIndex: 0,
            numMeasures: 4,
            allKeys: allKeys,
            instrumentData: []
        }

        this.srcMappings = srcMappings;
        this.audioPlayer = new AudioPlayer(allKeys);

        this.onSelectInstrument = this.onSelectInstrument.bind(this);
        this.onClickPianoRoll = this.onClickPianoRoll.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.updateBPM = this.updateBPM.bind(this);
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.refresh = this.refresh.bind(this);
        this.export = this.export.bind(this);
    }

    componentDidMount() {
        this.onCreateInstrument("Grand Piano");
    }

    initializeNotes() {
        const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
        const noteRange = [3];

        const allNotes = [];
        noteRange.forEach(octave => {notes.forEach(note => {
            allNotes.push(note+octave);
        })})
        allNotes.push("C4")
        return allNotes
    }

    play() {
        // TODO
        console.log("Play");

        this.audioPlayer.play("Grand Piano", this.state.bpm, this.state.instrumentData[0]);
    }

    stop() {
        // TODO
        console.log("Pause");
    }

    refresh() {
        // TODO
        console.log("Refresh")
    }

    export() {
        // TODO
    }

    onMouseMove() {
        this.audioPlayer.resumeContext();
    }

    // Updates the BPM
    updateBPM = () => (render, handle, value, un, percent) => {
        this.setState({
            "bpm": value[0]
        });
    };

    initializeEmptyData(numKeys, numMeasures) {
        let midi = [];
        for (let i = 0; i < numKeys; i++) {
            let new_row = [];
            for (let j = 0; j < numMeasures * 4; j++)  {
                new_row.push(false);
            }
            midi.push(new_row);
        }
        return midi;
    }

    // TODO more params
    // Creates a new instrument
    onCreateInstrument(instrumentName) {
        // Load instrument
        this.audioPlayer.loadSoundLibrary(instrumentName, this.srcMappings[instrumentName], (err) => {
            if (err) {
                console.log("Failed to load instrument: " + instrumentName + "; " + err.toString());
                return;
            }

            // Change state
            this.setState(state => {
                const instruments = [...state.instrumentNames, instrumentName];
                const instrumentDatas = [...state.instrumentData, this.initializeEmptyData(this.state.allKeys.length,
                    state.numMeasures)]

                return {
                    ...state,
                    instrumentNames: instruments,
                    instrumentData: instrumentDatas,
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
        // Play note if enabling note
        if (!this.state.instrumentData[this.state.selectedIndex][row_index][col_index]) {
            this.audioPlayer.playSingleNote(this.state.instrumentNames[this.state.selectedIndex], row_index);
        }

        // Change instrument data state
        this.setState(state => {
            let newData = state.instrumentData[state.selectedIndex].map((row, i) =>
                row.map((val, j) => {
                    if (i === row_index && j === col_index) {
                        return !val
                    }
                    return val;
                })
            )

            // Set new state
            let items = [...this.state.instrumentData];
            items[state.selectedIndex] = newData
            return {
                ...state,
                instrumentData: items
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
                <InstrumentPicker instruments={this.state.instrumentNames}
                                  selectedIndex={this.state.selectedIndex}
                                  onSelectInstrument={this.onSelectInstrument} />
                <PianoRoll
                    data={this.state.instrumentData[this.state.selectedIndex]}
                    onClickPianoRoll={this.onClickPianoRoll}
                    numKeys={this.state.allKeys.length}
                    numMeasures={this.state.numMeasures} />
            </div>

        </div>
    }
}