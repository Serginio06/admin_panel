import {INavigationState, IState, IUserCompany} from "../state";
import {ILoadUserCompaniesSuccess} from "../actions/getUserCompanies";
import {ICompany} from "../../../../types/entity";

export const loadUserCompaniesSendReducer = (state) => ({...state});

export const loadUserCompaniesSuccessReducer = (state: IState, action: ILoadUserCompaniesSuccess): IState => {
    const payload: ICompany[] = action.payload;
    const userCompanies: IUserCompany[] = payload.map((item: ICompany) => {
        return {
            ...item,
            checked: false,
        }
    });

    let navigationState: INavigationState = state.navigationState;

    if (navigationState.companyId) {
        navigationState = {...navigationState};
        for (const company of userCompanies) {
            if (company._id === navigationState.companyId) {
                navigationState.logo = company.logo;
                break;
            }
        }
    }

    return {
        ...state,
        userCompanies,

        navigationState,
    };
};

export const loadUserCompaniesFailedReducer = (state, action) => ({
    ...state,
    failed: true,

    errorCode: action.errorCode,
});
