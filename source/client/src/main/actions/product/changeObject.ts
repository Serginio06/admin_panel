import {CHANGE_PRODUCT_OBJECT} from "../../constants";
import {Action} from "redux";

export interface IChangeObjectAction extends Action {
    object: string;
}

export function changeObjectAction(object: string): IChangeObjectAction {
    return {
        object,
        type: CHANGE_PRODUCT_OBJECT,
    };
}
