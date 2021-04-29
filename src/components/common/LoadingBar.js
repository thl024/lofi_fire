import React from 'react';
import {connect} from "react-redux";

class LoadingBar extends React.Component {

    render() {
        console.log("Rerender Loading Bar");

        if (this.props.indivLoading) {
            return <p>Loading</p>
        } else {
            return <div />
        }
    }
}

// Redux connection
export default connect(
    (state) => {
        return {
            indivLoading: state.indivLoading,
        }}
)(LoadingBar)