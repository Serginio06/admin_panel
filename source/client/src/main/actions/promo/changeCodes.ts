import {CHANGE_PROMO_CODES} from "../../constants";
import {Action} from "redux";

export interface IChangeCodesAction extends Action {
    codes: string;
}

export const changeCodesAction = (codes: string): IChangeCodesAction => ({
    codes,
    type: CHANGE_PROMO_CODES,
});
