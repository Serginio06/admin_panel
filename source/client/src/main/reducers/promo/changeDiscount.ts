import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyProduct, ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeDiscountAction} from "../../actions/promo/changeDiscount";

export function changeDiscountReducer(state: IState, action: IChangeDiscountAction): IState {
    let discountValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let discountValidationMessage: string = "";
    let discount: string = action.discount;
    let priceAfterDiscount: string = state.promoPageState.priceAfterDiscount;
    let value: string = state.promoPageState.value;

    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice(); //@todo why am i working?

    if (!/^\d{0,2}$/.test(discount)) {
        return {...state};
    }

    if (discount && discount.charAt(0) === "0" && discount.length > 1) {
        discount = discount.charAt(1);
    }

    if (!discount || discount.length === 0) {
        discountValidationLevel = VALIDATION_LEVEL_ERROR;
        discountValidationMessage = "Field must be filled";
    }

    if (state.promoPageState.productId) {
        const products: ICompanyProduct[] = state.companyProducts;

        for (const product of products) {
            if (product._id === state.promoPageState.productId) {
                if (product.price) {
                    priceAfterDiscount = (+product.price - (+product.price / 100 * +discount)).toString();
                    if (priceAfterDiscount.toString().indexOf(".") !== -1) {
                        const _priceAfterDiscount: string[] = priceAfterDiscount.toString().split(".");
                        _priceAfterDiscount[1] = _priceAfterDiscount[1].substr(0, 2);
                        if (_priceAfterDiscount[1].length < 2) {
                            _priceAfterDiscount[1] += "0";
                        }

                        priceAfterDiscount = _priceAfterDiscount.join(".");
                    }

                    value = (+product.price - +priceAfterDiscount).toString();
                    if (value.toString().indexOf(".") !== -1) {
                        const _value: string[] = value.toString().split(".");
                        _value[1] = _value[1].substr(0, 2);
                        value = _value.join(".");
                    }
                    break;
                }
            }
        }
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.discount = discount;
            promo.value = value;
            promo.priceAfterDiscount = priceAfterDiscount;
            break;
        }
    }

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 2,
            steps,

            discount,
            discountValidationLevel,
            discountValidationMessage,
            isEditable,

            value,
            valueValidationLevel: VALIDATION_LEVEL_SUCCESS,
            valueValidationMessage: "",

            priceAfterDiscount,
        },
    };
}
