import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyProduct, ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeSeparateProductIdAction} from "../../actions/promo/changeSeparateProductId";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";

export function changeSeparateProductIdReducer(state: IState, action: IChangeSeparateProductIdAction): IState {
    let separateProductIdValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let separateProductIdValidationMessage: string = "";
    let promoPrice: string = "0.00";
    let priceAfterDiscount: string = state.promoPageState.priceAfterDiscount;
    let value: string = "";

    const companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    const separateProductId: string = action.separateProductId;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!separateProductId) {
        separateProductIdValidationLevel = VALIDATION_LEVEL_ERROR;
        separateProductIdValidationMessage = "Field must be filled";
    }

    for (const product of companyProducts) {
        if (product._id === separateProductId) {
            if (product.price) {
                promoPrice = product.price;

                if (state.promoPageState.discount) {
                    priceAfterDiscount = (+product.price - (+product.price / 100 * +state.promoPageState.discount)).toString();
                    if (priceAfterDiscount.toString().indexOf(".") !== -1) {
                        const _priceAfterDiscount: string[] = priceAfterDiscount.toString().split(".");
                        _priceAfterDiscount[1] = _priceAfterDiscount[1].substr(0, 2);

                        priceAfterDiscount = _priceAfterDiscount.join(".");
                    }

                    value = (+product.price - +priceAfterDiscount).toString();
                    if (value.indexOf(".") !== -1) {
                        value = parseFloat(value).toFixed(2).toString();
                    }
                }
                break;
            }
        }
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.separateProductId = separateProductId;
            promo.value = value;
            promo.priceAfterDiscount = priceAfterDiscount;
            break;
        }
    }

    steps[1].isCompleted = state.promoPageState.productId !== ""
        && state.promoPageState.productIdValidationMessage === ""
        && state.promoPageState.rewardType !== null
        && state.promoPageState.rewardTypeValidationMessage === ""
        && state.promoPageState.productObject !== ""
        && state.promoPageState.productObjectValidationMessage === "";

    if (state.promoPageState.rewardType === PromoRewardType.SEPARATE_PRODUCT) {
        steps[1].isCompleted = steps[1].isCompleted
            && separateProductId !== ""
            && separateProductIdValidationMessage === "";
    }

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 1,
            steps,

            isEditable,
            separateProductId,
            separateProductIdValidationLevel,
            separateProductIdValidationMessage,
            value,
            priceAfterDiscount,
            price: +promoPrice,
        },
    };
}
