import {CHANGE_PRODUCT_IS_UNLIMITED_DATE} from "../../constants";
import {Action} from "redux";

export interface IChangeIsUnlimitedProductDateAction extends Action {
    isUnlimitedDate: boolean;
}

export function changeIsUnlimitedProductDateAction(isUnlimitedDate: boolean): IChangeIsUnlimitedProductDateAction {
    return {
        isUnlimitedDate,
        type: CHANGE_PRODUCT_IS_UNLIMITED_DATE,
    };
}
