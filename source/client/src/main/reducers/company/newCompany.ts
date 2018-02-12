import {initCompany, initState, IState, IUserCompany} from "../../state";

export const newCompanyReducer = (state: IState): IState => {
    let flag: boolean = true;
    const newCompany: IUserCompany = Object.assign({}, initCompany);
    const userCompanies: IUserCompany[] = state.userCompanies.slice();

    for (const company of userCompanies) {
        company.checked = false;
    }

    for (let i = 0; i < userCompanies.length; i++) {
        if (userCompanies[i]._id === "0") {
            userCompanies[i] = newCompany;
            flag = false;
            break;
        }
    }

    if (flag) {
        userCompanies.unshift(newCompany);
    }

    return {
        ...state,

        userCompanies,

        companyPageState: {
            ...initState.companyPageState,
            isEditable: true,
        },
    };
};
