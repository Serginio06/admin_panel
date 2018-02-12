import {ICompanyPageState, INavigationState, IState, IUserCompany} from "../../state";
import {IDeleteCompanySuccessAction} from "../../actions/company/delete";

export const deleteCompanySendReducer = (state: IState): IState => {
    return {
        ...state,
    }
};

export const deleteCompanySuccessReducer = (state: IState, action: IDeleteCompanySuccessAction): IState => {
    const userCompanies: IUserCompany[] = state.userCompanies;
    const navigationState: INavigationState = {...state.navigationState};
    const companyPageState: ICompanyPageState = {...state.companyPageState};

    if (navigationState.companyId === action.companyId) {
        navigationState.logo = "";
        navigationState.name = "";
        navigationState.companyId = "";
    }

    if (companyPageState.isEditable) {
        companyPageState.isEditable = false;
    }

    for (let i: number = 0; i < userCompanies.length; i++) {
        if (userCompanies[i]._id === action.companyId) {
            userCompanies.splice(i, 1);
            break;
        }
    }

    return {
        ...state,

        navigationState,

        userCompanies,

        companyPageState,
    };
};

export const deleteCompanyFailedReducer = (state: IState): IState => {
    return {
        ...state,
    }
};

