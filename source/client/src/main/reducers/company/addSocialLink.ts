import {ICompanySocialLink, IState, IUserCompany} from "../../state";

export function addSocialLinkReducer(state: IState): IState {
    const isEditable: boolean = state.companyPageState.isEditable;
    let companyId: string;
    const userCompanies: IUserCompany[] = state.userCompanies.slice();
    const links: ICompanySocialLink[] = state.companyPageState.links;

    for (const company of userCompanies) {
        if (company.checked) {
            companyId = company._id;
            break;
        }
    }

    for (const company of userCompanies) {
        if (company._id === "0" || (isEditable && company._id === companyId)) {
            company.links.unshift("");
            links.unshift({link: "", level: "", message: ""});
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
