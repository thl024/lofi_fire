import React from 'react';
import {PlayButton} from "./buttons/PlayButton";
import {StopButton} from "./buttons/StopButton";
import {BPMSlider} from "./bpm_slider/BPMSlider";
import {RefreshButton} from "./buttons/RefreshButton";
import {ExportButton} from "./buttons/ExportButton";
import './ControlBar.css'

export class ControlBar extends React.Component {

    constructor(props) {
        super(props);
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.refresh = this.refresh.bind(this);
        this.export = this.export.bind(this);
        this.updateBPM = this.updateBPM.bind(this);

        this.state = {
            "bpm": 130,
            "i": 0,
        }
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

    updateBPM = () => (render, handle, value, un, percent) => {

        console.log(this.state.i);

        this.setState({
                "i": this.state.i + 1,
                "bpm": value[0]
            });
    };

    export() {

    }

    render() {
       return <div className="playback-wrapper container">
           <div className="playback-button-wrapper">
               <PlayButton play={this.play} />
               <StopButton pause={this.stop} />
           </div>
           <div className="playback-slider-wrapper">
               <BPMSlider updateBPM={this.updateBPM} bpm={this.state.bpm} />
           </div>
           <div className="playback-button-wrapper">
               <RefreshButton refresh={this.refresh} />
               <ExportButton export={this.export} />
           </div>
       </div>
    }

}