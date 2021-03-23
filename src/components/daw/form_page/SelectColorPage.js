/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {CirclePicker} from "react-color";
import {defaultColorChoices} from "../../../utils/constants";

export class SelectColorPage extends React.Component {

    render() {
        return <div>
            <CirclePicker
                color={ this.props.color }
                colors={defaultColorChoices}
                onChangeComplete={ this.props.onValueSelected }
            />
        </div>
    }
}