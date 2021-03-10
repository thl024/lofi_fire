import React from 'react';
import './InstrumentPickerRow.css'
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

export class InstrumentPickerRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <ListItem divider={true} button>
            <ListItemText primary={this.props.instrument} />
        </ListItem>
        // <li className="instrument-picker-row collection-item">
        //     1
        // </li>
    }

}