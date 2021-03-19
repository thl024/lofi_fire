import React from 'react';
import './InstrumentPicker.css'
import {InstrumentPickerRow} from "./InstrumentPickerRow";
import {InstrumentAdder} from "./InstrumentAdder";

export class InstrumentPicker extends React.Component {

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
    }

    onCloseAddInstrumentModal() {
        this.setState(state => {
            return {
                "modalOpen": false
            }
        })
    }

    onEditInstrument(index) {

    }

    onDeleteInstrument(index) {
        console.log("Delete")
        console.log(index)
    }

    render() {
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
                        {this.props.instruments.map((instrument, index, _) => {
                            const selected = index === this.props.selectedIndex;
                            return <InstrumentPickerRow index={index}
                                                        instrument={instrument.name}
                                                        color={instrument.color}
                                                        // TODO -- Pass in from DAW?
                                                        onRefresh={this.props.onRefreshInstrument}
                                                        onEdit={this.onEditInstrument}
                                                        onDelete={this.onDeleteInstrument}
                                                        onSelect={this.props.onSelectInstrument}
                                                        key={index}
                                                        selected={selected} />
                        })}
                    </div>
                </ul>
            <InstrumentAdder open={this.state.modalOpen} onClose={this.onCloseAddInstrumentModal} />
        </div>
    }

}