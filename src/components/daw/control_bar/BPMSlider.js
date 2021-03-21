/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import { jsx, css } from '@emotion/react'
import { connect } from 'react-redux'
import {changeBPM} from "../../../redux/actions";
import {MAXIMUM_BPM, MINIMUM_BPM} from "../../../utils/constants";

// CSS
const sliderDivStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const bpmTextStyle = css`
  color: #FF9800;
  font-family: GillSans, Calibri, Trebuchet, sans-serif;
  font-size: medium;
  width: 30px;
`

const bpmSliderStyle = css`
  width: 50%;
`

class BPMSlider extends React.Component {

    // Updates the BPM
    updateBPM = () => (value) => {
        // Notify parent so that it may float up to audio controller
        this.props.updateBPM(value);

        // Notify redux
        this.props.changeBPM(value)
    };

    render() {
        console.log("Rerender BPM Bar");

        // Slider color
        let sliderColor = "#FF9800"
        return <div css={sliderDivStyle}>
            <p css={bpmTextStyle}>Tempo: </p>
            <Slider
                css={bpmSliderStyle}
                defaultValue={this.props.bpm}
                min={MINIMUM_BPM}
                max={MAXIMUM_BPM}
                step={1}
                onChange={this.updateBPM()}
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
            <p css={bpmTextStyle}>{this.props.bpm}</p>
        </div>
    }

}

// Redux connection
export default connect(
    (state) => { return {bpm: state.bpm} },
    { changeBPM }
)(BPMSlider)
