/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {IconCircleButton} from "../common/IconCircleButton";
import {InstrumentModal} from "./InstrumentModal";
import EditIcon from '@material-ui/icons/Edit';

const instrumentRowWrapperStyle = css`
  /*flex-basis: 100px*/
  height: 50px;
  border-bottom: #BDBDBD 1px solid;
  cursor: pointer;

  /* Flexbox */
  display: flex;
  flex-direction: row;
`

const instrumentTextStyle = css`
  /*  Flexbox  */
  flex-grow: 10;
`

export class InstrumentPickerRow extends React.Component {

    constructor(props) {
        super(props);
        this.onSelectWithFilter = this.onSelectWithFilter.bind(this);
        this.onRefreshWithIndex = this.onRefreshWithIndex.bind(this);
        this.onEditModalPopup = this.onEditModalPopup.bind(this);
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

    onSelectWithFilter() {
        this.props.onSelect(this.props.index)
    }

    onRefreshWithIndex(e) {
        e.stopPropagation();
        this.props.onRefresh(this.props.index);
    }

    onEditInstrumentFinish(name, color) {
        this.props.onEditInstrument(this.props.index, name, color)
    }

    onEditModalPopup(e) {
        e.stopPropagation();
        this.openEditModal();
    }

    onDeleteWithIndex(e) {
        e.stopPropagation();
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

    render() {
        console.log("Rerender Instrument List Row: " + this.props.index)
        let instrumentText = this.props.instrument
        // TODO more elegant way to indicate selected row
        if (this.props.selected) {
            instrumentText = "> " + this.props.instrument
        }

        return <div style={{backgroundColor: this.props.color}}
                    css={instrumentRowWrapperStyle} onClick={this.onSelectWithFilter}>
            <p css={instrumentTextStyle}>{instrumentText}</p>
            <IconCircleButton color="#757575" hoverColor="#BDBDBD" icon="refresh" onClick={this.onRefreshWithIndex} />
            <IconCircleButton color="#757575" hoverColor="#BDBDBD" icon="edit" onClick={this.onEditModalPopup} />
            <IconCircleButton color="#757575" hoverColor="#BDBDBD" icon="delete" onClick={this.onDeleteWithIndex} />

            <InstrumentModal
                open={this.state.editModalOpen}
                name={this.props.instrument}
                color={this.props.color}
                action="Edit"
                actionIcon={<EditIcon />}
                onClose={this.closeEditModal}
                onNotifyInstrumentChange={this.onEditInstrumentFinish} />
        </div>
    }
}