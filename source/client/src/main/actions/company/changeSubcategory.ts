import {CHANGE_COMPANY_SUBCATEGORY} from "../../constants";
import {Action} from "redux";
import {SubcategoryLevel} from "../../constants/SubcategoryLevel";

export interface IChangeSubcategoryAction extends Action {
    companySubcategoryId: string;
    subcategoryLevel: SubcategoryLevel;
}

export function changeSubcategoryAction(companySubcategoryId: string, subcategoryLevel: SubcategoryLevel): IChangeSubcategoryAction {
    return {
        companySubcategoryId,
        subcategoryLevel,
        type: CHANGE_COMPANY_SUBCATEGORY,
    };
}
