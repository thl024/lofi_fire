/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {jsx, css} from '@emotion/react'
import {Modal, Step, StepLabel, Stepper} from "@material-ui/core";
import {audio_metadata} from "../../../controllers/audio_metadata";
import {TextButton} from "../common/TextButton";
import {addColor, addColorHighlight, closeColor, closeColorHighlight,} from "../../../themes/colors";
import {SelectValuePage} from "../form_page/SelectValuePage";
import {SelectColorPage} from "../form_page/SelectColorPage";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CloseIcon from '@material-ui/icons/Close';
import {ArrowRightAlt} from "@material-ui/icons";

const modalTitleStyle = css`
  text-align: center;
  font-size: 3.5vw;

  flex-shrink: 1;
`

const modalStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const modalBodyStyle=css`
  background-color: #FFFFFF;
  padding: 2% 5% 0 5%;
  width: 60%;
  height: 60%;
  border-radius: 25px;
  
  // Flexbox
  display: flex;
  flex-direction: column;
`

const formStyle=css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  flex-basis: 200px;
`

const buttonWrapperStyle=css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  flex-shrink: 1;
`

const stepperStyle = css`
  flex-shrink: 1;
`

export class InstrumentModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();

        this.onValueSelected = this.onValueSelected.bind(this);
        this.onInstrumentChange = this.onInstrumentChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    getInitialState() {
        return {
            instrument: this.props.name,
            color: this.props.color,
            type: this.searchForInstrumentType(this.props.name),
            pageIndex: 0
        }
    }

    onValueSelected(val) {
        // Switch based on which page
        switch (this.state.pageIndex) {
            case 0:
                this.setState((state) => {
                    return {
                        ...state,
                        type: val.target.value
                    }
                })
                break;
            case 1:
                this.setState((state) => {
                    return {
                        ...state,
                        instrument: val.target.value
                    }
                })
                break;
            case 2:
                this.setState((state) => {
                    return {
                        ...state,
                        color: val.hex
                    }
                })
                break;
            default:
                return;
        }
    }

    searchForInstrumentType(name) {
        if (name === undefined || name === null) {
            return "toned";
        }

        Object.keys(audio_metadata).forEach(function(key) {
            if (key === name) {
                return audio_metadata[key].instType;
            }
        });
        return "toned";
    }

    getInstrumentsWithType(type) {
        let items = []
        Object.keys(audio_metadata).forEach(function(key) {
            if (audio_metadata[key].instType === type) {
                items.push(key);
            }
        });
        return items;
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

    onNext() {
        // TODO animate stepper
        if (this.state.pageIndex < 2) {
            this.setState((state) => {
                return {
                    ...state,
                    pageIndex: state.pageIndex + 1
                }
            })
        } else {
            this.props.onNotifyInstrumentChange(this.state.instrument, this.state.color);
            this.props.onClose(false);
            this.resetPages();
        }
    }

    onPrev() {
        if (this.state.pageIndex > 0) {
            this.setState((state) => {
                return {
                    ...state,
                    pageIndex: state.pageIndex - 1
                }
            })
        } else {
            this.onClose();
        }
    }

    onClose() {
        this.props.onClose(false);
        this.resetPages();
    }

    resetPages() {
        this.setState((state) => {
            return this.getInitialState();
        })
    }

    render() {
        let page;
        switch (this.state.pageIndex) {
            case 0:
                page = <SelectValuePage
                    onValueSelected={this.onValueSelected}
                    value={this.state.type}
                    values={["toned", "perc", "sfx"]}
                    titles={["Toned", "Percussion", "SFX"]}
                    helperText="Select an instrument type"
                    title="Instrument Type" />
                break;
            case 1:
                let instruments = this.getInstrumentsWithType(this.state.type);
                page = <SelectValuePage
                    onValueSelected={this.onValueSelected}
                    value={this.state.instrument}
                    values={instruments}
                    titles={instruments}
                    helperText="Select an instrument"
                    title="Instrument" />
                break;
            case 2:
                page = <SelectColorPage color={this.state.color} onValueSelected={this.onValueSelected} />
                break;
            default:
                page = <p>error</p>
        }

        const body = (
            <div css={modalBodyStyle}>
                <h2 css={modalTitleStyle}>{this.props.action + " Instrument"}</h2>
                <Stepper css={stepperStyle} activeStep={this.state.pageIndex}>
                    <Step key="Type Selection" completed={this.state.pageIndex > 0}>
                        <StepLabel>
                            Type Selection
                        </StepLabel>
                    </Step>
                    <Step key="Instrument Selection" completed={this.state.pageIndex > 1}>
                        <StepLabel>
                            Instrument Selection
                        </StepLabel>
                    </Step>
                    <Step key="Color Selection" completed={false}>
                        <StepLabel>
                            Color Selection
                        </StepLabel>
                    </Step>
                </Stepper>
                <div css={formStyle}>
                    {page}
                </div>
                <div css={buttonWrapperStyle}>
                    <TextButton color={closeColor}
                                hoverColor={closeColorHighlight}
                                text={this.state.pageIndex === 0 ? "Close" : "Back"}
                                icon={this.state.pageIndex === 0 ? <CloseIcon /> : <KeyboardBackspaceIcon />}
                                onClick={this.onPrev} />


                    <TextButton color={addColor}
                                hoverColor={addColorHighlight}
                                text={this.state.pageIndex === 2 ? this.props.action : "Next"}
                                icon={this.state.pageIndex === 2 ? this.props.actionIcon : <ArrowRightAlt />}
                                onClick={this.onNext} />
                </div>
            </div>
        );

        return <Modal
            css={modalStyle}
            onClose={this.onClose}
            open={this.props.open}>
            {body}
        </Modal>
    }
}