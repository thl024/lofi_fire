/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import BPMSlider from "./BPMSlider";
import {IconCircleButton} from "../common/IconCircleButton";
import { jsx, css } from '@emotion/react'
import {
    exportColor,
    exportColorHighlight,
    mainThemeColor,
    mainThemeColorLight, refreshColor,
    refreshColorHighlight,
    stopColor,
    stopColorHighlight
} from "../../../themes/colors";

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
        console.log("Rerender Control Bar");

        return <div css={playbackWrapperStyle}>
           <div css={playbackButtonWrapperStyle}>
               <IconCircleButton color={mainThemeColor} hoverColor={mainThemeColorLight} icon="play_arrow" onClick={this.props.play} />
               <IconCircleButton color={stopColor} hoverColor={stopColorHighlight} icon="stop" onClick={this.props.stop} />
           </div>
           <div css={playbackSliderWrapperStyle}>
               <BPMSlider updateBPM={this.props.updateBPM}/>
           </div>
           <div css={playbackButtonWrapperStyle}>
               <IconCircleButton color={refreshColor} hoverColor={refreshColorHighlight} icon="refresh" onClick={this.props.refresh} />
               <IconCircleButton color={exportColor} hoverColor={exportColorHighlight} icon="ios_share" onClick={this.props.export} />
           </div>
        </div>
    }
}