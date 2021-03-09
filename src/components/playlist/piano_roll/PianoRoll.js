import React from 'react';
import './PianoRoll.css'

export class PianoRoll extends React.Component {

    constructor(props) {
        super(props);
        this.canvas= React.createRef();
        this.colCount = 16;
        this.rowCount = 36;

    }

    render() {

        let rows = [];
        for (let i = 0; i < this.rowCount; i++) {
            let new_row = []
            for (let j = 0; j < this.colCount; j++) {
                // TODO -- flexbox
                new_row.push(<div className="piano-roll-row-item" />)
            }
            rows.push(<div className="piano-roll-row-wrapper">
                {new_row}
            </div>)
        }

        return <div className="piano-roll-wrapper">
            {rows}
        </div>



        // <ul>

        // </ul>
    }

}