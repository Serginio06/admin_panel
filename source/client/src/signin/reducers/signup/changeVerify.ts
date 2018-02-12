import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState} from "../../state";
import {IVerifyAction} from "../../actions/signup/changeVerify";

export function changeVerifyReducer(state: IState, action: IVerifyAction): IState {
    let verifyValidationLevel: string = VALIDATION_LEVEL_SUCCESS,
        verifyValidationMessage: string = "";
    const verify: string = action.verify,
        password: string = state.signupPageState.password;

    if (password !== verify) {
        verifyValidationLevel = VALIDATION_LEVEL_ERROR;
        verifyValidationMessage = "Password mismatch";
    }

    return {
        ...state,
        signupPageState: {
            ...state.signupPageState,

            verify,
            verifyValidationLevel,
            verifyValidationMessage,
        },
    };
}
