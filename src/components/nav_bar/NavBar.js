import React from 'react';
import './NavBar.css'

export class NavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <nav>
            <div className="nav-wrapper navbar">
                <a className="center brand-logo navbar-text">Lofi-Fire</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className="navbar-text">About</li>
                </ul>
            </div>
        </nav>
    }

}