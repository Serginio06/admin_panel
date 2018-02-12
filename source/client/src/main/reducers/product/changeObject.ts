import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyProduct, IState} from "../../state";
import {IChangeObjectAction} from "../../actions/product/changeObject";

export function changeObjectReducer(state: IState, action: IChangeObjectAction): IState {
    let objectValidationLevel: string = VALIDATION_LEVEL_SUCCESS,
        objectValidationMessage: string = "";

    const object: string = action.object,
        isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId,
        companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    if (!object || object.length === 0) {
        objectValidationLevel = VALIDATION_LEVEL_ERROR;
        objectValidationMessage = "Field must be filled";
    }

    for (const product of companyProducts) {
        if (product._id === "0" || (isEditable && product._id === productId)) {
            product.objectId = object;
            break;
        }
    }

    return {
        ...state,

        companyProducts,

        productPageState: {
            ...state.productPageState,

            object,
            objectValidationLevel,
            objectValidationMessage,
        },
    };
}
