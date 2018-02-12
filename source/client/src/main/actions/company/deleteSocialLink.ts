import {DELETE_SOCIAL_LINK} from "../../constants";
import {Action} from "redux";

export interface IDeleteSocialLinkAction extends Action {
    index: number;
}

export const deleteSocialLinkAction = (index: number): IDeleteSocialLinkAction => ({
    index,
    type: DELETE_SOCIAL_LINK,
});
