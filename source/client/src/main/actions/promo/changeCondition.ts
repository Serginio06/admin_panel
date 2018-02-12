import {CHANGE_PROMO_CONDITION} from "../../constants";
import {PromoCondition} from "../../../../../types/constants/PromoCondition";
import {Action} from "redux";

export interface IChangeConditionAction extends Action {
    condition: PromoCondition;
}

export const changeConditionAction = (condition: PromoCondition): IChangeConditionAction => ({
    condition,
    type: CHANGE_PROMO_CONDITION,
});
