import {NEW_PROMO} from "../../constants";
import {Action} from "redux";

export const newPromoAction = (): Action => ({
    type: NEW_PROMO,
});
