import React from 'react';
import './InstrumentPicker.css'
import {InstrumentPickerRow} from "./InstrumentPickerRow";
import {connect} from "react-redux";
import {
    refreshInstrument,
    selectInstrument
} from "../../../redux/actions";
import {InstrumentModal} from "./InstrumentModal";
import {instrument_mappings} from "../../../utils/instrument_mappings";
import AddIcon from "@material-ui/icons/Add";

class InstrumentPicker extends React.Component {

    constructor(props) {
        super(props);

        this.onDeleteInstrument = this.onDeleteInstrument.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);

        this.state = {
            addModalOpen: false,
        }
    }

    onDeleteInstrument(index) {

    }

    openAddModal() {
        this.setState(state => {
            return {
                addModalOpen: true
            }
        })
    }

    closeAddModal() {
        this.setState(state => {
            return {
                addModalOpen: false
            }
        })
    }

    render() {
        console.log("Rerender Instrument List");

        return <div className="instrument-picker-wrapper">
                <ul className="instrument-list">
                    <div className="instrument-picker-header">
                        <li className="instrument-picker-header-text">Instruments</li>
                        <button className="btn-floating btn-large waves-effect waves-light add-button"
                                onClick={() => this.openAddModal(true)}>
                            <i className="material-icons">add</i>
                        </button>
                    </div>
                    <div className="scroll-area">
                        {this.props.names.map((name, index, _) => {

                            // TODO -- keep count of ids in instrument picker to know how many rows
                            // BUT TO REDUCE LATENCY ON CHANGING INSTRUMENT AND OR COLORS, HAVE THE ROWS
                            // DIRECTLY HOOKED UP TO REDUX, INSTEAD OF PASSING IT THROUGH HERE
                            const selected = index === this.props.selectedIndex;
                            return <InstrumentPickerRow index={index}
                                                        instrument={name}
                                                        color={this.props.colors[index]}
                                                        onEditInstrument={this.props.onEditInstrument}
                                                        onDeleteInstrument={this.props.onDeleteInstrument}
                                                        onRefresh={this.props.refreshInstrument}
                                                        onSelect={this.props.selectInstrument}
                                                        key={index}
                                                        selected={selected} />
                        })}
                    </div>
                </ul>

            {/* TODO -- figure out a way to render this without re-rendering all instruments*/}
            <InstrumentModal
                open={this.state.addModalOpen}
                onClose={this.closeAddModal}
                action="Add"
                actionIcon={<AddIcon />}
                name={Object.keys(instrument_mappings)[0]}
                color={instrument_mappings[Object.keys(instrument_mappings)[0]].color}
                onNotifyInstrumentChange={this.props.onCreateInstrument} />
        </div>
    }
}

// Redux connection
export default connect(
    (state) => {
        return {
            names: state.names,
            colors: state.colors,
            selectedIndex: state.selectedIndex
        }},
    (dispatch) => ({
        selectInstrument: (index) => dispatch(selectInstrument(index)),
        refreshInstrument: (index) => dispatch(refreshInstrument(index)),
    })
)(InstrumentPicker)