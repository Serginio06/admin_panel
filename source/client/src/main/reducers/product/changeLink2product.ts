import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyProduct, IState} from "../../state";
import {IChangeLink2productAction} from "../../actions/product/changeLink2product";

const validator = require("validator");

export function changeLink2productReducer(state: IState, action: IChangeLink2productAction): IState {
    let link2productValidationLevel: string = VALIDATION_LEVEL_SUCCESS,
        link2productValidationMessage: string = "";

    const link2product: string = action.link2product,
        isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId,
        companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    if (!link2product || link2product.length === 0) {
        link2productValidationLevel = VALIDATION_LEVEL_ERROR;
        link2productValidationMessage = "Field must be filled";
    } else if (!validator.isURL(link2product)) {
        link2productValidationLevel = VALIDATION_LEVEL_ERROR;
        link2productValidationMessage = "Link isn't valid";
    }

    for (const product of companyProducts) {
        if (product._id === "0" || (isEditable && product._id === productId)) {
            product.link = link2product;
            break;
        }
    }

    return {
        ...state,

        companyProducts,

        productPageState: {
            ...state.productPageState,

            link2product,
            link2productValidationLevel,
            link2productValidationMessage,
        },
    };
}
