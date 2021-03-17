import React from 'react';
import './InstrumentPicker.css'
import {InstrumentPickerRow} from "./InstrumentPickerRow";

export class InstrumentPicker extends React.Component {

    constructor(props) {
        super(props);
        this.onEditInstrument = this.onEditInstrument.bind(this);
        this.onDeleteInstrument = this.onDeleteInstrument.bind(this);
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
                    <li className="instrument-picker-header-text">Instruments</li>
                    <div className="scroll-area">
                        {this.props.instruments.map((instrument, index, _) => {
                            const selected = index === this.props.selectedIndex;
                            return <InstrumentPickerRow index={index}
                                                        instrument={instrument.name}

                                                        // TODO -- Pass in from DAW?
                                                        onEdit={this.onEditInstrument}
                                                        onDelete={this.onDeleteInstrument}
                                                        onSelect={this.props.onSelectInstrument}
                                                        key={index}
                                                        selected={selected} />
                        })}
                    </div>
                </ul>
        </div>
    }

}