import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {store} from "./redux/stores";
import {Provider} from "react-redux";

function MuselabApp() {
    return <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
}

function RouterComponent() {
    return <Router>
        <Route exact path="/" component={MuselabApp} />
        <Route exact path="/project/:pid" component={MuselabApp} />
    </Router>
}

ReactDOM.render(
    <RouterComponent />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
