import React from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import './BPMSlider.css'

export class BPMSlider extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="playback-slider">
            <p className="bpm-text">Tempo: </p>
            <Nouislider
            start={this.props.bpm}
            connect={[true, false]}
            step={1}
            orientation="horizontal"
            range={{
                min: 80,
                max: 240
            }}
            className="bpm-slider"
            onUpdate={this.props.updateBPM()}
            />
            <p className="bpm-text">{this.props.bpm}</p>
        </div>
    }

}