import './App.css';
import Daw from "./components/daw/Daw";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {MainController} from "./controllers/main_controller";
import { Redirect } from "react-router-dom";
import {getProjectState} from "./utils/network";
import {initializeAudioMetadata} from "./controllers/audio_metadata";

function App() {
    // Retrieve URL param for project id
    let { pid } = useParams();
    let [redirect, setRedirect] = useState(false);
    let [projectState, setProjectState] = useState(null);

    // Controller initialization and seeding initial project data
    useEffect(() => {
        // API call to retrieve audio metadata
        initializeAudioMetadata().catch(err=> {
            console.log("Error initializing audio metadata: " + err);
        }).then(() => {
            // Call for project state if pid exists
            if (pid !== null && pid !== undefined) {
                // API call to return project state
                return getProjectState(pid).catch(err=>{
                    setRedirect(true);
                }).then(res=>{ // Seed project state if success
                    setProjectState(res);
                })
            } else { // No project ID, seed initial instruments
                setProjectState(-1);
            }
        }).catch((err) => {
            console.log("Error during initialization: " + err);
        })
    }, [pid]);

    if (redirect) {
        return <Redirect to="/" />
    } else if (projectState === null) {
        return <div />
    }

    // Manage data flow & audio
    console.log("Init main controller");
    let controller = new MainController(pid);
    controller.clear();

    try {
        if (projectState === -1) {
            controller.seedInstruments(null);
        } else {
            controller.seedInstruments(projectState)
        }
    } catch (e) {
        return <div />
    }

    console.log("Loaded main controller");
    return (<div className="App">
            <h2 className={"title"}>Muselab</h2>
            <Daw onCreateInstrument={controller.onCreateInstrument}
                 onEditInstrument={controller.onEditInstrument}
                 onDeleteInstrument={controller.onDeleteInstrument}
                 updateBPM={controller.updateBPM}
                 notifySingleNote={controller.notifySingleNote}
                 play={controller.play}
                 stop={controller.stop}
                 refresh={controller.refresh}
                 export={controller.export}
            />
            <footer className="page-footer footer" />
        </div>
    );
}

export default App;
