import {Action} from "redux";
import {CHANGE_LOGIN} from "../../constants";

export interface ILoginAction extends Action {
    login: string;
}

export function changeLoginAction(login: string): ILoginAction {
    return {
        login,
        type: CHANGE_LOGIN,
    };
}
