import React from 'react';
import {ControlBar} from "./control_bar/ControlBar";
import InstrumentPicker from "./instrument_picker/InstrumentPicker";
import {PianoRoll} from "./piano_roll/PianoRoll";
import './Daw.css';
import {MainController} from "../../controllers/main_controller";

// Main controller, manages data flow between all children
// (instrument selector, playlist, control bar, audio playback)
// TODO manage main controller here
export class Daw extends React.Component {

    constructor(props) {
        super(props);

        // Initialize controller object
        this.controller = new MainController()
    }

    // Initialize instruments on page load
    componentDidMount() {
        this.controller.clear();
        this.controller.seedInitialInstruments();
    }

    render() {
        let pianoRollSection = <div className="playlist-wrapper">
            <InstrumentPicker onCreateInstrument={this.controller.onCreateInstrument} />
            <PianoRoll notifyNote={this.controller.notifySingleNote} />
        </div>

        return <div className={"mainApp"} >
            <ControlBar
                className={"controlBar"}
                updateBPM={this.controller.updateBPM}
                play={this.controller.play}
                stop={this.controller.stop}
                refresh={this.controller.refresh}
                export={this.controller.export} />
            <br />
            {pianoRollSection}
        </div>
    }
}