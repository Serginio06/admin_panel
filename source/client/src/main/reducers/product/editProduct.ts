import {ICompanyProduct, IState} from "../../state";
import {IEditProductAction, ISuccessEditProductAction} from "../../actions/product/editProduct";
import {IFailedAction} from "../../../common/actions";

export function editProductSendReducer(state: IState, action: IEditProductAction): IState {
    return {
        ...state,

        productPageState: {
            ...state.productPageState,

            errorCode: "",
            failed: false,

            isEditable: action.isContinue,

            productId: action.isContinue ? state.productPageState.productId : null,
        },
    };
}

export function editProductSuccessReducer(state: IState, action: ISuccessEditProductAction): IState {
    const companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    for (let i = 0; i < companyProducts.length; i++) {
        if (companyProducts[i]._id === action.product._id) {
            companyProducts[i] = action.product as ICompanyProduct; //fixme
            companyProducts[i].checked = state.productPageState.isEditable;
            break;
        }
    }

    return {
        ...state,

        companyProducts,

        productPageState: {
            ...state.productPageState,

            errorCode: "",
            failed: false,
        },
    };
}

export function editProductFailedReducer(state: IState, action: IFailedAction): IState {
    return {
        ...state,

        productPageState: {
            ...state.productPageState,

            errorCode: action.errorCode,
            failed: true,
        },
    };
}
