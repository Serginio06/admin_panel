import {CHANGE_PROMO_REWARD_TYPE} from "../../constants";
import {Action} from "redux";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";

export interface IChangeRewardTypeAction extends Action {
    rewardType: PromoRewardType;
}

export const changeRewardTypeAction = (rewardType: PromoRewardType): IChangeRewardTypeAction => ({
    rewardType,
    type: CHANGE_PROMO_REWARD_TYPE,
});
