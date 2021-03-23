/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select} from "@material-ui/core";
import {CirclePicker} from 'react-color';
import {defaultColorChoices} from "../../../utils/constants";
import {instrument_mappings} from "../../../utils/instrument_mappings";
import {TextButton} from "../common/TextButton";
import {
    addColor,
    addColorHighlight,
    closeColor,
    closeColorHighlight,
} from "../../../themes/colors";
import CloseIcon from '@material-ui/icons/Close';

const modalStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const modalBodyStyle=css`
  background-color: #FFFFFF;
  padding: 2% 5% 5% 5%;
  border-radius: 25px;
`

const formStyle=css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const buttonWrapperStyle=css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export class InstrumentModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            instrument: "Grand Piano",
            color: defaultColorChoices[0]
        }

        this.onInstrumentChange = this.onInstrumentChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInstrumentChange(e) {
        this.setState(state => {
            return {
                ...state,
                instrument: e.target.value
            }
        });
    }

    onColorChange(color) {
        this.setState(state => {
            return {
                ...state,
                color: color.hex
            }
        })

    }

    onSubmit() {
        this.props.onNotifyInstrumentChange(this.state.instrument, this.state.color);
        this.props.onClose(false);
    }

    render() {
        // TODO multi level dropdown by composing arrays with each instrument type
        let items = []
        for (let key in instrument_mappings) {
            items.push(<MenuItem value={key}>{key}</MenuItem>)
        }

        const body = (
            <div css={modalBodyStyle}>
                <h2>{this.props.action + " Instrument"}</h2>
                <br />
                <br />
                <div css={formStyle}>
                    <FormControl>
                        <InputLabel>Instrument</InputLabel>
                        <Select
                            value={this.state.instrument}
                            onChange={this.onInstrumentChange}>
                            {items}
                        </Select>
                        <FormHelperText>Select an instrument</FormHelperText>
                    </FormControl>
                    <CirclePicker
                        color={ this.state.color }
                        colors={defaultColorChoices}
                        onChangeComplete={ this.onColorChange }
                    />
                </div>
                <br />
                <br />
                <div css={buttonWrapperStyle}>
                    <TextButton color={closeColor}
                                hoverColor={closeColorHighlight}
                                text={"Close"}
                                icon={<CloseIcon />}
                                onClick={this.props.onClose} />


                    <TextButton color={addColor}
                                hoverColor={addColorHighlight}
                                text={this.props.action}
                                icon={this.props.actionIcon}
                                onClick={this.onSubmit} />
                </div>
            </div>
        );

        return <Modal
            css={modalStyle}
            onClose={this.props.onClose}
            open={this.props.open}>
            {body}
        </Modal>
    }
}