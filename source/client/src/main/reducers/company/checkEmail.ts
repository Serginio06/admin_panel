import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState} from "../../state";
import {ICheckEmailSendAction, ICheckEmailSuccessAction} from "../../actions/company/checkEmail";
import {IFailedAction} from "../../../common/actions";

export function checkEmailSendReducer(state: IState, action: ICheckEmailSendAction): IState {
    return {
        ...state,
        companyPageState: {
            ...state.companyPageState,

            errorCode: "",
            failed: false,
        },
    };
}

export function checkEmailSuccessReducer(state: IState, action: ICheckEmailSuccessAction): IState {
    let emailValidationLevel: string = state.companyPageState.emailValidationLevel;
    let emailValidationMessage = state.companyPageState.emailValidationMessage;

    if (emailValidationLevel === VALIDATION_LEVEL_SUCCESS && !action.result) {
        emailValidationLevel = VALIDATION_LEVEL_ERROR;
        emailValidationMessage = "This address is already in use";
    }

    return {
        ...state,
        companyPageState: {
            ...state.companyPageState,

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
        companyPageState: {
            ...state.companyPageState,

            errorCode: action.errorCode,
            failed: true,
        },
    };
}
