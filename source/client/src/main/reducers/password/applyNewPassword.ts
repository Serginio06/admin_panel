import {VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";

export const applyNewPasswordSendReducer = (state, action) => ({
    ...state,
    passwordPageState: {
        ...state.passwordPageState,
        changed: false,
        errorCode: "",
        failed: false,
    },
});

export const applyNewPasswordSuccessReducer = (state, action) => ({
    ...state,
    passwordPageState: {
        ...state.passwordPageState,
        newPassword: "",
        newPasswordValidationLevel: VALIDATION_LEVEL_SUCCESS,
        newPasswordValidationMessage: "",

        newVerify: "",
        newVerifyValidationLevel: VALIDATION_LEVEL_SUCCESS,
        newVerifyValidationMessage: "",

        changed: true,
    },
});

export const applyNewPasswordFailedReducer = (state, action) => ({
    ...state,
    passwordPageState: {
        ...state.passwordPageState,
        errorCode: action.errorCode,
        failed: true,
    },
});
