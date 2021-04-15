import './App.css';
import {Daw} from "./components/daw/Daw";
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {MainController} from "./controllers/main_controller";
import { Redirect } from "react-router-dom";
import {getProjectState} from "./utils/network";

function App() {
    // Retrieve URL param for project id
    let { pid } = useParams();
    let [redirect, setRedirect] = useState(false);

    const _isMounted = useRef(true); // Initial value _isMounted = true

    // Manage data flow & audio
    // let controller = new MainController(pid)
    let controller = new MainController(pid);

    // Controller initialization and seeding initial project data
    useEffect(() => {
        // TODO -- state for is loading should happen on app
        // TODO -- callback from main controller if loading finished

        // Update the document title using the browser API
        controller.clear();

        // API call to retrieve project details
        if (pid !== null && pid !== undefined) {
            getProjectState(pid,  (res) => {
                if (_isMounted.current) {
                    controller.seedInstruments(res);
                }
            }, (err) => {
                if (_isMounted.current) {
                    console.log(err);
                    _isMounted.current = false;
                    setRedirect(true);
                }
            })
        } else {
            controller.seedInstruments(null);
        }
    });

    if (redirect) {
        return <Redirect to="/" />
    }

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
