/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import './InstrumentPickerRow.css'
import {Button} from "../common/Button";

export class InstrumentPickerRow extends React.Component {

    constructor(props) {
        super(props);
        this.onSelectWithFilter = this.onSelectWithFilter.bind(this);
        this.onRefreshWithIndex = this.onRefreshWithIndex.bind(this);
        this.onEditModalPopup = this.onEditModalPopup.bind(this);
        this.onDeleteWithIndex = this.onDeleteWithIndex.bind(this);
    }

    onSelectWithFilter(event) {
        event.preventDefault();
        console.log(event);
        // Prevent parent target from firing when child target has been selected
        // TODO fix bug; text is a child too but it is not firing!
        if(event.target === event.currentTarget) {
            this.props.onSelect(this.props.index)
        }
    }

    onRefreshWithIndex() {
        this.props.onRefresh(this.props.index);
    }

    onEditModalPopup() {
        // TODO show modal
        // TODO on modal finish call this.props.onEdit(this.props.index);
    }

    onDeleteWithIndex() {
        this.props.onDelete(this.props.index);
    }

    render() {
        let instrumentRowClasses = "instrument-row-wrapper";
        let instrumentText = this.props.instrument
        if (this.props.selected) {
            instrumentText = "> " + this.props.instrument
        }

        return <div style={{backgroundColor: this.props.color}}
                    className={instrumentRowClasses} onClick={this.onSelectWithFilter}>
            <p className="instrument-text">{instrumentText}</p>
            <Button color="#757575" hoverColor="#BDBDBD" icon="refresh" onClick={this.onRefreshWithIndex} />
            <Button color="#757575" hoverColor="#BDBDBD" icon="edit" onClick={this.onEditModalPopup} />
            <Button color="#757575" hoverColor="#BDBDBD" icon="delete" onClick={this.onDeleteWithIndex} />
        </div>
    }
}