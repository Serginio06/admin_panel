import {Action} from "redux";
import {IFailedAction} from "../../../common/actions";
import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState} from "../../state";
import {ISuccessCheckEmailAction} from "../../actions/signup/checkEmail";

export function checkEmailSendReducer(state: IState, action: Action): IState {
    return {
        ...state,
        signupPageState: {
            ...state.signupPageState,

            errorCode: "",
            failed: false,
        },
    };
}

export function checkEmailSuccessReducer(state: IState, action: ISuccessCheckEmailAction): IState {
    let emailValidationLevel: string = state.signupPageState.emailValidationLevel,
        emailValidationMessage: string = state.signupPageState.emailValidationMessage;

    if (emailValidationLevel === VALIDATION_LEVEL_SUCCESS && !action.result) {
        emailValidationLevel = VALIDATION_LEVEL_ERROR;
        emailValidationMessage = "This address is already in use";
    }

    return {
        ...state,
        signupPageState: {
            ...state.signupPageState,

            emailCheckFailed: !action.result,
            emailChecked: true,

            emailValidationLevel,
            emailValidationMessage,
        },
    };
}

export function checkEmailFailedReducer(state: IState, action: IFailedAction): IState {
    return {
        ...state,
        signupPageState: {
            ...state.signupPageState,

            errorCode: action.errorCode,
            failed: true,
        },
    };
}
