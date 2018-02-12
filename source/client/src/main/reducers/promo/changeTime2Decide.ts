import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeTime2DecideAction} from "../../actions/promo/changeTime2Decide";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";
import {PromoCodeType} from "../../../../../types/constants/PromoCodeType";

export function changeTime2DecideReducer(state: IState, action: IChangeTime2DecideAction): IState {
    let time2DecideValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let time2DecideValidationMessage: string = "";
    let time2Decide: string = action.time2Decide;

    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (time2Decide.length > 3) {
        time2Decide = time2Decide.substr(0, 3);
    }

    if (time2Decide) {
        for (let i = 0; i < time2Decide.length; i++) {
            if (!/\d/.test(time2Decide.charAt(i))) {
                time2Decide = time2Decide.substr(0, i) + time2Decide.substr(i + 1);
            }
        }
    }

    if (!time2Decide || time2Decide.length === 0) {
        time2DecideValidationLevel = VALIDATION_LEVEL_ERROR;
        time2DecideValidationMessage = "Field must be filled";
    }
    // else if (time2Decide.length > 30) {
    //     time2DecideValidationLevel = VALIDATION_LEVEL_ERROR;
    //     time2DecideValidationMessage = "Too long value";
    // }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.time2Decide = +time2Decide;
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
        && time2Decide !== null
        && time2DecideValidationMessage === "";

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

    const _time2decide: number = +time2Decide;

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 2,
            steps,

            isEditable,
            time2Decide: _time2decide,
            time2DecideValidationLevel,
            time2DecideValidationMessage,
        },
    };
}
