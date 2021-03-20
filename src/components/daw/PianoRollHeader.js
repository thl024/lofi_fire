/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {NUM_MEASURES} from "../../utils/constants";
import {connect} from "react-redux";

const pianoRollRowHeaderWrapperStyle = css`
  /*  Child flex grow property */
  flex-grow: 0.4;

  /*  Parent flex properties */
  display: flex;
  flex-direction: row;

  /*  CSS Properties  */
  border-bottom: solid 1px #BDBDBD;
`

const pianoRollRowHeaderTextStyle = css`
  color: #FFFFFF;
  font-size: 1vw;
  padding-left: 5px;
  margin: 0 0 0 0;
`


class PianoRollHeader extends React.Component {

    constructor(props) {
        super(props);

        this.togglePianoRollNote = this.togglePianoRollNote.bind(this);
    }

    // TODO remove to make it concise
    togglePianoRollNote(i, j) {
        // Notify parent for it to float to main controller
        this.props.playNote(i);

        // Notify redux
        this.props.onTogglePianoRollNote(i, j);
    }

    render() {
        console.log("Render Header Piano Roll");

        let first_row = [];
        for (let i = 0; i < NUM_MEASURES*4; i++) {
            // Number every 4 elements
            let headerText = "";
            if (i % 4 === 0) {
                headerText = i/4;
            }

            // Color in ticks during playback
            let color = "#757575";
            if (i === this.props.playIndex) {
                color = "#FF9800";
            }
            let pianoRollRowHeaderItem = css`
              flex-grow: 1;
              background-color: ${color};
            `

            first_row.push(<div css={pianoRollRowHeaderItem} key={"h"+i.toString()}>
                <p css={pianoRollRowHeaderTextStyle}>{headerText}</p>
            </div>)
        }

        return <div css={pianoRollRowHeaderWrapperStyle} key="header_row">{first_row}</div>

    }
}

// Redux connection
export default connect(
    (state) => {
        return {
            playIndex: state.playIndex,
        }}
)(PianoRollHeader)