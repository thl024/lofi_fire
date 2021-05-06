/** @jsxRuntime classic */
/** @jsx jsx */

import {Backdrop, Fade, Modal} from "@material-ui/core";
import React from "react";
import {jsx, css} from '@emotion/react'
import {connect} from "react-redux";
import {changeInstrumentListModalState} from "../../redux/actions";
import InstrumentList from '../instrument_list/InstrumentList'

const modalStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.2);
`

const modalDivStyle = css`
  //padding: 2% 5% 0 5%;
  border: #757575 1px solid;
  border-radius: 10px;
  width: 50%;
  height: 80%;
  background-color: white;
`

class InstrumentModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Track page number
            pageIndex: 0,
        }
    }

    render() {
        console.log("hello");
        console.log(this.props);

        if (!this.props.open) {
            return <div />
        }

        let style = {
            backgroundColor: "red",
            border: '2px solid #000',
            // boxShadow: theme.shadows[5],
            padding: "2 2 2 2",
        }

        return <Modal
            css={modalStyle}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            closeAfterTransition
            onClose={this.props.onClose}
            open={this.props.open}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 250,
            }}>
            <Fade in={this.props.open}>
                <div css={modalDivStyle}>
                    <InstrumentList />
                </div>
            </Fade>
        </Modal>
    }
}

// Redux connection
export default connect(
    (state) => {
        return {
            open: state.instrumentModalOpen,
        }},
    (dispatch) => ({
        onClose: () => dispatch(changeInstrumentListModalState(false)),
    })
)(InstrumentModal)