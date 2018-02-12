import {CHANGE_COMPANY_LANGUAGE} from "../../constants";
import {Action} from "redux";

export const changeDataLanguageAction = (): Action => ({
    type: CHANGE_COMPANY_LANGUAGE,
});
