import {IState, ICompanyProduct, IProductPageState} from "../../state";
import {IDeleteProductSuccessAction} from "../../actions/product/delete";

export const deleteProductSendReducer = (state: IState): IState => {
    return {
        ...state,
    }
};

export const deleteProductSuccessReducer = (state: IState, action: IDeleteProductSuccessAction): IState => {
    const companyProducts: ICompanyProduct[] = state.companyProducts;
    const productPageState: IProductPageState = {...state.productPageState};

    if (productPageState.isEditable) {
        productPageState.isEditable = false;
    }

    for (let i: number = 0; i < companyProducts.length; i++) {
        if (companyProducts[i]._id === action.productId) {
            companyProducts.splice(i, 1);
            break;
        }
    }

    let chosenCategory: string = productPageState.chosenCategory;
    let categoryStillPresent: boolean = false;

    for (const product of companyProducts) {
        if (product.category === chosenCategory) {
            categoryStillPresent = true;
            break;
        }
    }

    if (!categoryStillPresent) {
        chosenCategory = "All";
    }

    productPageState.chosenCategory = chosenCategory;

    return {
        ...state,

        companyProducts,

        productPageState,
    };
};

export const deleteProductFailedReducer = (state: IState): IState => {
    return {
        ...state,
    }
};
