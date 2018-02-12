import {CHANGE_PRODUCT_NAME} from "../../constants";
import {Action} from "redux";

export interface IChangeNameAction extends Action {
    name: string;
}

export function changeNameAction(name: string): IChangeNameAction {
    return {
        name,
        type: CHANGE_PRODUCT_NAME,
    };
}
