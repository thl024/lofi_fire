/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {connect} from "react-redux";
import {onTogglePianoRollNote} from "../../redux/actions";

class PianoRollItem extends React.Component {

    constructor(props) {
        super(props);

        this.togglePianoRollNote = this.togglePianoRollNote.bind(this);
    }

    // Should component update to prevent individual cells from being updated when data matrix is changed at one element
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.data !== null) {
            if (this.props.data === null || this.props.data === undefined) { // Initial data
                return true;
            }

            if (this.props.data[this.props.j][this.props.i] !== // Tile matches the one that was updated
                nextProps.data[this.props.j][this.props.i]) {
                return true;
            }

            // color changes
            // if ((this.props.data[this.props.j][this.props.i] || nextProps.data[this.props.j][this.props.i]) &&
            //     this.props.color !== nextProps.color) {
            //     return true;
            // }
            if ((this.props.color !== nextProps.color)) {
                return true;
            }

        } else {
            if (this.props.data !== null) {
                return true;
            }
        }

        return false;
    }

    togglePianoRollNote(i, j) {
        // Notify parent for it to float to main controller
        this.props.notifyNote(i, j);

        // Notify redux
        this.props.onTogglePianoRollNote(i, j);
    }

    render() {
        // console.log("Render Piano Roll Item at : " + this.props.j + " " + this.props.i);
        if (this.props.data == null || this.props.data.length === 0) {
            return <div />
        }
        let color = "#FFFFFF"
        if (this.props.data[this.props.j][this.props.i]) {
            color = this.props.color
        }

        // else if (this.props.i)

        let pianoRollRowItemStyle = css`
          /*  Child flex grow property */
          flex-basis: 50px;

          /*  CSS Properties  */
          border-right: solid 1px #BDBDBD;
          background-color: ${color};
          //&:nth-of-type(1)  {
          //  border-left: solid 2px #BDBDBD
          //}
          
          &:nth-of-type(4n) {
             border-right: solid 2px #BDBDBD;
          }
          &:nth-of-type(32n) {
            border-right: solid 0;
          }
          &:hover {
            background-color: ${this.props.color};
            opacity: 0.5;
          }
        `

        return <div css={pianoRollRowItemStyle}
                    onClick={() => this.togglePianoRollNote(this.props.j, this.props.i)}
                    key={this.props.i.toString() + this.props.j.toString()} />
    }
}

// Redux connection
export default connect(
    (state) => {
        return {
            data: state.data.length > 0 ? state.data[state.selectedIndex] : null,
            color: state.colors[state.selectedIndex]
        }},
    (dispatch) => ({
        onTogglePianoRollNote: (i, j) => dispatch(onTogglePianoRollNote({i: i, j: j}))
    })
)(PianoRollItem)