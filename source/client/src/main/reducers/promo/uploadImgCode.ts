import {
    VALIDATION_LEVEL_ERROR,
    VALIDATION_LEVEL_SUCCESS,
} from "../../../common/constants/ValidationLevelType";
import {getErrorText} from "../../../common/util/errorUtil";
import {ICompanyPromo, IState} from "../../state";
import {IFailedAction} from "../../../common/actions";
import {IUploadImgCodeSuccessAction} from "../../actions/promo/uploadImgCode";
import {PromoCodeType} from "../../../../../types/constants/PromoCodeType";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";

export function uploadImgCodeFailed(state: IState, action: IFailedAction): IState {
    return {
        ...state,

        promoPageState: {
            ...state.promoPageState,

            // imgCodeValidationLevel: VALIDATION_LEVEL_ERROR,
            // imgCodeValidationMessage: getErrorText(action.errorCode),
        },
    };
}

export function uploadImgCodeSuccess(state: IState, action: IUploadImgCodeSuccessAction): IState {
    const codeType: string = state.promoPageState.codeType;
    const imgCode: any = action.imgCode;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps = state.promoPageState.steps.slice();

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.imgCode = imgCode;
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
        && imgCode !== null
        && state.promoPageState.time2Decide !== null
        && state.promoPageState.time2DecideValidationMessage === "";
    console.log(steps[2].isCompleted);

    if (!state.promoPageState.isUnlimited) {
        steps[2].isCompleted = steps[2].isCompleted
            && state.promoPageState.quantity !== ""
            && state.promoPageState.quantityValidationMessage === "";
    }
    console.log(steps[2].isCompleted);

    if (state.promoPageState.rewardType === PromoRewardType.SPECIAL_OFFER) {
        steps[2].isCompleted = steps[2].isCompleted
            && state.promoPageState.discount !== ""
            && state.promoPageState.discountValidationMessage === "";
    }
    console.log(steps[2].isCompleted);

    if (codeType === "PROMO_CODE_TYPE_BAR_QR" && imgCode) {
        steps[2].isCompleted = steps[2].isCompleted
            && !!imgCode;
    }
    console.log("===", steps[2].isCompleted);

    return {
        ...state,
        promos,
        promoPageState: {
            ...state.promoPageState,

            currentStep: 2,
            steps,
            isEditable,
            imgCode: action.imgCode,
            imgCodeValidationLevel: VALIDATION_LEVEL_SUCCESS,
            imgCodeValidationMessage: "",
        },
    };
}
