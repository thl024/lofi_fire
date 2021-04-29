/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {connect} from "react-redux";
import {NUM_MEASURES} from "../../utils/constants";
import {mainThemeColor, mainThemeColorLight} from "../../styles/colors";

const pianoRollRowHeaderTextStyle = css`
  color: #FFFFFF;
  font-size: 1vw;
  padding-left: 3px;
  margin: 0 0 0 0;
  text-align: left;
`

class PianoRollHeaderCell extends React.Component {

    // Should component update to prevent individual cells from being updated when data matrix is changed at one element
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.playIndex === -1 || // Lazy, just rerender all header cells when stop is called
            nextProps.playIndex === this.props.i || // Current cell is on the tick; add styling
            nextProps.playIndex === this.props.i+1 || // Update previous cell to remove styling
            (nextProps.playIndex === 0 && this.props.i === NUM_MEASURES * 4 - 1); // Update last cell when looping
    }

    render() {
        console.log("Render Piano Roll Header Cell " + this.props.i);

        // Number every 4 elements
        let headerText = "";
        if (this.props.i % 4 === 0) {
            headerText = this.props.i/4;
        }

        // Color in ticks during playback
        let color = mainThemeColor;
        if (this.props.i === this.props.playIndex) {
            color = "#FF9800";
        }
        let pianoRollRowHeaderItem = css`
          flex-grow: 1;
          background-color: ${color};
          display: flex;
          flex-direction: column;
          justify-content: center;
          &:nth-of-type(1)  {
            border-left: solid 2px #BDBDBD
          }
          &:nth-of-type(4n) {
            border-right: solid 2px #BDBDBD;
          }
        `

        return <div css={pianoRollRowHeaderItem} key={"h"+this.props.i.toString()}>
            <p css={pianoRollRowHeaderTextStyle}>{headerText}</p>
        </div>

    }
}

// Redux connection
export default connect(
    (state) => {
        return {
            playIndex: state.playIndex,
        }}
)(PianoRollHeaderCell)