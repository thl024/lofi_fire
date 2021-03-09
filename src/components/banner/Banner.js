import React from 'react';
import './Banner.css'

export class Banner extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="container">
            <h1 className="title">LoFi Fire</h1>
        </div>
    }

}