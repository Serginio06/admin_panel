import {ICompanyProduct, IProductCategory, IState} from "../../state";
import {IChangeCategoryAction} from "../../actions/product/changeCategory";

export const changeCategoryReducer = (state: IState, action: IChangeCategoryAction): IState => {
    let categoryNotPresentYet: boolean = true;

    const isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId,
        productCategories: IProductCategory[] = state.productCategories.slice(),
        value: string = (action.value === "" || action.value === null ? "All" : action.value);

    for (const category of productCategories) {
        if (category.value === value) {
            categoryNotPresentYet = false;
            break;
        }
    }

    if (categoryNotPresentYet) {
        productCategories.push({
            label: value,
            value,
        });
    }

    const companyProducts: ICompanyProduct[] = state.companyProducts.slice();
    for (const product of companyProducts) {
        if (product._id === "0" || (isEditable && product._id === productId)) {
            product.category = value;
            break;
        }
    }

    return {
        ...state,
        companyProducts,
        productCategories,

        productPageState: {
            ...state.productPageState,

            category: value,
        },
    };
};
