import {Action} from "redux";
import {SELECT_COMPANY} from "../../constants";

export interface ISelectCompanyAction extends Action {
    companyId: string;
}

export const selectCompanyAction = (companyId: string): ISelectCompanyAction => {
    return {
        type: SELECT_COMPANY,
        companyId,
    }
};
