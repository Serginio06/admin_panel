import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState} from "../../state";
import {IFamilyNameAction} from "../../actions/signup/changeFamilyName";

export function changeFamilyNameReducer(state: IState, action: IFamilyNameAction): IState {
    let familyNameValidationLevel: string = VALIDATION_LEVEL_SUCCESS,
        familyNameValidationMessage: string = "";
    const familyName: string = action.familyName;

    if (!familyName || familyName.length === 0) {
        familyNameValidationLevel = VALIDATION_LEVEL_ERROR;
        familyNameValidationMessage = "Field must be filled";
    } else if (familyName.length > 16) {
        familyNameValidationLevel = VALIDATION_LEVEL_ERROR;
        familyNameValidationMessage = "Too long value";
    }

    return {
        ...state,
        signupPageState: {
            ...state.signupPageState,

            familyName,
            familyNameValidationLevel,
            familyNameValidationMessage,
        },
    };
}
