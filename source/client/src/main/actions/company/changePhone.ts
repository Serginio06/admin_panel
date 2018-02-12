import {CHANGE_COMPANY_PHONE} from "../../constants";
import {Action} from "redux";

export interface IChangePhoneAction extends Action {
    phone: string;
}

export function changePhoneAction(phone: string): IChangePhoneAction {
    return {
        phone,
        type: CHANGE_COMPANY_PHONE,
    };
}
