import React from 'react';
import './Button.css'

export class RefreshButton extends React.Component {
    render() {
        // TODO -- CSS & icon for button
        return <button onClick={this.props.refresh}
                       className="btn-floating btn-large waves-effect waves-light refresh-button button-wrapper" >
            <i className="material-icons">refresh</i>
        </button>
    }
}
