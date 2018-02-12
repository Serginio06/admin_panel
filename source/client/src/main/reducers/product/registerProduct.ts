import {Action} from "redux";
import {ICompanyProduct, initProduct, IState} from "../../state";
import {ISuccessRegisterProductAction} from "../../actions/product/registerProduct";
import {IFailedAction} from "../../../common/actions";

export function registerProductSendReducer(state: IState, action: Action): IState {
    return {
        ...state,

        productPageState: {
            ...state.productPageState,

            failed: false,

            errorCode: "",

            registered: false,
        },
    };
}

export function registerProductSuccessReducer(state: IState, action: ISuccessRegisterProductAction): IState {
    const companyProducts: ICompanyProduct[] = state.companyProducts;
    let flag: boolean = true;

    for (let i = 0; i < companyProducts.length; i++) {
        if (companyProducts[i]._id === "0") {
            flag = false;
            companyProducts[i] = {...action.payload, checked: false};
            break;
        }
    }

    if (flag) {
        companyProducts.push({...action.payload, checked: false});
    }

    if (action.continue) {
        companyProducts.push({...initProduct});
    }

    return {
        ...state,

        companyProducts,

        productPageState: {
            ...state.productPageState,

            isEditable: action.continue,

            failed: false,

            errorCode: "",

            registered: true,

            name: "",
            nameValidationLevel: "",
            nameValidationMessage: "",

            category: "All",

            description: "",
            descriptionValidationLevel: "",
            descriptionValidationMessage: "",

            object: "",
            objectValidationLevel: "",
            objectValidationMessage: "",

            price: "",
            priceValidationLevel: "",
            priceValidationMessage: "",

            quantity: "",
            quantityValidationLevel: "",
            quantityValidationMessage: "",

            quantityIsDisabled: false,

            link2product: "",
            link2productValidationLevel: "",
            link2productValidationMessage: "",

            expDate: "",
            expDateValidationLevel: "",
            expDateValidationMessage: "",

            isOffline: false,
            isOnline: false,
            isUnlimitedQuantity: false,

            images: [],
            uploadImageIsDisabled: false,
            uploadImageValidationLevel: "",
            uploadImageValidationMessage: "",
        },
    };
}

export function registerProductFailedReducer(state: IState, action: IFailedAction): IState {
    return {
        ...state,

        productPageState: {
            ...state.productPageState,

            failed: true,

            errorCode: action.errorCode,

            registered: false,
        },
    };
}
