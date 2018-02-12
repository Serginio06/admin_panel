import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState, IUserCompany} from "../../state";
import {IChangePhoneAction} from "../../actions/company/changePhone";

const libphonenumber: any = require("libphonenumber-js");

export function changePhoneReducer(state: IState, action: IChangePhoneAction): IState {
    let phoneValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let phoneValidationMessage: string = "";

    const phone: string = action.phone;
    const isEditable: boolean = state.companyPageState.isEditable;
    let companyId: string;
    const userCompanies: IUserCompany[] = state.userCompanies.slice();

    for (const company of userCompanies) {
        if (company.checked) {
            companyId = company._id;
            break;
        }
    }

    if (!phone || phone.length === 0) {
        phoneValidationLevel = VALIDATION_LEVEL_ERROR;
        phoneValidationMessage = "Field must be filled";
    } else if (!libphonenumber.isValidNumber(phone)) {
        phoneValidationLevel = VALIDATION_LEVEL_ERROR;
        phoneValidationMessage = "Phone isn't valid";
    }

    for (const company of userCompanies) {
        if (company._id === "0" || (isEditable && company._id === companyId)) {
            company.phone = action.phone;
            break;
        }
    }

    return {
        ...state,
        userCompanies,

        companyPageState: {
            ...state.companyPageState,

            phone,
            phoneValidationLevel,
            phoneValidationMessage,
        },
    };
}
