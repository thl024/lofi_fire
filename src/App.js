import './App.css';
import {NavBar} from "./components/nav_bar/NavBar";
import {Daw} from "./components/daw/Daw";
import React from "react";

function App() {

  // Requires NavBar component
  // Playback components
  // Instrument selection + Piano roll section
  return (
    <div className="App">
        <h2 className={"title"}>Muselab</h2>
        {/*<NavBar />*/}
        {/*<br />*/}
        {/*<br />*/}
        {/*<Banner />*/}
        <Daw />
        <footer className="page-footer footer" />
    </div>
  );
}

export default App;
