import {Action} from "redux";
import {IFailedAction} from "../../../common/actions";
import {IState} from "../../state";

export function loginSendReducer(state: IState, action: Action): IState {
    return {
        ...state,
        signinPageState: {
            ...state.signinPageState,

            errorCode: "",
            failed: false,
        },
    };
}

export function loginSuccessReducer(state: IState, action: Action): IState {
    return {
        ...state,
        signinPageState: {
            ...state.signinPageState,

            email: "",
            password: "",
        },
    };
}

export function loginFailedReducer(state: IState, action: IFailedAction): IState {
    return {
        ...state,
        signinPageState: {
            ...state.signinPageState,

            errorCode: action.errorCode,
            failed: true,
        },
    };
}
