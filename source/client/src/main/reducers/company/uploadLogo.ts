import {
    VALIDATION_LEVEL_ERROR,
    VALIDATION_LEVEL_SUCCESS,
} from "../../../common/constants/ValidationLevelType";
import {getErrorText} from "../../../common/util/errorUtil";
import {IState} from "../../state";
import {IUploadLogoSuccessAction} from "../../actions/company/uploadLogo";
import {IFailedAction} from "../../../common/actions";

export function uploadLogoSuccessReducer(state: IState, action: IUploadLogoSuccessAction): IState {
    return {
        ...state,

        companyPageState: {
            ...state.companyPageState,

            logo: action.logo,
            uploadImageValidationLevel: VALIDATION_LEVEL_SUCCESS,
            uploadImageValidationMessage: "",
        },
    };
}

export function uploadLogoFailedReducer(state: IState, action: IFailedAction): IState {
    return {
        ...state,

        companyPageState: {
            ...state.companyPageState,

            uploadImageValidationLevel: VALIDATION_LEVEL_ERROR,
            uploadImageValidationMessage: getErrorText(action.errorCode),
        },
    };
}