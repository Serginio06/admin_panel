import {initCompany, initState, IState, IUserCompany} from "../../state";
import {IRegisterCompanySendAction, IRegisterCompanySuccessAction} from "../../actions/company/registerCompany";

export function registerCompanySendReducer(state: IState, action: IRegisterCompanySendAction): IState {
    return {
        ...state,

        companyPageState: {
            ...state.companyPageState,

            errorCode: "",
            failed: false,
        },
    };
}

export function registerCompanySuccessReducer(state: IState, action: IRegisterCompanySuccessAction): IState {
    let userCompanies: IUserCompany[] = state.userCompanies.slice();
    let flag: boolean = true;

    for (let i = 0; i < userCompanies.length; i++) {
        if (userCompanies[i]._id === "0") {
            userCompanies[i] = {...action.company, checked: false};
            flag = false;
            break;
        }
    }

    if (flag) {
        userCompanies = userCompanies.concat({...action.company, checked: false});
    }

    if (action._continue) {
        userCompanies.push({...initCompany});
    }

    return {
        ...state,

        userCompanies,

        companyPageState: {
            ...initState.companyPageState,
            errorCode: "",
            failed: false,
            isEditable: action._continue,
        },
    };
}

export function registerCompanyFailedReducer(state, action) {
    return {
        ...state,

        companyPageState: {
            ...state.companyPageState,

            errorCode: action.errorCode,
            failed: true,
            registered: false,
        },
    };
}
