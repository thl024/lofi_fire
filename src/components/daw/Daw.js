import React from 'react';
import {ControlBar} from "./control_bar/ControlBar";
import InstrumentPicker from "./instrument_list/InstrumentList";
import PianoRoll from "./piano_roll/PianoRoll";
import './Daw.css';
import {connect} from "react-redux";

class Daw extends React.Component {
    render() {
        console.log("Rerender DAW");

        if (this.props.loading) {
            return <h1>Loading</h1>
        }

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

// Redux connection
export default connect(
    (state) => {
        return {
            loading: state.loading,
        }}
)(Daw)