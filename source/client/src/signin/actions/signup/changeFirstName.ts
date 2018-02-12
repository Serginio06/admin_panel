import {CHANGE_FIRST_NAME} from "../../constants";
import {Action} from "redux";

export interface IFirstNameAction extends Action {
    firstName: string,
}

export function changeFirstNameAction(firstName: string): IFirstNameAction {
    return {
        firstName,
        type: CHANGE_FIRST_NAME,
    };
}
