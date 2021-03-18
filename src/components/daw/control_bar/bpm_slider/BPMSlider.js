import React from 'react';
import 'rc-slider/assets/index.css'
import Slider from 'rc-slider';
import './BPMSlider.css'

export class BPMSlider extends React.Component {
    render() {
        // Slider color
        let sliderColor = "#FF9800"
        return <div className="playback-slider">
            <p className="bpm-text">Tempo: </p>
            <Slider
                className="bpm-slider"
                defaultValue={this.props.bpm}
                min={50}
                max={130}
                step={1}
                onChange={this.props.updateBPM()}
                handleStyle={{
                    background: sliderColor,
                }}
                dotStyle={{
                    color: sliderColor,
                }}
                activeDotStyle={{
                    backgroundColor: sliderColor
                }}
                trackStyle={{
                    background: sliderColor
                }}
            />
            {/*<Nouislider*/}
            {/*start={this.props.bpm}*/}
            {/*connect={[true, false]}*/}
            {/*step={1}*/}
            {/*orientation="horizontal"*/}
            {/*range={{*/}
            {/*    min: 50,*/}
            {/*    max: 130*/}
            {/*}}*/}
            {/*className="bpm-slider"*/}
            {/*onUpdate={this.props.updateBPM()}*/}
            {/*/>*/}
            <p className="bpm-text">{this.props.bpm}</p>
        </div>
    }

}