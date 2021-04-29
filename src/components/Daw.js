/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {ControlBar} from "./control_bar/ControlBar";
import InstrumentPicker from "./instrument_list/InstrumentList";
import PianoRoll from "./piano_roll/PianoRoll";
import {ExportModal} from "./modals/ExportModal";
import LoadingBar from "./common/LoadingBar";
import {jsx, css} from "@emotion/react";
import {TitleLogo} from "./TitleLogo";
import {mainThemeColor, mainThemeColorLight, secondaryTheme, tertiaryTheme} from "../styles/colors";

const playlistWrapperStyle = css`
  display: flex;
  flex-direction: row;
  flex-grow: 1000;
`
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

        let exportModal = <div/>
        if (this.state.exportModalOpen) {
            exportModal = <ExportModal
                open={this.state.exportModalOpen}
                onClose={this.closeExportModal}
                pid={this.state.pid}
            />
        }

        let topBarStyle = {
            display: "flex",
            flexDirection: "row",
            backgroundColor: mainThemeColor,
            // borderBottom: "solid 3px " + mainThemeColorLight
        }

        let pianoRollSection = <div css={playlistWrapperStyle}>
            <InstrumentPicker
                onCreateInstrument={this.props.onCreateInstrument}
                onEditInstrument={this.props.onEditInstrument}
                onDeleteInstrument={this.props.onDeleteInstrument}/>
            <PianoRoll notifyNote={this.props.notifySingleNote}/>
        </div>

        return <div css={mainAppStyle}>
            <div css={topBarStyle}>
                <TitleLogo />
                <ControlBar updateBPM={this.props.updateBPM}
                            play={this.props.play}
                            stop={this.props.stop}
                            refresh={this.props.refresh}
                            export={this.export}/>
                <LoadingBar/>
            </div>
            {pianoRollSection}
            {exportModal}
        </div>
    }
}