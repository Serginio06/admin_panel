import {CHANGE_PROMO_TYPE} from "../../constants";
import {Action} from "redux";
import {PromoType} from "../../../../../types/constants/PromoType";

export interface IChangeTypeAction extends Action {
    promoType: PromoType;
}

export const changeTypeAction = (promoType: PromoType): IChangeTypeAction => ({
    promoType,
    type: CHANGE_PROMO_TYPE,
});
