import React from 'react';
import {ControlBar} from "./control_bar/ControlBar";
import InstrumentPicker from "./instrument_list/InstrumentList";
import PianoRoll from "./piano_roll/PianoRoll";
import './Daw.css';
import {connect} from "react-redux";
import {ExportModal} from "./ExportModal";

class Daw extends React.Component {

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

        if (this.props.loading) {
            return <h1>Loading</h1>
        }

        // TODO -- modal for export
        let exportModal = <div />
        if (this.state.exportModalOpen) {
            exportModal = <ExportModal
                open={this.state.exportModalOpen}
                onClose={this.closeExportModal}
                pid={this.state.pid}
            />
        }

        let pianoRollSection = <div className="playlist-wrapper">
            <InstrumentPicker
                onCreateInstrument={this.props.onCreateInstrument}
                onEditInstrument={this.props.onEditInstrument}
                onDeleteInstrument={this.props.onDeleteInstrument} />
            <PianoRoll notifyNote={this.props.notifySingleNote} />
        </div>

        return <div className={"mainApp"} >
            <ControlBar className={"controlBar"}
                updateBPM={this.props.updateBPM}
                play={this.props.play}
                stop={this.props.stop}
                refresh={this.props.refresh}
                export={this.export} />
            <br />
            {pianoRollSection}
            {exportModal}
        </div>
    }
}

// Redux connection
export default connect(
    (state) => {
        return {
            loading: state.loading,
        }}
)(Daw)