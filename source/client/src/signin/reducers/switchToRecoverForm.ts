import {Action} from "redux";
import {IState} from "../state";

export const switchToRecoverFormReducer = (state: IState, action: Action): IState => ({
    ...state,
    recoverPageState: {
        ...state.recoverPageState,
        show: true,
    },
    signinPageState: {
        ...state.signinPageState,
        show: false,
    },
    signupPageState: {
        ...state.signupPageState,
        show: false,
    },
});
