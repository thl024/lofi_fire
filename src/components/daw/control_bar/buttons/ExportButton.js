import React from 'react';
import './Button.css'

export class ExportButton extends React.Component {
    render() {
        // TODO -- CSS & icon for button
        return <button onClick={this.props.export}
                       className="btn-floating btn-large waves-effect waves-light play-button button-wrapper" >
            <i className="material-icons">ios_share</i>
        </button>
    }
}
