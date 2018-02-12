import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState, IUserCompany} from "../../state";
import {IChangeDescriptionAction} from "../../actions/company/changeDescription";

export function changeDescriptionReducer(state: IState, action: IChangeDescriptionAction): IState {
    const description: string = action.description;
    const isEditable: boolean = state.companyPageState.isEditable;
    let companyId: string;
    const userCompanies: IUserCompany[] = state.userCompanies.slice();

    for (const company of userCompanies) {
        if (company.checked) {
            companyId = company._id;
            break;
        }
    }

    let descriptionValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let descriptionValidationMessage: string = "";

    if (!description || description.length === 0) {
        descriptionValidationLevel = VALIDATION_LEVEL_ERROR;
        descriptionValidationMessage = "Field must be filled";
    }
    // else if (description.length > 250) {
    //     descriptionValidationLevel = VALIDATION_LEVEL_ERROR;
    //     descriptionValidationMessage = "Too long value";
    // }

    for (const company of userCompanies) {
        if (company._id === "0" || (isEditable && company._id === companyId)) {
            company.description = action.description;
            break;
        }
    }

    return {
        ...state,
        userCompanies,

        companyPageState: {
            ...state.companyPageState,

            description,
            descriptionValidationLevel,
            descriptionValidationMessage,
        },
    };
}
