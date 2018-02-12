import {CHANGE_COMPANY_CATEGORY} from "../../constants";
import {Action} from "redux";

export interface IChangeCategoryAction extends Action {
    categoryId: string;
}

export function changeCategoryAction(categoryId: string): IChangeCategoryAction {
    return {
        categoryId,
        type: CHANGE_COMPANY_CATEGORY,
    };
}