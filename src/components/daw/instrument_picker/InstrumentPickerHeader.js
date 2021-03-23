/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'

const instrumentPickerHeaderStyle = css`
  display:flex;
  flex-direction: row;
`

const instrumentPickerHeaderTextStyle = css`
  margin: 0;
  padding-top: 5px;
  padding-bottom: 5px;

  font-size: 1.5em;
  border-bottom: solid 2px #757575;

  flex-grow: 1;
`

const addButtonStyle = css`
  flex-grow: 0;
`

export class InstrumentPickerHeader extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // Constant header, never need to update
        return false;
    }

    render() {
        return <div css={instrumentPickerHeaderStyle}>
                    <li css={instrumentPickerHeaderTextStyle}>Instruments</li>
                    <button
                        css={addButtonStyle}
                        className="btn-floating btn-large waves-effect waves-light"
                        onClick={() => this.props.openAddModal(true)}>
                        <i className="material-icons">add</i>
                    </button>
                </div>
    }
}