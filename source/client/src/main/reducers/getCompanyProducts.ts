import {IState} from "../state";
import {Action} from "redux";

export const loadCompanyProductsSendReducer = (state: IState, action: Action): IState => ({...state});

export const loadCompanyProductsSuccessReducer = (state: IState, action): IState => {
    const productCategories = [{
        label: "All",
        value: "All",
    }];
    let flag: boolean;

    for (const product of action.payload) {
        flag = true;
        for (const category of productCategories) {
            if (category.label === product.category) {
                flag = false;
                break;
            }
        }

        if (flag) {
            productCategories.push({
                label: product.category,
                value: product.category,
            });
        }
    }

    const companyProducts = action.payload.slice();

    for (const product of companyProducts) {
        product.checked = false;
    }

    return {
        ...state,

        companyProducts,
        productCategories,
    };
};

export const loadCompanyProductsFailedReducer = (state, action) => ({
    ...state,
    errorCode: action.errorCode,
    failed: true,
});
