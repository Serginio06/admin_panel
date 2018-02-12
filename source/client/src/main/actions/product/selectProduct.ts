import {Action} from "redux";
import {SELECT_PRODUCT} from "../../constants";

export interface ISelectProductAction extends Action {
    productId: string;
}

export const selectProductAction = (productId: string): ISelectProductAction => {
    return {
        type: SELECT_PRODUCT,
        productId,
    }
};
