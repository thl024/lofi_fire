import React from 'react';
import './PianoRoll.css'

export class PianoRoll extends React.Component {

    constructor(props) {
        super(props);

        // TODO -- scrollable
    }

    render() {
        if (!this.props.data) {
            return <h1>Need data</h1>
        }

        let first_row = [];
        for (let i = 0; i < this.props.numMeasures; i++) {
            let text = i !== 0 ? i+1 : i+1;
            first_row.push(<div className="piano-roll-row-header-item"  key={"h"+i.toString()}>
                <p className="piano-roll-row-header-item-text">{text}</p>
            </div>)
        }

        let rows = [];
        for (let j = 0; j < this.props.numKeys; j++) {
            let new_row = []
            for (let i = 0; i < (this.props.numMeasures)*4; i++) {
                let classNames = "piano-roll-row-item"
                if (this.props.data[j][i]) {
                    classNames += " enabled-note"
                } else {
                    classNames += " disabled-note"
                }
                new_row.push(<div className={classNames} onClick={() => this.props.onClickPianoRoll(j, i)}
                                  key={i.toString() + j.toString()} />)
            }
            rows.push(<div className="piano-roll-row-wrapper" key={j.toString()} >
                {new_row}
            </div>)
        }

        return <div className="piano-roll-wrapper">
            {<div className="piano-roll-row-header-wrapper" key="header_row">{first_row}</div>}
            {rows}
        </div>
    }

}