/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete'
import {IconButton} from "@material-ui/core";
import {iconButtonColor} from "../../styles/colors";

const buttonArrayStyle = css`
  display: flex;
`

const buttonStyle = css`
  //flex-grow: 1;
  //padding:10px;
  &:focus {
    background-color: #FFFFFF;
  }
`

export class ButtonArray extends React.Component {

    constructor(props) {
        super(props);

        this.onRefreshClick = this.onRefreshClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
    }

    // Stop propagation on click events that would otherwise trigger event on parent list row
    onRefreshClick(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.onRefresh();
    }

    onDeleteClick(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.onDelete();
    }

    onEditClick(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.onEdit();
    }

    render() {
        return <div css={buttonArrayStyle}>
            <IconButton css={buttonStyle} aria-label="edit" color={iconButtonColor} onClick={this.onEditClick}>
                <EditIcon />
            </IconButton>
            <IconButton css={buttonStyle} aria-label="refresh" color={iconButtonColor} onClick={this.onRefreshClick}>
                <RefreshIcon />
            </IconButton>
            <IconButton css={buttonStyle} aria-label="delete" color={iconButtonColor} onClick={this.onDeleteClick}>
                <DeleteIcon />
            </IconButton>
        </div>
    }
}