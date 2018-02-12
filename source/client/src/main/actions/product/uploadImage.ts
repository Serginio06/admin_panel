import {
    CHANGE_PRODUCT_UPLOAD_IMAGE_FAILED,
    CHANGE_PRODUCT_UPLOAD_IMAGE_FAILED_SIZE_EXCEEDED,
    CHANGE_PRODUCT_UPLOAD_IMAGE_FAILED_WRONG_EXTENSION,
    CHANGE_PRODUCT_UPLOAD_IMAGE_LOADING,
    CHANGE_PRODUCT_UPLOAD_IMAGE_SUCCESS,
} from "../../constants";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IFailedAction} from "../../../common/actions";
import {Action} from "redux";

const errorWrongExtensionUploadImageAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: CHANGE_PRODUCT_UPLOAD_IMAGE_FAILED_WRONG_EXTENSION,
});

const errorSizeUploadImageAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: CHANGE_PRODUCT_UPLOAD_IMAGE_FAILED_SIZE_EXCEEDED,
});

const errorUploadImageAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: CHANGE_PRODUCT_UPLOAD_IMAGE_FAILED,
});

export const uploadImageAction = (selectedFile: File,
                                  isImgExtAllowed: boolean,
                                  isImgSizeExceeded: boolean) => (dispatch) => {
    if (selectedFile) {
        readFile(selectedFile, dispatch);
    } else if (!isImgExtAllowed) {
        dispatch(errorWrongExtensionUploadImageAction(ErrorCode.WRONG_EXTENSION_ERROR));
    } else if (!isImgSizeExceeded) {
        dispatch(errorSizeUploadImageAction(ErrorCode.SIZE_EXCEEDED_ERROR));
    }
};

interface IStartUploadImageLoadingAction extends Action {
    fileName: string,
}

export interface ISuccessUploadImageLoadingAction extends Action {
    productImage: any,
}

const startUploadImageLoadingAction = (fileName: string): IStartUploadImageLoadingAction => ({
    fileName,
    type: CHANGE_PRODUCT_UPLOAD_IMAGE_LOADING,
});
const successUploadImageLoadingAction = (productImage: any): ISuccessUploadImageLoadingAction => ({
    productImage,
    type: CHANGE_PRODUCT_UPLOAD_IMAGE_SUCCESS,
});

const readFile = (selectedFile: File, dispatch) => {
    dispatch(startUploadImageLoadingAction(selectedFile.name));

    const reader: FileReader = new FileReader();

    reader.onload = (): void => {
        dispatch(successUploadImageLoadingAction(reader.result));
    };

    reader.onerror = (error: ErrorEvent): void => {
        console.error(`onProductUploadImageAction failed! ${error}`);

        dispatch(errorUploadImageAction(ErrorCode.INTERNAL_ERROR));
    };

    reader.onabort = (error: ErrorEvent) => {
        console.error(`onProductUploadImageAction aborted! ${error}`);

        dispatch(errorUploadImageAction(ErrorCode.ABORTED_ERROR));
    };

    reader.readAsDataURL(selectedFile);
};
