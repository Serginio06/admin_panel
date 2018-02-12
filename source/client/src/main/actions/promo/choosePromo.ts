import {CHOOSE_PROMO} from "../../constants";
import {Action} from "redux";

export interface IChoosePromoAction extends Action {
    _id: string;
}

export const choosePromoAction = (_id: string): IChoosePromoAction => ({
    _id,
    type: CHOOSE_PROMO,
});
