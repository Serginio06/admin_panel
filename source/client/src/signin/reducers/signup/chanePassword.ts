import {
    VALIDATION_LEVEL_ERROR,
    VALIDATION_LEVEL_SUCCESS,
    VALIDATION_LEVEL_WARNING,
} from "../../../common/constants/ValidationLevelType";
import {IState} from "../../state";
import {IPasswordAction} from "../../actions/signup/changePassword";

export function changePasswordReducer(state: IState, action: IPasswordAction): IState {
    let passwordValidationLevel: string = VALIDATION_LEVEL_SUCCESS,
        passwordValidationMessage: string = "",

        verifyValidationLevel: string = VALIDATION_LEVEL_SUCCESS,
        verifyValidationMessage: string = "";

    const password: string = action.password,
        numberRegExp: RegExp = /^\d$/,
        verify: string = state.signupPageState.verify,
        enRegExp: RegExp = /^[A-Za-z]+$/;

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
        signupPageState: {
            ...state.signupPageState,

            password,
            passwordValidationLevel,
            passwordValidationMessage,

            verifyValidationLevel,
            verifyValidationMessage,
        },
    };
}
