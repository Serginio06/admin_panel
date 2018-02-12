import {ICompanyProduct, IState} from "../../state";
import {IChangeIsUnlimitedProductDateAction} from "../../actions/product/changeIsUnlimitedDate";

export function changeIsUnlimitedDate(state: IState, action: IChangeIsUnlimitedProductDateAction): IState {
    let expDate: string = "",
        expDateValidationLevel: string = "",
        expDateValidationMessage: string = "";

    const isUnlimitedDate: boolean = action.isUnlimitedDate,
        isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId,
        companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    if (isUnlimitedDate) {
        expDate = "";
        expDateValidationLevel = "";
        expDateValidationMessage = "";
    } else {
        expDate = state.productPageState.expDate;
        expDateValidationLevel = state.productPageState.expDateValidationLevel;
        expDateValidationMessage = state.productPageState.expDateValidationMessage;
    }

    for (const product of companyProducts) {
        if (product._id === "0" || (isEditable && product._id === productId)) {
            product.isUnlimited = isUnlimitedDate;
            break;
        }
    }

    return {
        ...state,

        companyProducts,

        productPageState: {
            ...state.productPageState,

            isUnlimitedDate,

            expDate,

            expDateValidationLevel,
            expDateValidationMessage,
        },
    };
}
