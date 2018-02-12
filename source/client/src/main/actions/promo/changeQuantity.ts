import {CHANGE_PROMO_QUANTITY} from "../../constants";
import {Action} from "redux";

export interface IChangeQuantityAction extends Action {
    quantity: string;
}

export const changeQuantityAction = (quantity: string): IChangeQuantityAction => ({
    quantity,
    type: CHANGE_PROMO_QUANTITY,
});
