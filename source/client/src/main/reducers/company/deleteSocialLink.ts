import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanySocialLink, IState, IUserCompany} from "../../state";
import {IDeleteSocialLinkAction} from "../../actions/company/deleteSocialLink";

export function deleteSocialLinkReducer(state: IState, action: IDeleteSocialLinkAction): IState {
    const isEditable: boolean = state.companyPageState.isEditable;
    let companyId: string;
    const userCompanies: IUserCompany[] = state.userCompanies.slice();
    const links: ICompanySocialLink[] = [];

    for (const company of userCompanies) {
        if (company.checked) {
            companyId = company._id;
            break;
        }
    }

    let isValid: boolean;

    const validator: any = require("validator");

    for (const company of userCompanies) {
        if (company._id === "0" || (isEditable && company._id === companyId)) {
            company.links.forEach((item, index) => {
                if (+index !== +action.index) {
                    isValid = validator.isURL(item) || validator.isEmpty(item);
                    links.push({
                        level: isValid ? VALIDATION_LEVEL_SUCCESS : VALIDATION_LEVEL_ERROR,
                        link: item,
                        message: "Link isn't valid",
                    });
                }
            });

            company.links.length = 0;

            links.forEach((item) => {
                company.links.push(item.link);
            });
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
