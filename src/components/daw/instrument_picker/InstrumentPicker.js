import React from 'react';
import './InstrumentPicker.css'
import {InstrumentPickerRow} from "./InstrumentPickerRow";
import {InstrumentAdderModal} from "./InstrumentAdderModal";
import {connect} from "react-redux";
import {refreshInstrument, selectInstrument} from "../../../redux/actions";

class InstrumentPicker extends React.Component {

    // Updates the BPM
    addNewInstrument = () => (value) => {
        // Notify global instance

    };

    constructor(props) {
        super(props);

        this.onEditInstrument = this.onEditInstrument.bind(this);
        this.onDeleteInstrument = this.onDeleteInstrument.bind(this);
        this.onOpenAddInstrumentModal = this.onOpenAddInstrumentModal.bind(this);
        this.onCloseAddInstrumentModal = this.onCloseAddInstrumentModal.bind(this);
        this.state = {
            "modalOpen": false
        }
    }

    onOpenAddInstrumentModal() {
        this.setState(state => {
            return {
                "modalOpen": true
            }
        })

        // TODO based on results, call back on
        // this.props.onCreateInstrument which will refer to main controller
    }

    onCloseAddInstrumentModal() {
        this.setState(state => {
            return {
                "modalOpen": false
            }
        })
    }

    onEditInstrument(index) {
        // TODO may need to open modal
        // TODO may need to call back on a prop named this.props.onEditInstrument, as may need to load new audio library
    }

    onDeleteInstrument(index) {

    }

    render() {
        console.log("Rerender Instrument List");

        return <div className="instrument-picker-wrapper">
                <ul className="instrument-list">
                    <div className="instrument-picker-header">
                        <li className="instrument-picker-header-text">Instruments</li>
                        <button className="btn-floating btn-large waves-effect waves-light add-button"
                                onClick={this.onOpenAddInstrumentModal}>
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
                                                        onRefresh={this.props.refreshInstrument}
                                                        onEdit={this.onEditInstrument}
                                                        onDelete={this.onDeleteInstrument}
                                                        onSelect={this.props.selectInstrument}
                                                        key={index}
                                                        selected={selected} />
                        })}
                    </div>
                </ul>
            <InstrumentAdderModal open={this.state.modalOpen} onClose={this.onCloseAddInstrumentModal} />
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
        refreshInstrument: (index) => dispatch(refreshInstrument(index))
    })
)(InstrumentPicker)