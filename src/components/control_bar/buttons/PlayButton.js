import React from 'react';
import './Button.css'

export class PlayButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        // TODO -- CSS & icon for button
        return <button onClick={this.props.play}
                       className="btn-floating btn-large waves-effect waves-light play-button button-wrapper" >
            <i className="material-icons">play_arrow</i>
        </button>
    }
}
