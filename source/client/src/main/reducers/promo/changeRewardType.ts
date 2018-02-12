import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeRewardTypeAction} from "../../actions/promo/changeRewardType";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";

export function changeRewardTypeReducer(state: IState, action: IChangeRewardTypeAction): IState {
    let rewardTypeValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let rewardTypeValidationMessage: string = "";

    const rewardType: PromoRewardType = action.rewardType;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!rewardType) {
        rewardTypeValidationLevel = VALIDATION_LEVEL_ERROR;
        rewardTypeValidationMessage = "Field must be filled";
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.rewardType = rewardType;
            break;
        }
    }

    steps[1].isCompleted = state.promoPageState.productId !== ""
        && state.promoPageState.productIdValidationMessage === ""
        && rewardType !== null
        && rewardTypeValidationMessage === ""
        && state.promoPageState.productObject !== ""
        && state.promoPageState.productObjectValidationMessage === "";

    if (rewardType === PromoRewardType.SEPARATE_PRODUCT) {
        steps[1].isCompleted = steps[1].isCompleted
            && state.promoPageState.separateProductId !== ""
            && state.promoPageState.separateProductIdValidationMessage === "";
    }

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 1,
            steps,

            isEditable,
            rewardType,
            rewardTypeValidationLevel,
            rewardTypeValidationMessage,
        },
    };
}
