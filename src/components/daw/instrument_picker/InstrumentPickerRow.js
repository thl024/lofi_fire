import React from 'react';
import './InstrumentPickerRow.css'

export class InstrumentPickerRow extends React.Component {
    render() {
        let instrumentRowClasses = "instrument-row-wrapper";
        if (this.props.selected) {
            instrumentRowClasses += " selected-item"
        }
        return <div className={instrumentRowClasses} onClick={() => this.props.onSelect(this.props.index)}>
            <p className="instrument-text">{this.props.instrument}</p>
            <button className="btn-floating btn-large waves-effect waves-light instrument-edit-button"
                onClick={() => this.props.onEdit(this.props.index)}>
                <i className="material-icons">edit</i>
            </button>
            <button className="btn-floating btn-large waves-effect waves-light instrument-delete-button"
                    onClick={() => this.props.onDelete(this.props.index)}>
                <i className="material-icons">delete</i>
            </button>
        </div>
    }

}