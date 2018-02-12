import {DELETE_PRODUCT_PICTURE} from "../../../constants";
import {Action} from "redux";

export interface IDeletePictureAction extends Action {
    index: string;
}

export const deletePictureAction = (index: string): IDeletePictureAction => ({
    index,
    type: DELETE_PRODUCT_PICTURE,
});
