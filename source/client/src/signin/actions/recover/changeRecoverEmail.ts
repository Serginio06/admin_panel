import {CHANGE_RECOVER_EMAIL} from "../../constants";
import {Action} from "redux";

export interface IChangeRecoverEmailAction extends Action {
    email: string,
}

export const changeRecoverEmailAction = (email: string): IChangeRecoverEmailAction => ({
    email,
    type: CHANGE_RECOVER_EMAIL,
});
