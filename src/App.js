import logo from './logo.svg';
import './App.css';
import {ControlBar} from './components/control_bar/ControlBar'
import {NavBar} from "./components/nav_bar/NavBar";
import {Playlist} from "./components/playlist/Playlist";

function App() {

  // Requires NavBar component
  // Playback components
  // Instrument selection + Piano roll section
  return (
    <div className="App">
        <NavBar />
        <br />
        <br />
        {/*<Banner />*/}
        <ControlBar />
        <br />
        <br />
        <Playlist />
    </div>
  );
}

export default App;
