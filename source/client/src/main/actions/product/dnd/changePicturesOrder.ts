import {CHANGE_PICTURES_ORDER} from "../../../constants";
import {Action} from "redux";

export interface IChangePicturesOrderAction extends Action {
    pictures: string[];
}

export const changePicturesOrderAction = (pictures: string[]): IChangePicturesOrderAction => ({
    pictures,
    type: CHANGE_PICTURES_ORDER,
});
