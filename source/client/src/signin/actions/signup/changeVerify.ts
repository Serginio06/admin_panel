import {CHANGE_VERIFY} from "../../constants";
import {Action} from "redux";

export interface IVerifyAction extends Action {
    verify: string,
}

export function changeVerifyAction(verify): IVerifyAction {
    return {
        type: CHANGE_VERIFY,
        verify,
    };
}
