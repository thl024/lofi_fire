/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {InstrumentListRow} from "./InstrumentListRow";
import {connect} from "react-redux";
import {
    refreshInstrument,
    selectInstrument
} from "../../../redux/actions";
import {InstrumentModal} from "./InstrumentModal";
import {audio_metadata} from "../../../controllers/audio_metadata";
import AddIcon from "@material-ui/icons/Add";
import {InstrumentListHeader} from "./InstrumentListHeader";

const instrumentListWrapperStyle = css`
  flex-grow: 0.5;
  
  border-bottom: solid 2px #757575;
  border-top: solid 2px #757575;

  /* Flexbox */
  display:flex;
  flex-basis: 300px;
  flex-direction: column;
`

const instrumentListStyle = css`
  margin:0;
  padding:0 !important;
  height: 100%;

  /* Flexbox */
  display: flex;
  flex-direction: column;
`

const scrollAreaStyle = css`
  /*height: 480px;*/
  overflow: scroll;
  white-space: nowrap;
  /*flex-grow: 3;*/

  flex-grow: 1;
  overflow-x: hidden;
`

class InstrumentList extends React.Component {

    constructor(props) {
        super(props);

        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);

        this.state = {
            addModalOpen: false,
        }
    }

    openAddModal() {
        this.setState(state => {
            return {
                addModalOpen: true
            }
        })
    }

    closeAddModal() {
        this.setState(state => {
            return {
                addModalOpen: false
            }
        })
    }

    render() {
        console.log("Rerender Instrument List");

        return <div css={instrumentListWrapperStyle}>
                <ul css={instrumentListStyle}>
                    <InstrumentListHeader openAddModal={this.openAddModal}/>
                    <div css={scrollAreaStyle}>
                        {this.props.names.map((name, index, _) => {
                            const selected = index === this.props.selectedIndex;
                            return <InstrumentListRow index={index}
                                                      instrument={name}
                                                      color={this.props.colors[index]}
                                                      onEditInstrument={this.props.onEditInstrument}
                                                      onDeleteInstrument={this.props.onDeleteInstrument}
                                                      onRefresh={this.props.refreshInstrument}
                                                      onSelect={this.props.selectInstrument}
                                                      key={index}
                                                      selected={selected} />
                        })}
                    </div>
                </ul>

            <InstrumentModal
                open={this.state.addModalOpen}
                onClose={this.closeAddModal}
                action="Add"
                actionIcon={<AddIcon />}
                name={Object.keys(audio_metadata)[0]}
                color={audio_metadata[Object.keys(audio_metadata)[0]].color}
                onNotifyInstrumentChange={this.props.onCreateInstrument} />
        </div>
    }
}

// Redux connection
export default connect(
    (state) => {
        return {
            names: state.names,
            colors: state.colors,
            selectedIndex: state.selectedIndex
        }},
    (dispatch) => ({
        selectInstrument: (index) => dispatch(selectInstrument(index)),
        refreshInstrument: (index) => dispatch(refreshInstrument(index)),
    })
)(InstrumentList)