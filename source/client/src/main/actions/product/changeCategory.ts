import {CHANGE_PRODUCT_CATEGORY} from "../../constants";
import {Action} from "redux";

export interface IChangeCategoryAction extends Action {
    value: string;
}

export const changeCategoryAction = (value: string): IChangeCategoryAction => ({
    type: CHANGE_PRODUCT_CATEGORY,
    value,
});
