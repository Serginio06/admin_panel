import {CHANGE_PROMO_TIME_DECIDE} from "../../constants";
import {Action} from "redux";

export interface IChangeTime2DecideAction extends Action {
    time2Decide: string;
}

export const changeTime2DecideAction = (time2Decide: string): IChangeTime2DecideAction => ({
    time2Decide,
    type: CHANGE_PROMO_TIME_DECIDE,
});
