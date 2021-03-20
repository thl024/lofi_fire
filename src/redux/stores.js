import * as Redux from "redux";
import appReducer from "./reducers";

export const store = Redux.createStore(appReducer);