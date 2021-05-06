/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {addColor, iconButtonColor, mainThemeColor, mainThemeColorLight} from "../../styles/colors";
import AddIcon from '@material-ui/icons/Add';
import {IconButton} from "@material-ui/core";

const instrumentListHeaderTextStyle = css`
  font-size: 1.2em;
  text-align: center;
  margin: 0;
`

const buttonStyle = css`
  &:focus {
    background-color: #FFFFFF;
  }
`

const headerTextStyle= css`
  margin: 0;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
`

export class InstrumentModalHeader extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // Constant header, never need to update
        return false;
    }

    render() {
        const instrumentListHeaderStyle = css`
          display:flex;
          flex-direction: row;
          background-color: ${mainThemeColorLight};
          height:50px;
        `

        return <div css={instrumentListHeaderStyle}>
                    <div css={headerTextStyle}>
                    <p css={instrumentListHeaderTextStyle}>Instruments</p>
                    </div>
                    <IconButton css={buttonStyle} aria-label="add" color={addColor}
                                onClick={this.props.addInstrument}>
                        <AddIcon />
                    </IconButton>
                </div>
    }
}