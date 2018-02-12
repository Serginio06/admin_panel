import {CHOOSE_PROMO_TO_VIEW} from "../../constants";
import {Action} from "redux";

export interface IChoosePromo2ViewAction extends Action {
    promoId: string;
}

export const choosePromo2ViewAction = (promoId: string): IChoosePromo2ViewAction => ({
    promoId,
    type: CHOOSE_PROMO_TO_VIEW,
});
