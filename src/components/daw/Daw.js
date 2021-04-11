import React from 'react';
import {ControlBar} from "./control_bar/ControlBar";
import InstrumentPicker from "./instrument_list/InstrumentList";
import PianoRoll from "./piano_roll/PianoRoll";
import './Daw.css';

export class Daw extends React.Component {
    render() {
        console.log("Rerender DAW");
        let pianoRollSection = <div className="playlist-wrapper">
            <InstrumentPicker
                onCreateInstrument={this.props.onCreateInstrument}
                onEditInstrument={this.props.onEditInstrument}
                onDeleteInstrument={this.props.onDeleteInstrument} />
            <PianoRoll notifyNote={this.props.notifySingleNote} />
        </div>

        return <div className={"mainApp"} >
            <ControlBar className={"controlBar"}
                updateBPM={this.props.updateBPM}
                play={this.props.play}
                stop={this.props.stop}
                refresh={this.props.refresh}
                export={this.props.export}/>
            <br />
            {pianoRollSection}
        </div>
    }
}