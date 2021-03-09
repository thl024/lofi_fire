import React from 'react';
import {InstrumentPicker} from "./instrument_picker/InstrumentPicker";
import {PianoRoll} from "./piano_roll/PianoRoll";
import './Playlist.css'

export class Playlist extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="playlist-wrapper">
            <InstrumentPicker />
            <PianoRoll />
        </div>
    }

}