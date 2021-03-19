import React from 'react';
import {Modal} from "@material-ui/core";

export class InstrumentAdderModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const body = (
            <div>
                <h2 id="simple-modal-title">Text in a modal</h2>
                <p id="simple-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
                {/*<SimpleModal />*/}
            </div>
        );

        return <Modal
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {body}
            </Modal>
    }

}