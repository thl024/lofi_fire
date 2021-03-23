/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'

export class IconCircleButton extends React.Component {
    render() {
        // Generate css
        const style = css`
          background-color: ${this.props.color};
          &:focus {
            background-color: ${this.props.color};
          }
          &:hover {
            background-color: ${this.props.hoverColor};
          }
        `
        // JSX
        return <button onClick={this.props.onClick}
                       className="btn-floating btn-large waves-effect waves-light button-wrapper"
                       css={style}>
            <i className="material-icons">{this.props.icon}</i>
        </button>
    }
}
