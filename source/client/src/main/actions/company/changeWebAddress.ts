import {CHANGE_COMPANY_WEB_ADDRESS} from "../../constants";
import {Action} from "redux";

export interface IChangeWebAddressAction extends Action {
    webAddress: string;
}

export function changeWebAddressAction(webAddress: string): IChangeWebAddressAction {
    return {
        type: CHANGE_COMPANY_WEB_ADDRESS,
        webAddress,
    };
}
