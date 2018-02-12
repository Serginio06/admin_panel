import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeIsUnlimitedQuantityAction} from "../../actions/promo/changeIsUnlimitedQuantity";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";

export const changeIsUnlimitedQuantityReducer = (state: IState, action: IChangeIsUnlimitedQuantityAction): IState => {
    const isUnlimited: boolean = !state.promoPageState.isUnlimited;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const codes: string = state.promoPageState.codes;
    const quantity: string = state.promoPageState.quantity;
    const steps: IStepsState[] = state.promoPageState.steps.slice();
    const promos: ICompanyPromo[] = state.promos.slice();

    let codesValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let codesValidationMessage: string = "";
    let codesArray: string[] = [];

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
            promo.isUnlimited = isUnlimited;
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

    if (!isUnlimited) {
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

            isEditable,
            isUnlimited,

            codesValidationLevel,
            codesValidationMessage,
        },
    };
};
