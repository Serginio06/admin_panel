import {CHANGE_PROMO_PRODUCT_ID} from "../../constants";
import {Action} from "redux";

export interface IChangeProductIdAction extends Action {
    productId: string;
}

export const changeProductIdAction = (productId: string): IChangeProductIdAction => ({
    productId,
    type: CHANGE_PROMO_PRODUCT_ID,
});
