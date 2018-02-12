import {ICompanyProduct, IState} from "../../state";
import {IFilterAction} from "../../actions/product/filter";

export const filterReducer = (state: IState, action: IFilterAction): IState => {
    const companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    for (const product of companyProducts) {
        product.checked = false;
    }

    for (let i = 0; i < companyProducts.length; i++) {
        if (companyProducts[i]._id === "0") {
            companyProducts.splice(i, 1);
            break;
        }
    }

    return {
        ...state,

        companyProducts,

        productPageState: {
            ...state.productPageState,

            chosenCategory: action.category,

            isEditable: false,
        },
    }
};
