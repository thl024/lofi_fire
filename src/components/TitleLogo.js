/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import {APP_NAME} from "../utils/constants";
import {jsx, css} from "@emotion/react";

const titleStyle = css`
  flex-basis: 300px;
`

const imageStyle = css`
  width:100px;
  height:100px;
`

export class TitleLogo extends React.Component {
    render() {
        return <div css={titleStyle}>
            <img css={imageStyle} src={process.env.PUBLIC_URL + '/Logo.png'} alt="Muselab Logo" />
        </div>
    }
}