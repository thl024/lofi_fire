/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {CirclePicker} from "react-color";
import {defaultColorChoices} from "../../../utils/constants";

const formWrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export class SelectColorPage extends React.Component {

    render() {
        return <div css={formWrapperStyle}>
            <CirclePicker
                color={ this.props.color }
                colors={defaultColorChoices}
                onChangeComplete={ this.props.onValueSelected }
            />
        </div>
    }
}