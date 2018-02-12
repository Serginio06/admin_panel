import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState, IUserCompany} from "../../state";
import {IChangeWebAddressAction} from "../../actions/company/changeWebAddress";

const validator: any = require("validator");

export function changeWebAddressReducer(state: IState, action: IChangeWebAddressAction): IState {
    let webAddressValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let webAddressValidationMessage: string = "";

    const webAddress: string = action.webAddress;
    const isEditable: boolean = state.companyPageState.isEditable;
    let companyId: string;
    const userCompanies: IUserCompany[] = state.userCompanies.slice();

    for (const company of userCompanies) {
        if (company.checked) {
            companyId = company._id;
            break;
        }
    }

    if (!webAddress || webAddress.length === 0) {
        webAddressValidationLevel = VALIDATION_LEVEL_ERROR;
        webAddressValidationMessage = "Field must be filled";
    } else if (webAddress.length > 150) {
        webAddressValidationLevel = VALIDATION_LEVEL_ERROR;
        webAddressValidationMessage = "Too long value";
    } else if (!validator.isURL(webAddress)) {
        webAddressValidationLevel = VALIDATION_LEVEL_ERROR;
        webAddressValidationMessage = "Link isn't valid";
    }

    for (const company of userCompanies) {
        if (company._id === "0" || (isEditable && company._id === companyId)) {
            company.webAddress = action.webAddress;
            break;
        }
    }

    return {
        ...state,
        userCompanies,

        companyPageState: {
            ...state.companyPageState,

            webAddress,
            webAddressValidationLevel,
            webAddressValidationMessage,
        },
    };
}
