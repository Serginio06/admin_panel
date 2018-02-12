import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeOfferPhraseAction} from "../../actions/promo/changeOfferPhrase";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";

export function changeOfferPhraseReducer(state: IState, action: IChangeOfferPhraseAction): IState {
    let offerPhraseValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let offerPhraseValidationMessage: string = "";

    const offerPhrase: string = action.offerPhrase;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!offerPhrase || offerPhrase.length === 0) {
        offerPhraseValidationLevel = VALIDATION_LEVEL_ERROR;
        offerPhraseValidationMessage = "Field must be filled";
    }
    // else if (offerPhrase.length > 30) {
    //     offerPhraseValidationLevel = VALIDATION_LEVEL_ERROR;
    //     offerPhraseValidationMessage = "Too long value";
    // }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.offerPhrase = offerPhrase;
            break;
        }
    }

    steps[2].isCompleted = offerPhrase !== ""
        && offerPhraseValidationMessage === ""
        && state.promoPageState.about !== ""
        && state.promoPageState.aboutValidationMessage === ""
        && state.promoPageState.terms !== ""
        && state.promoPageState.termsValidationMessage === ""
        && state.promoPageState.type !== ""
        && state.promoPageState.typeValidationMessage === ""
        && state.promoPageState.condition !== ""
        && state.promoPageState.conditionValidationMessage === ""
        && state.promoPageState.value !== ""
        && state.promoPageState.valueValidationMessage === ""
        && state.promoPageState.codeType !== ""
        && state.promoPageState.time2Decide !== null
        && state.promoPageState.time2DecideValidationMessage === "";

    if (!state.promoPageState.isUnlimited) {
        steps[2].isCompleted = steps[2].isCompleted
            && state.promoPageState.quantity !== ""
            && state.promoPageState.quantityValidationMessage === "";
    }

    if (state.promoPageState.rewardType === PromoRewardType.SPECIAL_OFFER) {
        steps[2].isCompleted = steps[2].isCompleted
            && state.promoPageState.discount !== ""
            && state.promoPageState.discountValidationMessage === "";
    }

    if (state.promoPageState.codeType === "PROMO_CODE_TYPE_CODE") {
        steps[2].isCompleted = steps[2].isCompleted
            && state.promoPageState.codes !== ""
            && state.promoPageState.codesValidationMessage === "";
    }

    if (state.promoPageState.codeType === "PROMO_CODE_TYPE_BAR_QR") {
        steps[2].isCompleted = steps[2].isCompleted
            && !!state.promoPageState.imgCode;
    }

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 2,
            steps,

            offerPhrase,
            offerPhraseValidationLevel,
            offerPhraseValidationMessage,

            isEditable,
        },
    };
}
