import React from 'react';
import {ControlBar} from "./control_bar/ControlBar";
import {InstrumentPicker} from "./instrument_picker/InstrumentPicker";
import {PianoRoll} from "./piano_roll/PianoRoll";
import './Daw.css';
import {PlaybackController} from "./PlaybackController";

// Coordinates the playback control bar with the playlist & instruments
export class Daw extends React.Component {

    constructor(props) {
        super(props);
        this.playbackController = new PlaybackController();
        this.state = {
            bpm: 130,

            // TODO rename this to instrument ids
            instrumentNames: [],
            selectedIndex: 0,
            numMeasures: 4,
            numKeys: 12,
            instrumentData: []
        }

        this.onSelectInstrument = this.onSelectInstrument.bind(this);
        this.onClickPianoRoll = this.onClickPianoRoll.bind(this);
        this.updateBPM = this.updateBPM.bind(this);
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.refresh = this.refresh.bind(this);
        this.export = this.export.bind(this);

        this.onCreateInstrument("Grand Piano");
    }

    play() {
        // TODO
        console.log("Play");

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
        this.playbackController.loadNewInstrument(instrumentName, function(err) {
            if (err) {
                console.log("Failed to load instrument: " + instrumentName + "; " + err.toString());
                return;
            }

            this.setState(state => {
                const instruments = [...state.instruments, instrumentName];
                return {
                    ...state,
                    instruments: instruments,
                };
            });
        })
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
            this.playbackController.playNote(this.state.instrumentNames[this.state.selectedIndex],
                row_index)
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
        return <div>
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
                    numKeys={this.state.numKeys}
                    numMeasures={this.state.numMeasures} />
            </div>

        </div>
    }
}