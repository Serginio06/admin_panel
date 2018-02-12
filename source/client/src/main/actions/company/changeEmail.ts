import {CHANGE_COMPANY_EMAIL} from "../../constants";
import {Action} from "redux";

export interface IChangeEmailAction extends Action {
    email: string;
}

export function changeEmailAction(email: string): IChangeEmailAction {
    return {
        email,
        type: CHANGE_COMPANY_EMAIL,
    };
}
