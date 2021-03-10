import React from 'react';
import './PianoRoll.css'

export class PianoRoll extends React.Component {

    constructor(props) {
        super(props);
        this.canvas= React.createRef();

        this.numMeasures = 4;
        this.numKeys = 12;

        // TODO make a visualizer class; wrap with a pianoroll controller
        this.onItemToggle = this.onItemToggle.bind(this);
        this.mode = 16;
        this.initializeData();
    }

    initializeData() {
        this.data = []
        for (let j = 0; j < this.numKeys; j++) {
            let row = []
            for (let i = 0; i < (this.numMeasures) * 4; i++) {
                row.push(false)
            }
            this.data.push(row);
        }
    }

    onItemToggle(i, j) {

    }

    render() {
        let first_row = [];
        for (let i = 0; i < this.numMeasures; i++) {
            let text = i !== 0 ? i+1 : i+1;
            first_row.push(<div className="piano-roll-row-header-item">
                <p className="piano-roll-row-header-item-text">{text}</p>
            </div>)
        }

        let rows = [];
        for (let j = 0; j < this.numKeys; j++) {
            let new_row = []
            for (let i = 0; i < (this.numMeasures)*4; i++) {
                new_row.push(<div className="piano-roll-row-item" onClick={this.onItemToggle()} />)
            }
            rows.push(<div className="piano-roll-row-wrapper" >
                {new_row}
            </div>)
        }

        return <div className="piano-roll-wrapper">
            {<div className="piano-roll-row-header-wrapper">{first_row}</div>}
            {rows}
        </div>
    }

}