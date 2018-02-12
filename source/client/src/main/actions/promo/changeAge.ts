import {CHANGE_PROMO_AGE} from "../../constants";
import {Action} from "redux";
import {PromoTargetAge} from "../../../../../types/constants/PromoTargetAge";

export interface IChangeAgeAction extends Action {
    ages: PromoTargetAge[];
}

export const changeAgeAction = (ages: PromoTargetAge[]): IChangeAgeAction => ({
    ages,
    type: CHANGE_PROMO_AGE,
});
