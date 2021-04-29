import React from 'react';

export class LoadingPage extends React.Component {

    render() {
        console.log("Rerender Loading Page");
        let text = this.props.isNewProject ? "Loading New Project" : "Loading Existing Project"
        return <h1>{text}</h1>
    }
}