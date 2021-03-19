/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import { jsx, css } from '@emotion/react'

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

export class BPMSlider extends React.Component {
    render() {
        // Slider color
        let sliderColor = "#FF9800"
        return <div css={sliderDivStyle}>
            <p css={bpmTextStyle}>Tempo: </p>
            <Slider
                css={bpmSliderStyle}
                defaultValue={this.props.bpm}
                min={this.props.minimumBPM}
                max={this.props.maximumBPM}
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
            <p css={bpmTextStyle}>{this.props.bpm}</p>
        </div>
    }

}