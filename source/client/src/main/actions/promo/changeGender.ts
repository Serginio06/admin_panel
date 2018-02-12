import {CHANGE_PROMO_GENDER} from "../../constants";
import {Action} from "redux";
import {PromoTargetGender} from "../../../../../types/constants/PromoTargetGender";

export interface IChangeGenderAction extends Action {
    gender: PromoTargetGender;
}

export const changeGenderAction = (gender: PromoTargetGender): IChangeGenderAction => ({
    gender,
    type: CHANGE_PROMO_GENDER,
});
