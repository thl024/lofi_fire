/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import BPMSlider from "./BPMSlider";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import SaveIcon from '@material-ui/icons/Save';
import RefreshIcon from '@material-ui/icons/Refresh';
import { jsx, css } from '@emotion/react'
import {
    mainThemeColor,
} from "../../styles/colors";
import EditIcon from "@material-ui/icons/Edit";
import {IconButton} from "@material-ui/core";

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
  margin-left: 5%;
  margin-right: 5%;
`
const playbackWrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
`

const playbackStyle  = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  flex-basis: 100px;
  flex-grow: 1;
`

// const p = css`
//   &:focus {
//     background-color: #FFFFFF;
//   }
// `

export class ControlBar extends React.Component {
    render() {
        console.log("Rerender Control Bar");

        let playStyle = {
            '& .focus': {
                backgroundColor: '#FFFFFF',
            }
        }

        return <div css={playbackWrapperStyle}>
            <div css={playbackStyle}>
                <div css={playbackButtonWrapperStyle}>
                    <IconButton css={playStyle} aria-label="play" color={mainThemeColor} onClick={this.props.play}>
                        <PlayArrowIcon />
                    </IconButton>
                    <IconButton css={playStyle} aria-label="stop" color={mainThemeColor} onClick={this.props.stop}>
                        <StopIcon />
                    </IconButton>
                    <IconButton css={playStyle} aria-label="refresh" color={mainThemeColor} onClick={this.props.refresh}>
                        <RefreshIcon />
                    </IconButton>
                    <IconButton css={playStyle} aria-label="export" color={mainThemeColor} onClick={this.props.export}>
                        <SaveIcon />
                    </IconButton>

                    {/*<IconCircleButton color={mainThemeColor} hoverColor={mainThemeColorLight} icon="play_arrow" onClick={this.props.play} />*/}
                    {/*<IconCircleButton color={stopColor} hoverColor={stopColorHighlight} icon="stop" onClick={this.props.stop} />*/}
                    {/*<IconCircleButton color={refreshColor} hoverColor={refreshColorHighlight} icon="refresh" onClick={this.props.refresh} />*/}
                    {/*<IconCircleButton color={exportColor} hoverColor={exportColorHighlight} icon="save" onClick={this.props.export} />*/}
                </div>
                <div css={playbackSliderWrapperStyle}>
                    <BPMSlider updateBPM={this.props.updateBPM}/>
                </div>
            </div>
        </div>
    }
}