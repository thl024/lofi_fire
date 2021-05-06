/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {jsx, css} from "@emotion/react";
import {Modal} from "@material-ui/core";
import {connect} from "react-redux";
import {changeExportModalState} from "../../redux/actions";

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

class ExportModal extends React.Component {

    render() {

        if (!this.props.open) {
            return <div />
        }

        // TODO -- config on the url
        let url = "localhost:3000/project/" + this.props.pid;

        return <Modal
            css={modalStyle}
            onClose={this.props.onClose}
            open={this.props.open}>
            <div css={modalBodyStyle}>
                <h2 css={modalTitleStyle}>{"Export"}</h2>
                <p>Access your saved song at: <a href={url}>{url}</a></p>
            </div>
        </Modal>
    }
}

// Redux connection
export default connect(
    (state) => {
        return {
            open: state.exportModalOpen,
            pid: state.pid,
        }},
    (dispatch) => ({
        onClose: () => dispatch(changeExportModalState(false)),
    })
)(ExportModal)