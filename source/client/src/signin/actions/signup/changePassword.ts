import {CHANGE_PASSWORD} from "../../constants";
import {Action} from "redux";

export interface IPasswordAction extends Action {
    password: string,
}

export function changePasswordAction(password: string): IPasswordAction {
    return {
        password,
        type: CHANGE_PASSWORD,
    };
}
