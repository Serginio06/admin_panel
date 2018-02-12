import {CHANGE_SOCIAL_LINK} from "../../constants";
import {Action} from "redux";

export interface IChangeSocialLinkAction extends Action {
    index: number;
    link: string;
}

export const changeSocialLinkAction = (index: number, link: string): IChangeSocialLinkAction => ({
    index,
    link,
    type: CHANGE_SOCIAL_LINK,
});
