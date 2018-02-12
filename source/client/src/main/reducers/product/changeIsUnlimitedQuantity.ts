import {ICompanyProduct, IState} from "../../state";
import {IChangeIsUnlimitedQuantityAction} from "../../actions/product/changeIsUnlimitedQuantity";

export function changeIsUnlimitedQuantity(state: IState, action: IChangeIsUnlimitedQuantityAction): IState {
    let quantity: string = "",
        quantityValidationLevel: string = "",
        quantityValidationMessage: string = "";

    const isUnlimitedQuantity: boolean = action.isUnlimitedQuantity,
        isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId,
        companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    if (isUnlimitedQuantity) {
        quantity = "";
        quantityValidationLevel = "";
        quantityValidationMessage = "";
    } else {
        quantity = state.productPageState.quantity;
        quantityValidationLevel = state.productPageState.quantityValidationLevel;
        quantityValidationMessage = state.productPageState.quantityValidationMessage;
    }

    for (const product of companyProducts) {
        if (product._id === "0" || (isEditable && product._id === productId)) {
            product.isUnlimited = isUnlimitedQuantity;
            break;
        }
    }

    return {
        ...state,

        companyProducts,

        productPageState: {
            ...state.productPageState,

            isUnlimitedQuantity,
            quantity,
            quantityValidationLevel,
            quantityValidationMessage,
        },
    };
}
