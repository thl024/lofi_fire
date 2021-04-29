/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {Button} from "@material-ui/core";

export class TextButton extends React.Component {
    render() {
        // Generate css
        const style = css`
          background-color: ${this.props.color} !important;
          &:focus {
            background-color: ${this.props.color} !important;
          }
          &:hover {
            background-color: ${this.props.hoverColor} !important;
          }
        `
        // JSX
        return <Button css={style} onClick={this.props.onClick}
                       variant="contained"
                       startIcon={this.props.icon}>
            {this.props.text}
        </Button>
    }
}
