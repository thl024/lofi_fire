/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import PianoRoll from "../piano_roll/PianoRoll";
import ExportModal from "../modals/ExportModal";
import InstrumentModal from "../modals/InstrumentModal";
import {jsx, css} from "@emotion/react";
import {TopBar} from "./TopBar";
import {Grow} from "@material-ui/core";
import {connect} from "react-redux";
import {changeExportModalState, setPid} from "../../redux/actions";

const mainAppStyle = css`
  flex-grow: 15;
  display: flex;
  flex-direction: column;
`

class Daw extends React.Component {

    constructor(props) {
        super(props);
        this.export = this.export.bind(this);
    }

    export() {
        this.props.export((res, err) => {
            if (err === null) {
                this.props.setPid(res);
                this.props.onOpen();
            } else {
                console.log("Unable to save project: " + err);
            }
        })
    }

    render() {
        console.log("Rerender DAW");
        return <div css={mainAppStyle}>
            <Grow in={true}>
                <TopBar updateBPM={this.props.updateBPM}
                        play={this.props.play}
                        stop={this.props.stop}
                        refresh={this.props.refresh}
                        export={this.export}  />
            </Grow>
            <PianoRoll notifyNote={this.props.notifySingleNote} />

            {/* Manage modals -- unfortunately, some unnecessary rerenders happening here */}
            <ExportModal />
            <InstrumentModal />
        </div>
    }
}
// Redux connection
export default connect(
    null,
    (dispatch) => ({
        onOpen: () => dispatch(changeExportModalState(true)),
        setPid: (pid) => dispatch(setPid(pid))
    })
)(Daw)