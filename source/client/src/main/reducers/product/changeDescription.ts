import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyProduct, IState} from "../../state";
import {IChangeDescriptionAction} from "../../actions/product/changeDescription";

export function changeDescriptionReducer(state: IState, action: IChangeDescriptionAction): IState {
    const isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId,
        description: string = action.description;

    let descriptionValidationLevel: string = VALIDATION_LEVEL_SUCCESS,
        descriptionValidationMessage: string = "";

    if (!description || description.length === 0) {
        descriptionValidationLevel = VALIDATION_LEVEL_ERROR;
        descriptionValidationMessage = "Field must be filled";
    }
    // else if (description.length > 250) {
    //     descriptionValidationLevel = VALIDATION_LEVEL_ERROR;
    //     descriptionValidationMessage = "Too long value";
    // }

    const companyProducts: ICompanyProduct[] = state.companyProducts.slice();
    for (const product of companyProducts) {
        if (product._id === "0" || (isEditable && product._id === productId)) {
            product.description = description;
            break;
        }
    }

    return {
        ...state,
        companyProducts,

        productPageState: {
            ...state.productPageState,

            description,
            descriptionValidationLevel,
            descriptionValidationMessage,
        },
    };
}
