/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'

const instrumentListHeaderStyle = css`
  display:flex;
  flex-direction: row;
`

const instrumentListHeaderTextStyle = css`
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

export class InstrumentListHeader extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // Constant header, never need to update
        return false;
    }

    render() {
        return <div css={instrumentListHeaderStyle}>
                    <li css={instrumentListHeaderTextStyle}>Instruments</li>
                    <button
                        css={addButtonStyle}
                        className="btn-floating btn-large waves-effect waves-light"
                        onClick={() => this.props.openAddModal(true)}>
                        <i className="material-icons">add</i>
                    </button>
                </div>
    }
}