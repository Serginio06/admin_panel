import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyProduct, IState} from "../../state";
import {IChangeExpDateAction} from "../../actions/product/changeExpDate";

export function changeExpDateReducer(state: IState, action: IChangeExpDateAction): IState {
    let expDateValidationLevel: string = VALIDATION_LEVEL_SUCCESS,
        expDateValidationMessage: string = "";

    const expDate: string = action.expDate,
        isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId,
        companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    if (!expDate || expDate.length === 0) {
        expDateValidationLevel = VALIDATION_LEVEL_ERROR;
        expDateValidationMessage = "Field must be filled";
    }

    for (const product of companyProducts) {
        if (product._id === "0" || (isEditable && product._id === productId)) {
            product.expDate = expDate;
            break;
        }
    }

    return {
        ...state,
        companyProducts,

        productPageState: {
            ...state.productPageState,

            expDate,
            expDateValidationLevel,
            expDateValidationMessage,
        },
    };
}
