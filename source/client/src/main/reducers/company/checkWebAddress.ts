import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState} from "../../state";
import {ICheckWebAddressSendAction, ICheckWebAddressSuccessAction} from "../../actions/company/checkWebAddress";
import {IFailedAction} from "../../../common/actions";

export function checkWebAddressSendReducer(state: IState, action: ICheckWebAddressSendAction): IState {
    return {
        ...state,
        companyPageState: {
            ...state.companyPageState,

            errorCode: "",
            failed: false,
        },
    };
}

export function checkWebAddressSuccessReducer(state: IState, action: ICheckWebAddressSuccessAction): IState {
    let webAddressValidationLevel: string = state.companyPageState.webAddressValidationLevel;
    let webAddressValidationMessage: string = state.companyPageState.webAddressValidationMessage;

    if ((webAddressValidationLevel === VALIDATION_LEVEL_SUCCESS) && !action.payload) {
        webAddressValidationLevel = VALIDATION_LEVEL_ERROR;
        webAddressValidationMessage = "This web address is already in use";
    }

    return {
        ...state,
        companyPageState: {
            ...state.companyPageState,

            webAddressCheckFailed: !action.payload,
            webAddressChecked: true,

            webAddressValidationLevel,
            webAddressValidationMessage,
        },
    };
}

export function checkWebAddressFailedReducer(state: IState, action: IFailedAction): IState {
    return {
        ...state,
        companyPageState: {
            ...state.companyPageState,

            errorCode: action.errorCode,
            failed: true,
        },
    };
}
