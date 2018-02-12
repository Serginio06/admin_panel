import {CHANGE_PROMO_FINISH_DATE_TIME} from "../../constants";
import {Action} from "redux";

export interface IChangeFinishDateTimeAction extends Action {
    finishDateTime: string;
}

export const changeFinishDateTimeAction = (finishDateTime: string): IChangeFinishDateTimeAction => ({
    finishDateTime,
    type: CHANGE_PROMO_FINISH_DATE_TIME,
});
