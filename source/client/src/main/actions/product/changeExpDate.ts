import {CHANGE_PRODUCT_EXPDATE} from "../../constants";
import {Action} from "redux";

export interface IChangeExpDateAction extends Action {
    expDate: string;
}

export function changeExpDateAction(expDate: string): IChangeExpDateAction {
    return {
        expDate,
        type: CHANGE_PRODUCT_EXPDATE,
    };
}
