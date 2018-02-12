import {setCookie} from "../../../common/util/cookieUtil";
import {INavigationState, IProductPageState, IPromoPageState, IState, IUserCompany} from "../../state";
import {IChooseCompanyAction} from "../../actions/company/chooseCompany";

export const chooseCompanyReducer = (state: IState, action: IChooseCompanyAction): IState => {
    const userCompanies: IUserCompany[] = state.userCompanies.slice();
    const promoPageState: IPromoPageState = {...state.promoPageState};
    const productPageState: IProductPageState = {...state.productPageState};

    promoPageState.isEditable = false;
    productPageState.isEditable = false;

    let targetCompany: IUserCompany = null;
    let navigationState: INavigationState;

    for (const company of userCompanies) {
        if (company._id === action.companyId) {
            targetCompany = company;

            company.checked = !company.checked;
        } else {
            company.checked = false;
        }
    }

    if (targetCompany === null) {
        console.error(`Company wasn't found! CompanyId: ${action.companyId}`);
        return {...state};
    }

    setCookie("company", JSON.stringify({
        id: action.companyId,
        name: targetCompany.name,
    }));

    navigationState = {
        ...state.navigationState,

        companyId: action.companyId,
        logo: targetCompany.logo,
        name: targetCompany.name,
    };

    return {
        ...state,

        navigationState,

        promoPageState,
        productPageState,
    }
};
