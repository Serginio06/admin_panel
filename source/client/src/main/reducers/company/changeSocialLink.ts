import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanySocialLink, IState, IUserCompany} from "../../state";
import {IChangeSocialLinkAction} from "../../actions/company/changeSocialLink";

export function changeSocialLinkReducer(state: IState, action: IChangeSocialLinkAction): IState {
    const isEditable: boolean = state.companyPageState.isEditable;
    let companyId: string;
    const userCompanies: IUserCompany[] = state.userCompanies.slice();
    const links: ICompanySocialLink[] = state.companyPageState.links.slice();

    for (const company of userCompanies) {
        if (company.checked) {
            companyId = company._id;
            break;
        }
    }

    if (action.link && action.link.length && action.link.length > 100) {
        return {
            ...state,
        };
    }

    const validator: any = require("validator");

    for (const company of userCompanies) {
        if (company._id === "0" || (isEditable && company._id === companyId)) {
            const isValid: boolean = validator.isURL(action.link);

            company.links = company.links.slice();
            company.links[action.index] = action.link;

            links[action.index] = {
                level: isValid ? VALIDATION_LEVEL_SUCCESS : VALIDATION_LEVEL_ERROR,
                link: action.link,
                message: isValid ? "" : "Link isn't valid",
            };
            break;
        }
    }

    return {
        ...state,
        userCompanies,

        companyPageState: {
            ...state.companyPageState,

            links,
        },
    };
}
