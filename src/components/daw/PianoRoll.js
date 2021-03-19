/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'

const pianoRollWrapperStyle = css`
  /*  Child flex grow property */
  flex-grow: 7;

  /*  Parent flex properties */
  display: flex;
  flex-direction: column;
`
const pianoRollRowHeaderWrapperStyle = css`
  /*  Child flex grow property */
  flex-grow: 0.4;

  /*  Parent flex properties */
  display: flex;
  flex-direction: row;

  /*  CSS Properties  */
  border-bottom: solid 1px #BDBDBD;
`

const pianoRollRowWrapperStyle = css`
  /*  Child flex grow property */
  flex-grow: 1;

  /*  Parent flex properties */
  display: flex;
  flex-direction: row;

  /*  CSS Properties  */
  border-bottom: solid 1px #BDBDBD;
  
  &:nth-child(1) {
    border-top: solid 1px #BDBDBD;
  }
`

const pianoRollRowHeaderTextStyle = css`
  color: #FFFFFF;
  font-size: 1vw;
  padding-left: 5px;
  margin: 0 0 0 0;
`


export class PianoRoll extends React.Component {

    render() {
        let first_row = [];
        for (let i = 0; i < this.props.numMeasures*4; i++) {
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

        let rows = [];
        for (let j = 0; j < this.props.numKeys; j++) {
            let new_row = []
            for (let i = 0; i < (this.props.numMeasures)*4; i++) {
                let color = "#FFFFFF"
                if (this.props.instrument.data[j][i]) {
                    color = this.props.instrument.color
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
                                  onClick={() => this.props.onClickPianoRoll(j, i)}
                                  key={i.toString() + j.toString()} />)
            }
            rows.push(<div css={pianoRollRowWrapperStyle} key={j.toString()} >
                {new_row}
            </div>)
        }

        return <div css={pianoRollWrapperStyle}>
            {<div css={pianoRollRowHeaderWrapperStyle} key="header_row">{first_row}</div>}
            {rows}
        </div>
    }

}