import React from 'react';

export class StopButton extends React.Component {
    render() {
        // TODO -- CSS & icon for button
        return <button onClick={this.props.stop}
                       className="btn-floating btn-large waves-effect waves-light stop-button button-wrapper" >
            <i className="material-icons">stop</i>
        </button>
    }

}