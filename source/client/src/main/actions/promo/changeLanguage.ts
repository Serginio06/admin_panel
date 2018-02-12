import {CHANGE_PROMO_LANGUAGE} from "../../constants";
import {Action} from "redux";
import {PromoTargetLanguage} from "../../../../../types/constants/PromoTargetLanguage";

export interface IChangeLanguageAction extends Action {
    language: PromoTargetLanguage;
}

export const changeLanguageAction = (language: PromoTargetLanguage): IChangeLanguageAction => ({
    language,
    type: CHANGE_PROMO_LANGUAGE,
});
