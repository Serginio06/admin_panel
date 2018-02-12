import {CHANGE_PROMO_PRODUCT_OBJECT} from "../../constants";
import {Action} from "redux";

export interface IChangeProductObjectAction extends Action {
    productObject: string;
}

export const changeProductObjectAction = (productObject: string): IChangeProductObjectAction => ({
    productObject,
    type: CHANGE_PROMO_PRODUCT_OBJECT,
});
