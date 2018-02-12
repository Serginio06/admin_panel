import {CHANGE_PROMO_CURRENT_STEP} from "../../constants";
import {Action} from "redux";

export interface IChangeCurrentStepAction extends Action {
    step: number;
}

export const changeCurrentStepAction = (step: number): IChangeCurrentStepAction => ({
    step,
    type: CHANGE_PROMO_CURRENT_STEP,
});
