import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState} from "../../state";
import {IEmailAction} from "../../actions/signup/changeEmail";

const validator = require("validator");

export function changeEmailReducer(state: IState, action: IEmailAction): IState {
    let emailValidationLevel: string = VALIDATION_LEVEL_SUCCESS,
        emailValidationMessage: string = "";
    const email: string = action.email;

    if (!email || email.length === 0) {
        emailValidationLevel = VALIDATION_LEVEL_ERROR;
        emailValidationMessage = "Field must be filled";
    } else if (email.length > 50) {
        emailValidationLevel = VALIDATION_LEVEL_ERROR;
        emailValidationMessage = "Too long value";
    } else if (!validator.isEmail(email)) {
        emailValidationLevel = VALIDATION_LEVEL_ERROR;
        emailValidationMessage = "E-mail isn't valid";
    }

    return {
        ...state,
        signupPageState: {
            ...state.signupPageState,

            email,
            emailCheckFailed: emailValidationLevel === VALIDATION_LEVEL_ERROR, // todo check
            emailChecked: emailValidationLevel === VALIDATION_LEVEL_SUCCESS, // todo check
            emailValidationLevel,
            emailValidationMessage,
        },
    };
}
