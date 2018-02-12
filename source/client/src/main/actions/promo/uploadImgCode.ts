import {CHANGE_PROMO_UPLOAD_IMGCODE_FAILED, CHANGE_PROMO_UPLOAD_IMGCODE_SUCCESS,} from "../../constants";
import {Action, Dispatch} from "redux";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IFailedAction} from "../../../common/actions";

export interface IUploadImgCodeSuccessAction extends Action {
    imgCode: string;
}

const success = (imgCode: string): IUploadImgCodeSuccessAction => {
    return {
        imgCode,
        type: CHANGE_PROMO_UPLOAD_IMGCODE_SUCCESS,
    }
};

const failed = (errorCode: string): IFailedAction => {
    return {
        errorCode,
        type: CHANGE_PROMO_UPLOAD_IMGCODE_FAILED,
    }
};

export const uploadImgCodeAction = (selectedFile: File,
                                    isImgExtAllowed: boolean,
                                    isImgSizeExceeded: boolean) => (dispatch: Dispatch<Action>) => {
    if (selectedFile) {
        readFile(selectedFile, dispatch);
    } else if (!isImgExtAllowed) {
        dispatch(failed(ErrorCode.WRONG_EXTENSION_ERROR));
    } else if (!isImgSizeExceeded) {
        dispatch(failed(ErrorCode.SIZE_EXCEEDED_ERROR));
    }
};

const readFile = (selectedFile: File, dispatch: Dispatch<Action>): void => {
    const reader: FileReader = new FileReader();

    reader.onload = () => {
        dispatch(success(reader.result));
    };

    reader.onerror = (err: ErrorEvent) => {
        console.error(`onCompanyUploadImageAction failed! ${err}`);

        dispatch(failed(ErrorCode.INTERNAL_ERROR));
    };

    reader.onabort = (err: ErrorEvent) => {
        console.error(`onCompanyUploadImageAction aborted! ${err}`);

        dispatch(failed(ErrorCode.ABORTED_ERROR));
    };

    reader.readAsDataURL(selectedFile);
};
