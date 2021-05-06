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
import {Button, IconButton} from "@material-ui/core";
import {connect} from "react-redux";
import {changeInstrumentListModalState} from "../../redux/actions";

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

const buttonStyle = css`
  &:focus {
    background-color: #FFFFFF;
  }
`

class ControlBar extends React.Component {

    render() {
        console.log("Rerender Control Bar");

        return <div css={playbackWrapperStyle}>
            <div css={playbackStyle}>
                <div css={playbackButtonWrapperStyle}>
                    <IconButton css={buttonStyle} aria-label="play" color={mainThemeColor} onClick={this.props.play}>
                        <PlayArrowIcon />
                    </IconButton>
                    <IconButton css={buttonStyle} aria-label="stop" color={mainThemeColor} onClick={this.props.stop}>
                        <StopIcon />
                    </IconButton>
                    <IconButton css={buttonStyle} aria-label="refresh" color={mainThemeColor} onClick={this.props.refresh}>
                        <RefreshIcon />
                    </IconButton>
                    <IconButton css={buttonStyle} aria-label="export" color={mainThemeColor} onClick={this.props.export}>
                        <SaveIcon />
                    </IconButton>
                </div>
                <div css={playbackSliderWrapperStyle}>
                    <BPMSlider updateBPM={this.props.updateBPM}/>
                </div>
                <div css={playbackButtonWrapperStyle}>
                    <Button
                        variant="contained"
                        color="secondary"
                        css={buttonStyle}
                        startIcon={
                            <img src={process.env.PUBLIC_URL + '/guitar-icon.png'} alt={"instruments"}/>
                        }
                        onClick={this.props.onOpen}>
                        Instruments
                    </Button>
                </div>

            </div>
        </div>
    }
}

// Redux connection
export default connect(
    null,
    (dispatch) => ({
        onOpen: () => dispatch(changeInstrumentListModalState(true)),
    })
)(ControlBar)