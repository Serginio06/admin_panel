import {ICompanyProduct, initProduct, initState, IState} from "../../state";
import {Action} from "redux";

export const newProductReducer = (state: IState, action: Action): IState => {
    let flag: boolean = true;
    const newProduct: ICompanyProduct = Object.assign({}, initProduct),
        companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    for (const product of companyProducts) {
        product.checked = false;
    }

    for (let i = 0; i < companyProducts.length; i++) {
        if (companyProducts[i]._id === "0") {
            companyProducts[i] = newProduct; //fixme
            flag = false;
            break;
        }
    }

    if (flag) {
        companyProducts.unshift(newProduct);
    }

    return {
        ...state,

        companyProducts,

        productPageState: {
            ...initState.productPageState,
            isEditable: true,
        },
    };
};
