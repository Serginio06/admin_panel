import {CHANGE_PROMO_PRICING} from "../../constants";
import {Action} from "redux";

export interface IChangePricingAction extends Action {
    pricing: string;
}

export const changePricingAction = (pricing: string): IChangePricingAction => ({
    pricing,
    type: CHANGE_PROMO_PRICING,
});
