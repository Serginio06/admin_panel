import {Action} from "redux";
import {IState} from "../state";

export const switchToSignupFormReducer = (state: IState, action: Action): IState => ({
    ...state,
    recoverPageState: {
        ...state.recoverPageState,
        show: false,
    },
    signinPageState: {
        ...state.signinPageState,
        show: false,
    },
    signupPageState: {
        ...state.signupPageState,
        show: true,
    },

});
