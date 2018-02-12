import {CHANGE_PROMO_VALUE} from "../../constants";
import {Action} from "redux";

export interface IChangeValueAction extends Action {
    value: string;
}

export const changeValueAction = (value: string): IChangeValueAction => ({
    type: CHANGE_PROMO_VALUE,
    value,
});
