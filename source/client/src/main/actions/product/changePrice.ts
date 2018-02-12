import {CHANGE_PRODUCT_PRICE} from "../../constants";
import {Action} from "redux";

export interface IChangePriceAction extends Action {
    price: string,
}

export function changePriceAction(price: string): IChangePriceAction {
    return {
        price,
        type: CHANGE_PRODUCT_PRICE,
    };
}
