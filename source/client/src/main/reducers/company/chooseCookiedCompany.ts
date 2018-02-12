import {IState} from "../../state";
import {IChooseCookiedCompanyAction} from "../../actions/company/chooseCookiedCompany";

export const chooseCookiedCompanyReducer = (state: IState, action: IChooseCookiedCompanyAction): IState => ({
    ...state,

    navigationState: {
        ...state.navigationState,

        companyId: action.company.id,
        name: action.company.name,
    },
});
