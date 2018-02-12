import {
    VALIDATION_LEVEL_ERROR,
    VALIDATION_LEVEL_SUCCESS,
    VALIDATION_LEVEL_WARNING,
} from "../../../common/constants/ValidationLevelType";
import {getErrorText} from "../../../common/util/errorUtil";
import {ICompanyProduct, IState} from "../../state";
import {IFailedAction} from "../../../common/actions";
import {Action} from "redux";
import {ISuccessUploadImageLoadingAction} from "../../actions/product/uploadImage";

export function uploadImageFailed(state: IState, action: IFailedAction): IState {
    return {
        ...state,

        productPageState: {
            ...state.productPageState,

            uploadImageValidationLevel: VALIDATION_LEVEL_ERROR,
            uploadImageValidationMessage: getErrorText(action.errorCode),
        },
    };
}

export function uploadImageFailedSizeExceeded(state: IState, action: IFailedAction): IState {
    return {
        ...state,

        productPageState: {
            ...state.productPageState,

            uploadImageValidationLevel: VALIDATION_LEVEL_ERROR,
            uploadImageValidationMessage: getErrorText(action.errorCode),
        },
    };
}

export function uploadImageFailedWrongExtension(state: IState, action: IFailedAction): IState {
    return {
        ...state,

        productPageState: {
            ...state.productPageState,

            uploadImageValidationLevel: VALIDATION_LEVEL_ERROR,
            uploadImageValidationMessage: getErrorText(action.errorCode),
        },
    };
}

export function uploadImageLoading(state: IState, action: Action): IState {
    return {
        ...state,

        productPageState: {
            ...state.productPageState,

            uploadImageValidationLevel: VALIDATION_LEVEL_WARNING,
            uploadImageValidationMessage: "Loading...",
        },
    };
}

export function uploadImageSuccess(state: IState, action: ISuccessUploadImageLoadingAction): IState {
    const maxImagesToUpload: number = 5;

    let images: any[] = state.productPageState.images;
    const uploadImageIsDisabled: boolean = !(images.length <= maxImagesToUpload - 2);

    if (images.length < maxImagesToUpload) {
        images = state.productPageState.images.concat(action.productImage);
    }

    const isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId;

    const companyProducts: ICompanyProduct[] = state.companyProducts.slice();
    for (const product of companyProducts) {
        if (isEditable && product._id === productId) {
            product.images = images;
            break;
        }
    }

    return {
        ...state,
        companyProducts,

        productPageState: {
            ...state.productPageState,

            images,
            uploadImageIsDisabled,
            uploadImageValidationLevel: VALIDATION_LEVEL_SUCCESS,
            uploadImageValidationMessage: "",
        },
    };
}
