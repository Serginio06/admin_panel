import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState, IUserCompany} from "../../state";
import {IChangeEmailAction} from "../../actions/company/changeEmail";

const validator: any = require("validator");

export function changeEmailReducer(state: IState, action: IChangeEmailAction): IState {
    const email: string = action.email;
    const isEditable: boolean = state.companyPageState.isEditable;
    let companyId: string;
    const userCompanies: IUserCompany[] = state.userCompanies.slice();

    for (const company of userCompanies) {
        if (company.checked) {
            companyId = company._id;
            break;
        }
    }

    let emailValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let emailValidationMessage: string = "";

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

    for (const company of userCompanies) {
        if (company._id === "0" || (isEditable && company._id === companyId)) {
            company.email = action.email;
            break;
        }
    }

    return {
        ...state,
        userCompanies,

        companyPageState: {
            ...state.companyPageState,

            email,
            emailValidationLevel,
            emailValidationMessage,
        },
    };
}
