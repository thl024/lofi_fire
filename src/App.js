import './App.css';
import {NavBar} from "./components/nav_bar/NavBar";
import {Daw} from "./components/daw/Daw";

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
        <Daw />
    </div>
  );
}

export default App;
