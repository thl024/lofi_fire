/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {jsx, css} from "@emotion/react";
import {Modal} from "@material-ui/core";

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

export class ExportModal extends React.Component {

    render() {
        // TODO -- config on the url
        let url = "localhost:3000/projects/" + this.props.pid;
        let body = <div css={modalBodyStyle}>
            <h2 css={modalTitleStyle}>{"Export"}</h2>
            <p>Access your saved song at: <a href={url}>{url}</a></p>
        </div>

        return <Modal
            css={modalStyle}
            onClose={this.props.onClose}
            open={this.props.open}>
            {body}
        </Modal>
    }
}