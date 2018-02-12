import {CHANGE_PROMO_NAME} from "../../constants";
import {Action} from "redux";

export interface IChangeNameAction extends Action {
    name: string;
}

export const changeNameAction = (name: string): IChangeNameAction => ({
    name,
    type: CHANGE_PROMO_NAME,
});
