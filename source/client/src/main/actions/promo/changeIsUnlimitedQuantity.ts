import {CHANGE_PROMO_IS_UNLIMITED_QUANTITY} from "../../constants";
import {Action} from "redux";

export interface IChangeIsUnlimitedQuantityAction extends Action {
    isUnlimited: boolean;
}

export const changeIsUnlimitedQuantityAction = (isUnlimited: boolean): IChangeIsUnlimitedQuantityAction => ({
    isUnlimited,
    type: CHANGE_PROMO_IS_UNLIMITED_QUANTITY,
});
