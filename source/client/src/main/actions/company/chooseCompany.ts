import {CHOOSE_COMPANY} from "../../constants";
import {Action} from "redux";

export interface IChooseCompanyAction extends Action {
    companyId: string;
    forEdit: boolean;
}

export const chooseCompanyAction = (companyId: string, forEdit: boolean): IChooseCompanyAction => ({
    companyId,
    forEdit,
    type: CHOOSE_COMPANY,
});
