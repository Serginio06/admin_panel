import {Action} from "redux";
import {IState} from "../state";

export const switchToSigninFormReducer = (state: IState, action: Action): IState => ({
    ...state,
    recoverPageState: {
        ...state.recoverPageState,
        show: false,
    },
    signinPageState: {
        ...state.signinPageState,
        show: true,
    },
    signupPageState: {
        ...state.signupPageState,
        show: false,
    },
});
