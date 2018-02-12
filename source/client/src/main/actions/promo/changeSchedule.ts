import {CHANGE_PROMO_SCHEDULE} from "../../constants";
import {Action} from "redux";

export interface IChangeScheduleAction extends Action {
    scheduleType: string;
}

export const changeScheduleAction = (scheduleType: string): IChangeScheduleAction => ({
    scheduleType,
    type: CHANGE_PROMO_SCHEDULE,
});
