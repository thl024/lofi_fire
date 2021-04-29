/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {ALL_KEYS, NUM_MEASURES} from "../../utils/constants";
import {PianoRollHeader} from "./PianoRollHeader";
import PianoRollItem from "./PianoRollItem";
import {connect} from "react-redux";
import {audio_metadata} from "../../controllers/audio_metadata";

const pianoRollWrapperStyle = css`
  /*  Child flex grow property */
  flex-grow: 7;

  /*  Parent flex properties */
  display: flex;
  flex-direction: column;
`

const pianoRollRowWrapperStyle = css`
  /*  Child flex grow property */
  flex-basis: 50px;

  /*  Parent flex properties */
  display: flex;
  flex-direction: row;

  /*  CSS Properties  */
  border-bottom: solid 1px #BDBDBD;
  
  &:nth-of-type(1) {
    border-top: solid 1px #BDBDBD;
  }
`

class PianoRoll extends React.Component {

    render() {
        console.log("Render Piano Roll");
        let rows = [];
        let numRows = this.props.type === "toned" ? ALL_KEYS.length : 1;
        let numCols = this.props.type === "sfx" ? 1 : NUM_MEASURES*4;

        for (let j = 0; j < numRows; j++) {
            let new_row = []
            for (let i = 0; i < numCols; i++) {
                new_row.push(<PianoRollItem j={j} i={i} notifyNote={this.props.notifyNote}
                                            key={i.toString() + j.toString()}/>)
            }
            rows.push(<div css={pianoRollRowWrapperStyle} key={j.toString()} >
                {new_row}
            </div>)
        }

        return <div css={pianoRollWrapperStyle}>
            <PianoRollHeader />
            {rows}
        </div>
    }
}

// Redux connection
export default connect(
    (state) => {
        let type = "toned"; // Default piano roll look
        if (state.names.length > 0) {
            type = audio_metadata[state.names[state.selectedIndex]].instType;
        }
        return {
            type: type
        }}
)(PianoRoll)