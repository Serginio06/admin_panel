import {CHANGE_PRODUCT_IS_ONLINE} from "../../constants";
import {Action} from "redux";

export interface IChangeIsOnlineAction extends Action {
    isOnline: boolean;
}

export function changeIsOnlineAction(isOnline: boolean): IChangeIsOnlineAction {
    return {
        isOnline,
        type: CHANGE_PRODUCT_IS_ONLINE,
    };
}
