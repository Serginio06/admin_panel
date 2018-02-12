import {Action} from "redux";
import {CHOOSE_COMPANY_TO_EDIT} from "../../constants";

export const chooseCompany2EditAction = (): Action => {
    return {
        type: CHOOSE_COMPANY_TO_EDIT,
    }
};
