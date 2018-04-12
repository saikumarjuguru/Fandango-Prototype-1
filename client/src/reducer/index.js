import { combineReducers } from "redux";
import {loginReducer}  from "./loginReducer";
import {movieReducer} from "./movieReducer";
import {moviehallReducer} from "./moviehallReducer";
import {userReducer} from "./userReducer";
import {billingReducer} from "./billingReducer";

export default combineReducers({
	 loginReducer,movieReducer,moviehallReducer,userReducer,billingReducer
});