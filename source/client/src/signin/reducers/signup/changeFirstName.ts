import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState} from "../../state";
import {IFirstNameAction} from "../../actions/signup/changeFirstName";

export function changeFirstNameReducer(state: IState, action: IFirstNameAction): IState {
    let firstNameValidationLevel: string = VALIDATION_LEVEL_SUCCESS,
        firstNameValidationMessage: string = "";
    const firstName: string = action.firstName;

    if (!firstName || firstName.length === 0) {
        firstNameValidationLevel = VALIDATION_LEVEL_ERROR;
        firstNameValidationMessage = "Field must be filled";
    } else if (firstName.length < 2) {
        firstNameValidationLevel = VALIDATION_LEVEL_ERROR;
        firstNameValidationMessage = "Too short value";
    } else if (firstName.length > 16) {
        firstNameValidationLevel = VALIDATION_LEVEL_ERROR;
        firstNameValidationMessage = "Too long value";
    }

    return {
        ...state,
        signupPageState: {
            ...state.signupPageState,

            firstName,
            firstNameValidationLevel,
            firstNameValidationMessage,
        },
    };
}
