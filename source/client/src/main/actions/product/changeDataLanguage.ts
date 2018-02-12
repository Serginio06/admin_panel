import {CHANGE_PRODUCT_DATA_LANGUAGE} from "../../constants";
import {Action} from "redux";

export const changeDataLanguageAction = (): Action => ({
    type: CHANGE_PRODUCT_DATA_LANGUAGE,
});
