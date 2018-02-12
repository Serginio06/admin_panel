import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyProduct, IState} from "../../state";
import {IChangeNameAction} from "../../actions/product/changeName";

export function changeNameReducer(state: IState, action: IChangeNameAction): IState {
    let nameValidationLevel: string = VALIDATION_LEVEL_SUCCESS,
        nameValidationMessage: string = "";

    const name: string = action.name,
        isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId,
        companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    if (!name || name.length === 0) {
        nameValidationLevel = VALIDATION_LEVEL_ERROR;
        nameValidationMessage = "Field must be filled";
    }
    // else if (name.length > 30) {
    //     nameValidationLevel = VALIDATION_LEVEL_ERROR;
    //     nameValidationMessage = "Too long value";
    // }

    for (const product of companyProducts) {
        if (product._id === "0" || (isEditable && product._id === productId)) {
            product.name = name;
            break;
        }
    }

    return {
        ...state,

        companyProducts,

        productPageState: {
            ...state.productPageState,

            name,
            nameValidationLevel,
            nameValidationMessage,
        },
    };
}
