import React from 'react';
import {PlayButton} from "./buttons/PlayButton";
import {StopButton} from "./buttons/StopButton";
import {BPMSlider} from "./bpm_slider/BPMSlider";
import {RefreshButton} from "./buttons/RefreshButton";
import {ExportButton} from "./buttons/ExportButton";
import './ControlBar.css'

export class ControlBar extends React.Component {
    render() {
       return <div className="playback-wrapper container">
           <div className="playback-button-wrapper">
               <PlayButton play={this.props.play} />
               <StopButton pause={this.props.stop} />
           </div>
           <div className="playback-slider-wrapper">
               <BPMSlider updateBPM={this.props.updateBPM}
                          bpm={this.props.bpm} />
           </div>
           <div className="playback-button-wrapper">
               <RefreshButton refresh={this.props.refresh} />
               <ExportButton export={this.props.export} />
           </div>
       </div>
    }

}