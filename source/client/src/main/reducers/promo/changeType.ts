import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeTypeAction} from "../../actions/promo/changeType";
import {PromoType} from "../../../../../types/constants/PromoType";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";
import {PromoCodeType} from "../../../../../types/constants/PromoCodeType";

export const changeTypeReducer = (state: IState, action: IChangeTypeAction): IState => {
    let typeValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let typeValidationMessage: string = "";

    const type: PromoType = action.promoType;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!type || type === null || type.length === 0) {
        typeValidationLevel = VALIDATION_LEVEL_ERROR;
        typeValidationMessage = "Field must be filled";
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.type = type;
            break;
        }
    }

    steps[2].isCompleted = state.promoPageState.offerPhrase !== ""
        && state.promoPageState.offerPhraseValidationMessage === ""
        && state.promoPageState.about !== ""
        && state.promoPageState.aboutValidationMessage === ""
        && state.promoPageState.terms !== ""
        && state.promoPageState.termsValidationMessage === ""
        && type !== null
        && typeValidationMessage === ""
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

    if (state.promoPageState.codeType === PromoCodeType.CODE) {
        steps[2].isCompleted = steps[2].isCompleted
            && state.promoPageState.codes !== ""
            && state.promoPageState.codesValidationMessage === "";
    }

    if (state.promoPageState.codeType === PromoCodeType.BAR_QR) {
        steps[2].isCompleted = steps[2].isCompleted
            && state.promoPageState.imgCode !== "";
    }

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 2,
            steps,

            isEditable,
            type,
            typeValidationLevel,
            typeValidationMessage,
        },
    };
};
