import {Action} from "redux";
import {CHANGE_PRICE_AFTER_DISCOUNT} from "../../constants";

export interface IChangePriceAfterDiscountAction extends Action {
    priceAfterDiscount: string;
}

export const changePriceAfterDiscountAction = (priceAfterDiscount: string): IChangePriceAfterDiscountAction => {
    return {
        type: CHANGE_PRICE_AFTER_DISCOUNT,
        priceAfterDiscount,
    };
};
