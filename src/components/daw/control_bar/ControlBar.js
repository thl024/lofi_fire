/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {BPMSlider} from "./BPMSlider";
import {Button} from "./Button";
import { jsx, css } from '@emotion/react'

const playbackButtonWrapperStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  flex-basis: 100px;
  flex-grow: 1;
`
const playbackSliderWrapperStyle = css`
  flex-basis: 400px;
  flex-grow: 1;
  margin-left: 5%;
  margin-right: 5%;
`
const playbackWrapperStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  flex-basis: 100px;
  flex-grow: 1;
  width: 100%;
  background-color: #757575;
  border-radius: 25px;
`

export class ControlBar extends React.Component {
    render() {
        return <div css={playbackWrapperStyle}>
           <div css={playbackButtonWrapperStyle}>
               <Button color="#FF9800" hoverColor="#FFE0B2" icon="play_arrow" onClick={this.props.play} />
               <Button color="#F44336" hoverColor="#FA8072" icon="stop" onClick={this.props.stop} />
           </div>
           <div css={playbackSliderWrapperStyle}>
               <BPMSlider updateBPM={this.props.updateBPM}
                          bpm={this.props.bpm} />
           </div>
           <div css={playbackButtonWrapperStyle}>
               <Button color="#757575" hoverColor="#BDBDBD" icon="refresh" onClick={this.props.refresh} />
               <Button color="#FF9800" hoverColor="#FFE0B2" icon="ios_share" onClick={this.props.export} />
           </div>
        </div>
    }
}