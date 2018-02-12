import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {IState, IUserCompany} from "../../state";
import {IChangeAddressAction} from "../../actions/company/changeAddress";

export function changeAddressReducer(state: IState, action: IChangeAddressAction): IState {
    const locationName: string = action.locationName;
    const lat: number = action.lat;
    const lng: number = action.lng;
    const isEditable: boolean = state.companyPageState.isEditable;
    let companyId: string;
    const userCompanies: IUserCompany[] = state.userCompanies.slice();

    for (const company of userCompanies) {
        if (company.checked) {
            companyId = company._id;
            break;
        }
    }

    let locationNameValidationLevel: string = state.companyPageState.locationNameValidationLevel;
    let locationNameValidationMessage: string = state.companyPageState.locationNameValidationMessage;

    if (!locationName || !lng || !lat) {
        locationNameValidationLevel = VALIDATION_LEVEL_ERROR;
        locationNameValidationMessage = "Choose real address";
    } else {
        locationNameValidationLevel = VALIDATION_LEVEL_SUCCESS;
        locationNameValidationMessage = "";
    }

    for (const company of userCompanies) {
        if (company._id === "0" || (isEditable && company._id === companyId)) {
            company.locationName = locationName;
            break;
        }
    }

    return {
        ...state,
        userCompanies,

        companyPageState: {
            ...state.companyPageState,

            lat,
            lng,
            locationName,
            locationNameValidationLevel,
            locationNameValidationMessage,
        },
    };
}
