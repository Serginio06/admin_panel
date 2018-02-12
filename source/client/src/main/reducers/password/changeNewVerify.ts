import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";

export function changeNewVerifyReducer(state, action) {
    let verifyValidationLevel = VALIDATION_LEVEL_SUCCESS,
        verifyValidationMessage = "";

    const verify = action.newVerify,
        password = state.passwordPageState.newPassword;

    if (password !== verify) {
        verifyValidationLevel = VALIDATION_LEVEL_ERROR;
        verifyValidationMessage = "Password mismatch";
    }

    return {
        ...state,
        passwordPageState: {
            ...state.passwordPageState,

            newVerify: verify,
            newVerifyValidationLevel: verifyValidationLevel,
            newVerifyValidationMessage: verifyValidationMessage,
        },
    };
}
