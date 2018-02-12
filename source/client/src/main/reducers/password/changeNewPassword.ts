import {
    VALIDATION_LEVEL_ERROR,
    VALIDATION_LEVEL_SUCCESS,
    VALIDATION_LEVEL_WARNING,
} from "../../../common/constants/ValidationLevelType";

export const changeNewPasswordReducer = (state, action) => {
    let passwordValidationLevel = VALIDATION_LEVEL_SUCCESS,
        passwordValidationMessage = "",
        verifyValidationLevel = VALIDATION_LEVEL_SUCCESS,
        verifyValidationMessage = "";
    const enRegExp = /^[a-zA-Z]$/,
        numberRegExp = /^\d$/,
        password = action.newPassword,
        verify = state.passwordPageState.newVerify;

    if (!password || password.length === 0) {
        passwordValidationLevel = VALIDATION_LEVEL_ERROR;
        passwordValidationMessage = "Field must be filled";
    } else if (password.length < 6) {
        passwordValidationLevel = VALIDATION_LEVEL_ERROR;
        passwordValidationMessage = "Too short value";
    } else if (password.length > 16) {
        passwordValidationLevel = VALIDATION_LEVEL_ERROR;
        passwordValidationMessage = "Too long value";
    } else if (numberRegExp.test(password)
        || enRegExp.test(password)
        || password.toUpperCase() === password
        || password.toLowerCase() === password) {
        passwordValidationLevel = VALIDATION_LEVEL_WARNING;
        passwordValidationMessage = "Password is insecure";
    }

    if (verify && verify.length > 0 && password !== verify) {
        verifyValidationLevel = VALIDATION_LEVEL_ERROR;
        verifyValidationMessage = "Password mismatch";
    }

    return {
        ...state,
        passwordPageState: {
            ...state.passwordPageState,

            newPassword: password,
            newPasswordValidationLevel: passwordValidationLevel,
            newPasswordValidationMessage: passwordValidationMessage,

            newVerifyValidationLevel: verifyValidationLevel,
            newVerifyValidationMessage: verifyValidationMessage,
        },
    };
};
