import { createStore, combineReducers } from "redux";
import login from "./login/reducer";


const reducers = combineReducers({ login });

export default createStore(reducers);