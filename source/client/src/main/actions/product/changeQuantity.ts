import {CHANGE_PRODUCT_QUANTITY} from "../../constants";
import {Action} from "redux";

export interface IChangeQuantityAction extends Action {
    quantity: string;
}

export function changeQuantityAction(quantity: string): IChangeQuantityAction {
    return {
        quantity,
        type: CHANGE_PRODUCT_QUANTITY,
    };
}
