import {Action} from "redux";
import {SELECT_PROMO} from "../../constants";

export interface ISelectPromoAction extends Action {
    promoId: string;
}

export const selectPromoAction = (promoId: string): ISelectPromoAction => ({
    type: SELECT_PROMO,
    promoId,
});
