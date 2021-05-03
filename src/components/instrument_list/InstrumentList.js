/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {InstrumentListRow} from "./InstrumentListRow";
import {connect} from "react-redux";
import {
    refreshInstrument,
    selectInstrument
} from "../../redux/actions";
import {NewInstrumentModal} from "../modals/NewInstrumentModal";
import AddIcon from "@material-ui/icons/Add";
import {InstrumentListHeader} from "./InstrumentListHeader";

const instrumentListWrapperStyle = css`
  border-right: solid 2px #BDBDBD;

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
  overflow: scroll;
  white-space: nowrap;

  flex-grow: 1;
  overflow-x: hidden;
`

class InstrumentList extends React.Component {

    // constructor(props) {
    //     super(props);

        // this.openAddModal = this.openAddModal.bind(this);
        // this.closeAddModal = this.closeAddModal.bind(this);
        //
        // this.state = {
        //     addModalOpen: false,
        // }
    // }

    // openAddModal() {
    //     this.setState(state => {
    //         return {
    //             addModalOpen: true
    //         }
    //     })
    // }
    //
    // closeAddModal() {
    //     this.setState(state => {
    //         return {
    //             addModalOpen: false
    //         }
    //     })
    // }

    render() {
        console.log("Rerender Instrument List");

        // let modal = <div />
        // if (this.state.addModalOpen) {
        //     modal = <NewInstrumentModal
        //         open={this.state.addModalOpen}
        //         onClose={this.closeAddModal}
        //         action="Add"
        //         actionIcon={<AddIcon />}
        //         onNotifyInstrumentChange={this.props.onCreateInstrument} />;
        // }

        return <div css={instrumentListWrapperStyle}>
                <ul css={instrumentListStyle}>
                    {/*<InstrumentListHeader openAddModal={this.openAddModal}/>*/}
                    <InstrumentListHeader />
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
            {/*{modal}*/}
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