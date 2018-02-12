import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState, IUserCompany} from "../../state";
import {IChangeNameAction} from "../../actions/company/changeName";

export function changeNameReducer(state: IState, action: IChangeNameAction): IState {
    let nameValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let nameValidationMessage: string = "";

    const name: string = action.name;
    const isEditable: boolean = state.companyPageState.isEditable;
    let companyId: string;
    const userCompanies: IUserCompany[] = state.userCompanies.slice();

    for (const company of userCompanies) {
        if (company.checked) {
            companyId = company._id;
            break;
        }
    }

    if (!name || name.length === 0) {
        nameValidationLevel = VALIDATION_LEVEL_ERROR;
        nameValidationMessage = "Field must be filled";
    }
    // else if (name.length > 30) {
    //     nameValidationLevel = VALIDATION_LEVEL_ERROR;
    //     nameValidationMessage = "Too long value";
    // }

    for (const company of userCompanies) {
        if (company._id === "0" || (isEditable && company._id === companyId)) {
            company.name = name;
            break;
        }
    }

    return {
        ...state,
        userCompanies,

        companyPageState: {
            ...state.companyPageState,

            name,
            nameValidationLevel,
            nameValidationMessage,
        },
    };
}
