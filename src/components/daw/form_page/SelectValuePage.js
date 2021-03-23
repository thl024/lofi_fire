/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@material-ui/core";

export class SelectValuePage extends React.Component {

    render() {
        let items = [];
        for (let i = 0; i < this.props.values.length; i++) {
            items.push(<MenuItem value={this.props.values[i]}>{this.props.titles[i]}</MenuItem>)
        }

        return <div>
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