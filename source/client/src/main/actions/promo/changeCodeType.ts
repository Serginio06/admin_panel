import {CHANGE_PROMO_CODE_TYPE} from "../../constants";
import {Action} from "redux";
import {PromoCodeType} from "../../../../../types/constants/PromoCodeType";

export interface IChangeCodeTypeAction extends Action {
    codeType: PromoCodeType;
}

export const changeCodeTypeAction = (codeType: PromoCodeType): IChangeCodeTypeAction => ({
    codeType,
    type: CHANGE_PROMO_CODE_TYPE,
});
