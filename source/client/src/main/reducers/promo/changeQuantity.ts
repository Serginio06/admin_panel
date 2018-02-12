import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeQuantityAction} from "../../actions/promo/changeQuantity";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";

export function changeQuantityReducer(state: IState, action: IChangeQuantityAction): IState {
    const quantityValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    const quantityValidationMessage: string = "";
    const quantity: string = action.quantity;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const codes: string = state.promoPageState.codes;
    const isUnlimited: boolean = state.promoPageState.isUnlimited;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    let codesValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let codesValidationMessage: string = "";
    let codesArray: string[] = [];

    if (!/^\d{1,4}$/.test(quantity) && quantity !== "") {
        return {...state};
    }

    if (codes) {
        codesArray = codes.split("\n");
    }

    if (isUnlimited && codesArray.length !== 1) {
        codesValidationLevel = VALIDATION_LEVEL_ERROR;
        codesValidationMessage = "You have to insert one promo code";
    } else if (!isUnlimited && codesArray.length !== +quantity) {
        codesValidationLevel = VALIDATION_LEVEL_ERROR;
        codesValidationMessage = "You need as much promo codes, as you said in `Quantity` section";
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.quantity = quantity;
            break;
        }
    }

    steps[2].isCompleted = state.promoPageState.offerPhrase !== ""
        && state.promoPageState.offerPhraseValidationMessage === ""
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
            && quantity !== ""
            && quantityValidationMessage === "";
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

            isEditable,
            quantity,
            quantityValidationLevel,
            quantityValidationMessage,

            codesValidationLevel,
            codesValidationMessage,
        },
    };
}
