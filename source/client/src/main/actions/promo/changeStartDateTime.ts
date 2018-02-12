import {CHANGE_PROMO_START_DATE_TIME} from "../../constants";
import {Action} from "redux";

export interface IChangeStartDateTimeAction extends Action {
    startDateTime: string;
}

export const changeStartDateTimeAction = (startDateTime: string): IChangeStartDateTimeAction => ({
    startDateTime,
    type: CHANGE_PROMO_START_DATE_TIME,
});
