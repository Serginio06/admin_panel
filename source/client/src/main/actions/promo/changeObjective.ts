import {CHANGE_PROMO_OBJECTIVE} from "../../constants";
import {Action} from "redux";
import {PromoObjective} from "../../../../../types/constants/PromoObjective";

export interface IChangeObjectiveAction extends Action {
    objective: PromoObjective;
}

export const changeObjectiveAction = (objective: PromoObjective): IChangeObjectiveAction => ({
    objective,
    type: CHANGE_PROMO_OBJECTIVE,
});
