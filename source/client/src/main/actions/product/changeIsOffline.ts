import {CHANGE_PRODUCT_IS_OFFLINE} from "../../constants";
import {Action} from "redux";

export interface IChangeIsOfflineAction extends Action {
    isOffline: boolean;
}

export function changeIsOfflineAction(isOffline: boolean): IChangeIsOfflineAction {
    return {
        isOffline,
        type: CHANGE_PRODUCT_IS_OFFLINE,
    };
}
