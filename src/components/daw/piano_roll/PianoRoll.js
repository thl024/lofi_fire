import React from 'react';
import './PianoRoll.css'

export class PianoRoll extends React.Component {

    constructor(props) {
        super(props);

        // TODO -- scrollable
    }

    render() {
        let first_row = [];
        for (let i = 0; i < this.props.numMeasures*4; i++) {
            // Number every 4 elements
            let headerText = "";
            if (i % 4 === 0) {
                headerText = i/4;
            }
            let divClassName = "piano-roll-row-header-item";
            if (i === this.props.playIndex) {
                divClassName += " tick-color";
            } else{
                divClassName += " non-tick-color";
            }

            first_row.push(<div className={divClassName} key={"h"+i.toString()}>
                <p className="piano-roll-row-header-item-text">{headerText}</p>
            </div>)
        }

        let rows = [];
        for (let j = 0; j < this.props.numKeys; j++) {
            let new_row = []
            for (let i = 0; i < (this.props.numMeasures)*4; i++) {
                // let classNames =
                let style = {}
                if (this.props.instrument.data[j][i]) {
                    // classNames += " enabled-note"
                    style = {backgroundColor: this.props.instrument.color}
                } else {
                    // classNames += " disabled-note"
                }
                new_row.push(<div style={style} className={"piano-roll-row-item"} onClick={() => this.props.onClickPianoRoll(j, i)}
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