import {ICompanyProduct, IState} from "../../state";
import {IChangeIsOfflineAction} from "../../actions/product/changeIsOffline";

export function changeIsOffline(state: IState, action: IChangeIsOfflineAction): IState {
    const isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId,

        companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    for (const product of companyProducts) {
        if (product._id === "0" || (isEditable && product._id === productId)) {
            product.isOffline = action.isOffline;
            break;
        }
    }

    return {
        ...state,

        productPageState: {
            ...state.productPageState,

            isOffline: action.isOffline,
        },
    };
}
