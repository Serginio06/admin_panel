import {CHANGE_PROMO_INTEREST} from "../../constants";
import {Action} from "redux";
import {PromoTargetInterest} from "../../../../../types/constants/PromoTargetInterest";

export interface IChangeInterestsAction extends Action {
    interests: PromoTargetInterest[];
}

export const changeInterestAction = (interests: PromoTargetInterest[]): IChangeInterestsAction => ({
    interests,
    type: CHANGE_PROMO_INTEREST,
});
