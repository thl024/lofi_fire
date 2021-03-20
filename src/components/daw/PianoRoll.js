/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {ALL_KEYS, NUM_MEASURES} from "../../utils/constants";
import {connect} from "react-redux";
import {onTogglePianoRollNote} from "../../redux/actions";
import PianoRollHeader from "./PianoRollHeader";

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

class PianoRoll extends React.Component {

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
        console.log("Render Piano Roll");
        if (this.props.data == null || this.props.data.length === 0) {
            return <h1>Blah</h1>
        }

        let rows = [];
        for (let j = 0; j < ALL_KEYS.length; j++) {
            let new_row = []
            for (let i = 0; i < NUM_MEASURES*4; i++) {
                let color = "#FFFFFF"
                if (this.props.data[j][i]) {
                    color = this.props.color
                }

                let pianoRollRowItemStyle = css`
                  /*  Child flex grow property */
                  flex-grow: 1;

                  /*  CSS Properties  */
                  border-right: solid 1px #BDBDBD;
                  background-color: ${color};
                  &:nth-child(1)  {
                    border-left: solid 2px #BDBDBD
                  }
                  &:nth-child(4n) {
                     border-right: solid 2px #BDBDBD;
                  }
                  &:hover {
                    background-color: #BDBDBD;
                  }
                `
                new_row.push(<div css={pianoRollRowItemStyle}
                                  onClick={() => this.togglePianoRollNote(j, i)}
                                  key={i.toString() + j.toString()} />)
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
        return {
            data: state.data[state.selectedIndex],
            color: state.colors[state.selectedIndex]
        }},
    (dispatch) => ({
        onTogglePianoRollNote: (i, j) => dispatch(onTogglePianoRollNote({i: i, j: j}))
    })
)(PianoRoll)