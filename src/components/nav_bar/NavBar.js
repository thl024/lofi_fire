import React from 'react';
import './NavBar.css'

export class NavBar extends React.Component {
    render() {
        return <nav>
            <div className="nav-wrapper navbar">
                <p className="center brand-logo navbar-text">Lofi-Fire</p>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className="navbar-text">About</li>
                </ul>
            </div>
        </nav>
    }

}