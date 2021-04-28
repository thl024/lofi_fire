/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@material-ui/core";

const formWrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export class SelectValuePage extends React.Component {

    render() {
        let items = [];
        for (let i = 0; i < this.props.values.length; i++) {
            items.push(<MenuItem key={this.props.values[i]}
                                 value={this.props.values[i]}>{this.props.titles[i]}</MenuItem>);
        }

        return <div css={formWrapperStyle}>
            <FormControl>
                <InputLabel>{this.props.title}</InputLabel>
                <Select
                    value={this.props.value}
                    onChange={this.props.onValueSelected}>
                    {items}
                </Select>
                <FormHelperText>{this.props.helperText}</FormHelperText>
            </FormControl>
        </div>
    }
}