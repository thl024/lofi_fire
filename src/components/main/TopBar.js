/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import {jsx, css} from "@emotion/react";
import {TitleLogo} from "./TitleLogo";
import ControlBar from "../control_bar/ControlBar";
import LoadingBar from "../common/LoadingBar";

const topBarStyle = css`
  display: flex;
  flex-direction: row;
  background-color: #FFFFFF;
  margin: 30px 50px 30px 50px;
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.2);
  border-radius: 20px;
`

export class TopBar extends React.Component {
    render() {
        return <div css={topBarStyle}>
            <TitleLogo />
            <ControlBar updateBPM={this.props.updateBPM}
                        play={this.props.play}
                        stop={this.props.stop}
                        refresh={this.props.refresh}
                        export={this.props.export} />
            <LoadingBar/>
        </div>
    }
}