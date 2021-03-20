/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {NUM_MEASURES} from "../../../utils/constants";
import PianoRollHeaderCell from "./PianoRollHeaderCell";

const pianoRollRowHeaderWrapperStyle = css`
  /*  Child flex grow property */
  flex-grow: 0.4;

  /*  Parent flex properties */
  display: flex;
  flex-direction: row;

  /*  CSS Properties  */
  border-bottom: solid 1px #BDBDBD;
`

export class PianoRollHeader extends React.Component {
    render() {
        console.log("Render Header Piano Roll");

        let first_row = [];
        for (let i = 0; i < NUM_MEASURES*4; i++) {
            first_row.push(<PianoRollHeaderCell i={i} />)
        }

        return <div css={pianoRollRowHeaderWrapperStyle} key="header_row">{first_row}</div>
    }
}