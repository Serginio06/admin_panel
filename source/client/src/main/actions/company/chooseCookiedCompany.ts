import {CHOOSE_COOKIED_COMPANY} from "../../constants";
import {ICookiedCompany} from "../../state";
import {Action} from "redux";

export interface IChooseCookiedCompanyAction extends Action {
    company: ICookiedCompany;
}

export const chooseCookiedCompanyAction = (company: ICookiedCompany): IChooseCookiedCompanyAction => ({
    company,
    type: CHOOSE_COOKIED_COMPANY,
});
