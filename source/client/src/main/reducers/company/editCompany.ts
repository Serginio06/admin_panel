import {INavigationState, IState, IUserCompany} from "../../state";
import {IEditCompanySendAction, IEditCompanySuccessAction} from "../../actions/company/editCompany";
import {IFailedAction} from "../../../common/actions";

export function editCompanySendReducer(state: IState, action: IEditCompanySendAction): IState {
    return {
        ...state,

        companyPageState: {
            ...state.companyPageState,

            errorCode: "",
            failed: false,

            isEditable: action.continue,
        },
    };
}

export function editCompanySuccessReducer(state: IState, action: IEditCompanySuccessAction): IState {
    const userCompanies: IUserCompany[] = state.userCompanies.slice();
    let navigationState: INavigationState = state.navigationState;
    let index: number = -1;

    for (let i: number = 0; i < userCompanies.length; i++) {
        if (userCompanies[i]._id === action.company._id) {
            index = i;
            break;
        }
    }

    if (index === -1) {
        return {...state};
    }

    userCompanies[index] = {...action.company, checked: state.companyPageState.isEditable};

    if (navigationState.companyId === action.company._id) {
        navigationState = {
            ...navigationState,
            name: action.company.name,
        };
    }

    return {
        ...state,

        userCompanies,

        navigationState,

        companyPageState: {
            ...state.companyPageState,
            errorCode: "",
            failed: false,
            isEditable: action.continue,
        },
    };
}

export function editCompanyFailedReducer(state: IState, action: IFailedAction): IState {
    return {
        ...state,

        companyPageState: {
            ...state.companyPageState,

            errorCode: action.errorCode,
            failed: true,
        },
    };
}
