/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {ALL_KEYS, NUM_MEASURES} from "../../../utils/constants";
import {PianoRollHeader} from "./PianoRollHeader";
import PianoRollItem from "./PianoRollItem";

const pianoRollWrapperStyle = css`
  /*  Child flex grow property */
  flex-grow: 7;

  /*  Parent flex properties */
  display: flex;
  flex-direction: column;
`

const pianoRollRowWrapperStyle = css`
  /*  Child flex grow property */
  flex-grow: 1;

  /*  Parent flex properties */
  display: flex;
  flex-direction: row;

  /*  CSS Properties  */
  border-bottom: solid 1px #BDBDBD;
  
  &:nth-of-type(1) {
    border-top: solid 1px #BDBDBD;
  }
`

export class PianoRoll extends React.Component {

    render() {
        console.log("Render Piano Roll");

        let rows = [];
        for (let j = 0; j < ALL_KEYS.length; j++) {
            let new_row = []
            for (let i = 0; i < NUM_MEASURES*4; i++) {
                new_row.push(<PianoRollItem j={j} i={i} notifyNote={this.props.notifyNote} />)
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