import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeTermsAction} from "../../actions/promo/changeTerms";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";

export function changeTermsReducer(state: IState, action: IChangeTermsAction): IState {
    let termsValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let termsValidationMessage: string = "";

    const terms: string = action.terms;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!terms || terms.length === 0) {
        termsValidationLevel = VALIDATION_LEVEL_ERROR;
        termsValidationMessage = "Field must be filled";
    }
    // else if (terms.length > 200) {
    //     termsValidationLevel = VALIDATION_LEVEL_ERROR;
    //     termsValidationMessage = "Too long value";
    // }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.terms = terms;
            break;
        }
    }

    steps[2].isCompleted = state.promoPageState.offerPhrase !== ""
        && state.promoPageState.offerPhraseValidationMessage === ""
        && state.promoPageState.about !== ""
        && state.promoPageState.aboutValidationMessage === ""
        && terms !== ""
        && termsValidationMessage === ""
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

    if (state.promoPageState.rewardType === PromoRewardType.SEPARATE_PRODUCT) {
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

            isEditable,

            terms,
            termsValidationLevel,
            termsValidationMessage,
        },
    };
}
