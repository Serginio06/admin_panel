import {CHANGE_PROMO_OFFER_PHRASE} from "../../constants";
import {Action} from "redux";

export interface IChangeOfferPhraseAction extends Action {
    offerPhrase: string;
}

export const changeOfferPhraseAction = (offerPhrase: string): IChangeOfferPhraseAction => ({
    offerPhrase,
    type: CHANGE_PROMO_OFFER_PHRASE,
});
