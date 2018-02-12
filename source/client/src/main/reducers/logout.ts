import {Action} from "redux";
import {initState, IState} from "../state";

export const logoutSendReducer = (state: IState, action: Action): IState => ({...state});

export const logoutFinishedReducer = (state: IState, action: Action): IState => initState;
