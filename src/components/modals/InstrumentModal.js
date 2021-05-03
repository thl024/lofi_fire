/** @jsxRuntime classic */
/** @jsx jsx */

import {Modal} from "@material-ui/core";
import React from "react";
import {jsx, css} from '@emotion/react'

const modalStyle = css`
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.2);
`

export class InstrumentModal extends React.Component {


    render() {
        return <Modal
            css={modalStyle}
            onClose={this.onClose}
            open={this.props.open}>

        </Modal>
    }
}