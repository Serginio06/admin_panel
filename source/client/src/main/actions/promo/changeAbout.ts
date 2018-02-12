import {CHANGE_PROMO_ABOUT} from "../../constants";
import {Action} from "redux";

export interface IChangeAboutAction extends Action {
    about: string;
}

export const changeAboutAction = (about: string): IChangeAboutAction => ({
    about,
    type: CHANGE_PROMO_ABOUT,
});
