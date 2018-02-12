import {CHANGE_SHOW_ON_CARD} from "../../constants";
import {Action} from "redux";
import {FieldOnCardType} from "../../constants/FiledOnCardType";

export interface IChangeShowOnCardAction extends Action {
    fieldType: FieldOnCardType;
}

export const changeShowOnCardAction = (fieldType: FieldOnCardType): IChangeShowOnCardAction => ({
    fieldType,
    type: CHANGE_SHOW_ON_CARD,
});
