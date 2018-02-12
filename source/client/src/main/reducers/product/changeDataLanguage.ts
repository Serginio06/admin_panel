import {DataLanguage} from "../../../common/constants/dataLanguageType";
import {ICompanyProduct, IState} from "../../state";
import {Action} from "redux";

export const changeDataLanguageReducer = (state: IState, action: Action): IState => {
    const dataLanguage: DataLanguage = state.productPageState.dataLanguage === DataLanguage.EN ? DataLanguage.RU : DataLanguage.EN,

        isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId,

        companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    for (const product of companyProducts) {
        if (product._id === "0" || (isEditable && product._id === productId)) {
            product.language = dataLanguage;
            break;
        }
    }

    return {
        ...state,
        companyProducts,

        productPageState: {
            ...state.productPageState,
            dataLanguage,
        },
    };
};
