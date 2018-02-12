import {CHANGE_PRODUCT_IS_UNLIMITED} from "../../constants";
import {Action} from "redux";

export interface IChangeIsUnlimitedQuantityAction extends Action {
    isUnlimitedQuantity: boolean;
}

export function changeIsUnlimitedQuantityAction(isUnlimitedQuantity: boolean): IChangeIsUnlimitedQuantityAction {
    return {
        isUnlimitedQuantity,
        type: CHANGE_PRODUCT_IS_UNLIMITED,
    };
}
