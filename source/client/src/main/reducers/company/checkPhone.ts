import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState} from "../../state";
import {ICheckPhoneSendAction, ICheckPhoneSuccessAction} from "../../actions/company/checkPhone";
import {IFailedAction} from "../../../common/actions";

export function checkPhoneSendReducer(state: IState, action: ICheckPhoneSendAction): IState {
    return {
        ...state,
        companyPageState: {
            ...state.companyPageState,

            failed: false,

            errorCode: "",
        },
    };
}

export function checkPhoneSuccessReducer(state: IState, action: ICheckPhoneSuccessAction): IState {
    let phoneValidationLevel: string = state.companyPageState.phoneValidationLevel;
    let phoneValidationMessage: string = state.companyPageState.phoneValidationMessage;

    if (phoneValidationLevel === VALIDATION_LEVEL_SUCCESS && !action.result) {
        phoneValidationLevel = VALIDATION_LEVEL_ERROR;
        phoneValidationMessage = "This phone is already in use";
    }

    return {
        ...state,
        companyPageState: {
            ...state.companyPageState,

            phoneChecked: true,

            phoneCheckFailed: !action.result,

            phoneValidationLevel,
            phoneValidationMessage,
        },
    };
}

export function checkPhoneFailedReducer(state: IState, action: IFailedAction): IState {
    return {
        ...state,
        companyPageState: {
            ...state.companyPageState,

            failed: true,

            errorCode: action.errorCode,
        },
    };
}
