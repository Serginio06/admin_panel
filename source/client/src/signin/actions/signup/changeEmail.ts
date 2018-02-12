import {Action} from "redux";
import {CHANGE_EMAIL} from "../../constants";

export interface IEmailAction extends Action {
    email: string;
}

export function changeEmailAction(email: string): IEmailAction {
    return {
        email,
        type: CHANGE_EMAIL,
    };
}
