import {CHANGE_PROMO_SEPARATE_PRODUCT_ACTION} from "../../constants"
import {Action} from "redux";

export interface IChangeSeparateProductIdAction extends Action {
    separateProductId: string;
}

export const changeSeparateProductIdAction = (separateProductId: string): IChangeSeparateProductIdAction => ({
    separateProductId,
    type: CHANGE_PROMO_SEPARATE_PRODUCT_ACTION,
});
