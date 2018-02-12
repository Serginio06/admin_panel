import {ICompanyProduct, IState} from "../../state";
import {IChangeIsOnlineAction} from "../../actions/product/changeIsOnline";

export function changeIsOnline(state: IState, action: IChangeIsOnlineAction): IState {
    const isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId,

        companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    for (const product of companyProducts) {
        if (product._id === "0" || (isEditable && product._id === productId)) {
            product.isOnline = action.isOnline;
            break;
        }
    }

    return {
        ...state,

        productPageState: {
            ...state.productPageState,

            isOnline: action.isOnline,
            link2product: "",
            link2productValidationLevel: "",
            link2productValidationMessage: "",
        },
    };
}
