import {CHOOSE_PRODUCT} from "../../constants";
import {Action} from "redux";

export interface IChooseProductAction extends Action {
    productId: string;
}

export const chooseProductAction = (productId: string): IChooseProductAction => ({
    productId,
    type: CHOOSE_PRODUCT,
});
