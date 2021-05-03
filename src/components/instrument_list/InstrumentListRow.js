/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {NewInstrumentModal} from "../modals/NewInstrumentModal";
import EditIcon from '@material-ui/icons/Edit';
import {ButtonArray} from "./ButtonArray";

const instrumentRowWrapperStyle = css`
  /*flex-basis: 100px*/
  height: 50px;
  cursor: pointer;

  /* Flexbox */
  display: flex;
  flex-direction: row;
`

const colorBoxStyle = css`
  flex-basis: 25px;
`

const instrumentTextStyle = css`
  /*  Flexbox  */
  flex-grow: 10;
  text-align: left;
  padding: 0 15px 0 15px;
`

const buttonArrayWrapperStyle = css`
  /*  Flexbox  */
  flex-grow: 10;
`

const borderWrapper = css`
  border-bottom: #BDBDBD 1px solid;
  
  /* Flexbox */
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`

export class InstrumentListRow extends React.Component {

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onRefreshWithIndex = this.onRefreshWithIndex.bind(this);
        this.onDeleteWithIndex = this.onDeleteWithIndex.bind(this);

        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.onEditInstrumentFinish = this.onEditInstrumentFinish.bind(this);

        this.state = {
            editModalOpen: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // No need to update on index update, as row styles do not depend on them
        return this.props.instrument !== nextProps.instrument ||
            this.props.color !== nextProps.color ||
            this.props.selected !== nextProps.selected ||
            this.state.editModalOpen !== nextState.editModalOpen
    }

    onSelect() {
        this.props.onSelect(this.props.index)
    }

    onRefreshWithIndex() {
        this.props.onRefresh(this.props.index);
    }

    onDeleteWithIndex() {
        this.props.onDeleteInstrument(this.props.index);
    }

    openEditModal() {
        this.setState(state => {
            return {
                editModalOpen: true,
            }
        })
    }

    closeEditModal() {
        this.setState(state => {
            return {
                editModalOpen: false
            }
        })
    }

    onEditInstrumentFinish(name, color) {
        this.props.onEditInstrument(this.props.index, name, color)
    }

    render() {
        console.log("Rerender Instrument List Row: " + this.props.index)
        let instrumentText = this.props.instrument

        // TODO more elegant way to indicate selected row
        if (this.props.selected) {
            instrumentText = "> " + this.props.instrument
        }

        let modal = <div />;
        if (this.state.editModalOpen) {
            modal = <NewInstrumentModal
                open={this.state.editModalOpen}
                name={this.props.instrument}
                color={this.props.color}
                action="Edit"
                actionIcon={<EditIcon />}
                onClose={this.closeEditModal}
                onNotifyInstrumentChange={this.onEditInstrumentFinish} />;
        }

        return <div css={instrumentRowWrapperStyle} onClick={this.onSelect}>
            <div style={{backgroundColor: this.props.color}} css={colorBoxStyle}/>
            <div css={borderWrapper}>
            <p css={instrumentTextStyle}> {instrumentText}</p>

            <ButtonArray css={buttonArrayWrapperStyle}
                         onEdit={this.openEditModal}
                         onDelete={this.onDeleteWithIndex}
                         onRefresh={this.onRefreshWithIndex} />
            </div>
            {modal}
        </div>
    }
}