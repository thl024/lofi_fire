/** @jsxRuntime classic */
/** @jsx jsx */
import Daw from "./components/main/Daw";
import { jsx } from '@emotion/react'
import {connect} from "react-redux";
import {LoadingPage} from "./components/common/LoadingPage";
import {mainThemeColor} from "./styles/colors";

// App presentational component
function App(props) {
    if (props.loading) {
        return <LoadingPage isNewProject={props.isNewProject} />
    }

    let appStyle = {
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: mainThemeColor
    }

    return (<div css={appStyle}>
            <Daw onCreateInstrument={props.onCreateInstrument}
                 onEditInstrument={props.onEditInstrument}
                 onDeleteInstrument={props.onDeleteInstrument}
                 updateBPM={props.updateBPM}
                 notifySingleNote={props.notifySingleNote}
                 play={props.play}
                 stop={props.stop}
                 refresh={props.refresh}
                 export={props.export}
            />
        </div>
    );
}

// Redux to retrieving loading state, avoiding in parent container due to intensive loading
export default connect(
    (state) => {
        return {
            loading: state.loading,
        }}
)(App)
