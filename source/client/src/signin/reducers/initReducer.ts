import {Action} from "redux";
import {initState, IState} from "../state";

export function initReducer(state: IState, action: Action): IState {
    return initState;
}
