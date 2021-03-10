import React from 'react';
import './InstrumentPicker.css'
import {InstrumentPickerRow} from "./InstrumentPickerRow";
import {List, ListItem, ListItemText, ListSubheader} from '@material-ui/core';

export class InstrumentPicker extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="instrument-picker-wrapper">
            {/*<div className="instrument-picker-header-wrapper">*/}
            {/*    <h5 className="instrument-picker-header-text">Instruments</h5>*/}
            {/*</div>*/}

                <List className="instrument-list">
                    <ListSubheader className="instrument-picker-header-text">Instruments</ListSubheader>
                    <div className="scroll-area">
                        <InstrumentPickerRow instrument="Piano" />
                        <InstrumentPickerRow instrument="Synth1" />
                    </div>
                </List>
                {/*<ul className="instrument-list collection">*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*    <InstrumentPickerRow />*/}
                {/*</ul>*/}

        </div>
    }

}