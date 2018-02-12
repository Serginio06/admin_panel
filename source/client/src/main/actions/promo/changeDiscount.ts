import {CHANGE_PROMO_DISCOUNT} from "../../constants";
import {Action} from "redux";

export interface IChangeDiscountAction extends Action {
    discount: string;
}

export const changeDiscountAction = (discount: string): IChangeDiscountAction => ({
    discount,
    type: CHANGE_PROMO_DISCOUNT,
});
