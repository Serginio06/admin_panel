import {Action} from "redux";
import {IState} from "../../state";
import {IFailedAction} from "../../../common/actions";

export function registerUserSendReducer(state: IState, action: Action): IState {
    return {
        ...state,

        signupPageState: {
            ...state.signupPageState,

            errorCode: "",
            failed: false,
        },
    };
}

export function registerUserSuccessReducer(state: IState, action: Action): IState {
    return {
        ...state,

        signupPageState: {
            ...state.signupPageState,

            errorCode: "",
            failed: false,

            firstName: "",
            firstNameValidationLevel: "",
            firstNameValidationMessage: "",

            familyName: "",
            familyNameValidationLevel: "",
            familyNameValidationMessage: "",

            position: "",
            positionValidationLevel: "",
            positionValidationMessage: "",

            email: "",
            emailChecked: false,
            emailValidationLevel: "",
            emailValidationMessage: "",

            password: "",
            passwordValidationLevel: "",
            passwordValidationMessage: "",

            verify: "",
            verifyValidationLevel: "",
            verifyValidationMessage: "",
        },
    };
}

export function registerUserFailedReducer(state: IState, action: IFailedAction): IState {
    return {
        ...state,

        signupPageState: {
            ...state.signupPageState,

            errorCode: action.errorCode,
            failed: true,
        },
    };
}
