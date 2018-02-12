import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeProductObjectAction} from "../../actions/promo/changeProductObject";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";

export function changeProductObjectReducer(state: IState, action: IChangeProductObjectAction): IState {
    let productObjectValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let productObjectValidationMessage: string = "";

    const productObject: string = action.productObject;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const productId: string = state.promoPageState.productObject === productObject ? state.promoPageState.productObject : "";
    const price: number = productId === "" ? 0 : state.promoPageState.price;
    const priceAfterDiscount: string = productId === "" ? "0" : state.promoPageState.priceAfterDiscount;
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!productObject || productObject.length === 0) {
        productObjectValidationLevel = VALIDATION_LEVEL_ERROR;
        productObjectValidationMessage = "Field must be filled";
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.productObject = productObject;
            break;
        }
    }

    steps[1].isCompleted = productId !== ""
        && state.promoPageState.rewardType !== null
        && state.promoPageState.rewardTypeValidationMessage === ""
        && productObject !== ""
        && productObjectValidationMessage === "";

    if (state.promoPageState.rewardType === PromoRewardType.SEPARATE_PRODUCT) {
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

            price,
            priceAfterDiscount,
            productId,

            productObject,
            productObjectValidationLevel,
            productObjectValidationMessage,

            isEditable,
        },
    };
}
