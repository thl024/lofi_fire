import {InstrumentModalHeader} from "../modals/InstrumentModalHeader";
import React from "react";
import InstrumentList from "./InstrumentList";

export class InstrumentPager extends React.Component {

    constructor(props) {
        super(props);

        this.addInstrument = this.addInstrument.bind(this);
    }

    addInstrument() {

    }

    render() {
        // TODO -- switch between list, edit, and add instrument pages
        let page = <InstrumentList addInstrument={this.addInstrument} />
        return <div>
            <InstrumentModalHeader startAddInstrument={this.props.startAddInstrument} />
            {page}
        </div>
    }

}