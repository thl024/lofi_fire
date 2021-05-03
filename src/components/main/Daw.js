/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {ControlBar} from "../control_bar/ControlBar";
import PianoRoll from "../piano_roll/PianoRoll";
import {ExportModal} from "../modals/ExportModal";
import LoadingBar from "../common/LoadingBar";
import {jsx, css} from "@emotion/react";
import {TitleLogo} from "./TitleLogo";
import {TopBar} from "./TopBar";

const mainAppStyle = css`
  flex-grow: 15;
  display: flex;
  flex-direction: column;
`

export class Daw extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pid: null,
            exportModalOpen: false
        }

        this.export = this.export.bind(this);
        this.closeExportModal = this.closeExportModal.bind(this);
    }

    export() {
        this.props.export((res, err) => {
            if (err === null) {
                this.setState(state => {
                    return {
                        pid: res,
                        exportModalOpen: true
                    }
                })
            } else {
                console.log("Unable to save project: " + err);
            }
        })
    }

    closeExportModal() {
        this.setState(state => {
            return {
                exportModalOpen: false
            }
        })
    }

    render() {
        console.log("Rerender DAW");
        return <div css={mainAppStyle}>
            <TopBar updateBPM={this.props.updateBPM}
                    play={this.props.play}
                    stop={this.props.stop}
                    refresh={this.props.refresh}
                    export={this.export}  />
            <PianoRoll notifyNote={this.props.notifySingleNote} />
            <ExportModal
                open={this.state.exportModalOpen}
                onClose={this.closeExportModal}
                pid={this.state.pid}
            />
        </div>
    }
}