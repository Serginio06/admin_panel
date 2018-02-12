import {CHANGE_PROMO_TERMS} from "../../constants";
import {Action} from "redux";

export interface IChangeTermsAction extends Action {
    terms: string;
}

export const changeTermsAction = (terms: string): IChangeTermsAction => ({
    terms,
    type: CHANGE_PROMO_TERMS,
});
