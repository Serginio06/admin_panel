import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyProduct, IState} from "../../state";
import {IChangeQuantityAction} from "../../actions/product/changeQuantity";

export function changeQuantityReducer(state: IState, action: IChangeQuantityAction): IState {
    let quantityValidationLevel: string = VALIDATION_LEVEL_SUCCESS,
        quantityValidationMessage: string = "",
        quantity: any = action.quantity; // fixme

    const isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId,
        companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    if (!quantity.isUnlimitedQuantity) { // fixme
        if (!quantity || quantity.length === 0) {
            quantityValidationLevel = VALIDATION_LEVEL_ERROR;
            quantityValidationMessage = "Field must be filled";
        } else if (!quantity.match(/^[0-9]{1,}$/)) {
            quantity = state.productPageState.quantity;
            if (quantity === "") {
                quantityValidationLevel = VALIDATION_LEVEL_ERROR;
                quantityValidationMessage = "Only number allow";
            }
        }
    } else {
        quantity = "";
        quantityValidationLevel = VALIDATION_LEVEL_SUCCESS;
        quantityValidationMessage = "";
    }

    for (const product of companyProducts) {
        if (product._id === "0" || (isEditable && product._id === productId)) {
            product.quantity = quantity;
            break;
        }
    }

    return {
        ...state,

        companyProducts,

        productPageState: {
            ...state.productPageState,

            quantity,
            quantityValidationLevel,
            quantityValidationMessage,
        },
    };
}
